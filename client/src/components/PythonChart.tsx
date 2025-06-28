import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Play, BarChart3, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import LineChart from './charts/LineChart';
import MultiLineChart from './charts/MultiLineChart';
import HeatMapChart from './charts/HeatMapChart';
import AreaChart from './charts/AreaChart';

interface PythonChartResult {
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

interface PythonChartProps {
  scriptName: string;
  parameters?: any;
  title?: string;
  description?: string;
  autoExecute?: boolean;
}

export default function PythonChart({ 
  scriptName, 
  parameters = {}, 
  title,
  description,
  autoExecute = false 
}: PythonChartProps) {
  const [result, setResult] = useState<PythonChartResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeScript = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/python-charts/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scriptName,
          parameters
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to execute script: ${response.statusText}`);
      }

      const data: PythonChartResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoExecute) {
      executeScript();
    }
  }, [scriptName, parameters, autoExecute]);

  const renderChart = () => {
    if (!result || !result.data) return null;

    const { data, chartType } = result;

    switch (chartType) {
      case 'line':
        if (data.portfolio_values && data.benchmark_values && data.dates) {
          return (
            <div className="space-y-4">
              <MultiLineChart
                series={[
                  {
                    name: 'Portfolio',
                    data: data.portfolio_values
                  },
                  {
                    name: 'Benchmark',
                    data: data.benchmark_values
                  }
                ]}
                categories={data.dates}
                height={400}
                title="Portfolio vs Benchmark Performance"
                colors={['#3b82f6', '#ef4444']}
              />
            </div>
          );
        }
        break;

      case 'heatmap':
        if (data.heatmap_data && data.asset_names) {
          return (
            <HeatMapChart
              data={data.heatmap_data}
              categories={data.asset_names}
              height={500}
              title="Asset Correlation Matrix"
            />
          );
        }
        break;

      case 'area':
        return (
          <AreaChart
            data={data}
            categories={data.categories || []}
            height={400}
            title={result.metadata.title}
          />
        );

      default:
        return <div className="text-gray-500">Chart type not supported: {chartType}</div>;
    }

    return <div className="text-gray-500">No data available for chart</div>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              {title || result?.metadata.title || `Python Analysis: ${scriptName}`}
            </CardTitle>
            {(description || result?.metadata.description) && (
              <p className="text-sm text-gray-600">
                {description || result?.metadata.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {result?.timestamp && (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(result.timestamp).toLocaleTimeString()}
              </Badge>
            )}
            <Button 
              onClick={executeScript} 
              disabled={loading}
              size="sm"
              variant="outline"
            >
              <Play className="h-4 w-4 mr-1" />
              {loading ? 'Running...' : 'Run Analysis'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Error executing Python script</span>
            </div>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Executing Python analysis...</span>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">
            {/* Model Quality Metrics */}
            {result.metadata.modelQuality && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Model Performance</span>
                </div>
                <p className="text-sm text-blue-700">{result.metadata.modelQuality}</p>
              </div>
            )}

            {/* Chart */}
            <div className="border rounded-lg p-4 bg-white">
              {renderChart()}
            </div>

            {/* Methodology */}
            {result.metadata.methodology && (
              <div className="space-y-3">
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Methodology</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {result.metadata.methodology}
                  </p>
                </div>
              </div>
            )}

            {/* Interpretation */}
            {result.metadata.interpretation && (
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analysis & Interpretation</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {result.metadata.interpretation}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}