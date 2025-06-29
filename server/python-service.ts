
import { spawn } from 'child_process';
import path from 'path';
import { log } from './vite';

export interface PythonChartData {
  categories?: string[];
  data?: number[];
  series?: { name: string; data: number[] }[];
  title: string;
  type: 'line' | 'bar' | 'area' | 'multiline' | 'heatmap' | 'radar';
  error?: string;
}

export class PythonChartService {
  private readonly pythonScriptPath = path.join(__dirname, 'python-scripts');

  // Cache per i risultati (5 minuti)
  private chartCache: Map<string, { data: PythonChartData; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minuti

  private isCacheValid(key: string): boolean {
    const cached = this.chartCache.get(key);
    if (!cached) return false;

    const now = Date.now();
    return (now - cached.timestamp) < this.CACHE_DURATION;
  }

  private setCache(key: string, data: PythonChartData): void {
    this.chartCache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  async generateChart(chartType: string): Promise<PythonChartData> {
    // Controlla cache
    if (this.isCacheValid(chartType)) {
      log(`Returning cached Python chart data for: ${chartType}`);
      return this.chartCache.get(chartType)!.data;
    }

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(this.pythonScriptPath, 'chart_generator.py');

      log(`Executing Python script: ${scriptPath} with type: ${chartType}`);

      const pythonProcess = spawn('python3', [scriptPath, chartType], {
        cwd: this.pythonScriptPath
      });

      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          log(`Python script failed with code ${code}: ${stderr}`);
          reject(new Error(`Python script failed: ${stderr}`));
          return;
        }

        try {
          const result: PythonChartData = JSON.parse(stdout);

          if (result.error) {
            reject(new Error(result.error));
            return;
          }

          // Cache il risultato
          this.setCache(chartType, result);

          log(`Python chart generated successfully: ${chartType}`);
          resolve(result);
        } catch (error) {
          log(`Failed to parse Python output: ${error}`);
          reject(new Error(`Failed to parse Python output: ${error}`));
        }
      });

      pythonProcess.on('error', (error) => {
        log(`Python process error: ${error}`);
        reject(new Error(`Failed to start Python process: ${error}`));
      });
    });
  }

  async getAvailableCharts(): Promise<string[]> {
    // Lista dei tipi di grafici disponibili
    return [
      'market_performance',
      'sector_analysis', 
      'volatility_heatmap'
    ];
  }

  // Metodo per generare dati mock se Python non è disponibile
  private getMockChartData(chartType: string): PythonChartData {
    switch (chartType) {
      case 'market_performance':
        return {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          series: [
            { name: 'S&P 500', data: [2.4, 2.7, 3.0, 3.5, 3.8, 4.1] },
            { name: 'NASDAQ', data: [3.1, 3.4, 3.7, 4.2, 4.5, 4.8] }
          ],
          title: 'Market Performance (Mock Data)',
          type: 'multiline'
        };
      case 'sector_analysis':
        return {
          categories: ['Tech', 'Healthcare', 'Finance', 'Energy'],
          data: [8.5, 6.2, 4.1, 2.8],
          title: 'Sector Analysis (Mock Data)',
          type: 'bar'
        };
      default:
        return {
          title: 'Unknown Chart Type',
          type: 'line',
          error: 'Chart type not found'
        };
    }
  }

  async generateChartWithFallback(chartType: string): Promise<PythonChartData> {
    try {
      return await this.generateChart(chartType);
    } catch (error) {
      log(`Python chart generation failed, using mock data: ${error}`);
      return this.getMockChartData(chartType);
    }
  }
}

export const pythonChartService = new PythonChartService();