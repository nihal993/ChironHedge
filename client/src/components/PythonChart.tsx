import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import AreaChart from '@/components/charts/AreaChart';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import MultiLineChart from '@/components/charts/MultiLineChart';
import HeatMapChart from '@/components/charts/HeatMapChart';
import RadarChart from '@/components/charts/RadarChart';

interface PythonChartData {
  categories?: string[];
  data?: number[];
  series?: { name: string; data: number[] }[];
  title: string;
  type: 'line' | 'bar' | 'area' | 'multiline' | 'heatmap' | 'radar';
  error?: string;
}

interface PythonChartProps {
  chartType: string;
  height?: number;
  colors?: string[];
  refreshInterval?: number; // in seconds
}

const PythonChart: React.FC<PythonChartProps> = ({ 
  chartType, 
  height = 400, 
  colors = ['#0033a0', '#0052cc', '#0070f3', '#3a86ff'],
  refreshInterval = 300 // 5 minuti default
}) => {
  const [chartData, setChartData] = useState<PythonChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchChartData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await apiRequest<PythonChartData>(
        'GET', 
        `/api/charts/python/${chartType}`
      );

      if (data.error) {
        throw new Error(data.error);
      }

      setChartData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      toast({
        title: "Chart Error",
        description: `Failed to load ${chartType} chart: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();

    // Setup auto-refresh se specificato
    let interval: NodeJS.Timeout | null = null;
    if (refreshInterval > 0) {
      interval = setInterval(fetchChartData, refreshInterval * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [chartType, refreshInterval]);

  const renderChart = () => {
    if (!chartData) return null;

    const chartProps = {
      height,
      colors,
      title: chartData.title
    };

    switch (chartData.type) {
      case 'line':
        return (
          <LineChart
            data={chartData.data || []}
            categories={chartData.categories || []}
            {...chartProps}
          />
        );

      case 'bar':
        return (
          <BarChart
            data={chartData.data || []}
            categories={chartData.categories || []}
            {...chartProps}
          />
        );

      case 'area':
        return (
          <AreaChart
            data={chartData.data || []}
            categories={chartData.categories || []}
            {...chartProps}
          />
        );

      case 'multiline':
        return (
          <MultiLineChart
            series={chartData.series || []}
            categories={chartData.categories || []}
            {...chartProps}
          />
        );

      case 'heatmap':
        return (
          <HeatMapChart
            data={chartData.data as { name: string, data: number[] }[] || []}
            categories={chartData.categories || []}
            {...chartProps}
          />
        );

      case 'radar':
        return (
          <RadarChart
            data={chartData.data || []}
            categories={chartData.categories || []}
            {...chartProps}
          />
        );

      default:
        return <div className="text-center text-gray-500">Unsupported chart type: {chartData.type}</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Chart Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchChartData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      {renderChart()}
      {refreshInterval > 0 && (
        <div className="mt-4 text-xs text-gray-500 text-right">
          Auto-refresh every {refreshInterval}s
        </div>
      )}
    </div>
  );
};

export default PythonChart;
