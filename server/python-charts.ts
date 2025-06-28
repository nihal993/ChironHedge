import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

export interface PythonChartResult {
  data: any;
  metadata: {
    title: string;
    description: string;
    modelQuality: string;
    methodology: string;
    interpretation: string;
  };
  chartType: 'line' | 'bar' | 'heatmap' | 'scatter' | 'area';
  timestamp: number;
}

export class PythonChartService {
  private scriptsPath = './python_scripts';
  
  async executeScript(scriptName: string, parameters?: any): Promise<PythonChartResult> {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(this.scriptsPath, `${scriptName}.py`);
      
      // Prepare parameters as JSON string
      const params = parameters ? JSON.stringify(parameters) : '{}';
      
      const pythonProcess = spawn('python3', [scriptPath, params]);
      
      let output = '';
      let errorOutput = '';
      
      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
      
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${errorOutput}`));
          return;
        }
        
        try {
          const result = JSON.parse(output);
          resolve({
            ...result,
            timestamp: Date.now()
          });
        } catch (error) {
          reject(new Error(`Failed to parse Python output: ${error}`));
        }
      });
    });
  }
  
  async getAvailableScripts(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.scriptsPath);
      return files.filter(file => file.endsWith('.py')).map(file => file.replace('.py', ''));
    } catch (error) {
      return [];
    }
  }
}

export const pythonChartService = new PythonChartService();