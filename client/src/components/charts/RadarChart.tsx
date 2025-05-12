import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface RadarChartProps {
  data: number[];
  categories: string[];
  height?: number;
  title?: string;
  colors?: string[];
}

const RadarChart = ({ 
  data, 
  categories, 
  height = 350, 
  title = "Radar Chart",
  colors = ['#0033a0']
}: RadarChartProps) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'radar',
      height: height,
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
    },
    theme: {
      mode: 'light'
    },
    title: {
      text: title,
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Inter, sans-serif',
        color: '#000000'
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#8e8da4',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        }
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    },
    colors: colors,
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    },
    fill: {
      opacity: 0.6
    },
    stroke: {
      width: 2
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    }
  });

  // Ensure chart is only rendered client-side
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: `${height}px` }} className="bg-neutral animate-pulse rounded" />;

  return (
    <div>
      {typeof window !== 'undefined' && (
        <ReactApexChart
          options={options}
          series={[{
            name: title,
            data: data
          }]}
          type="radar"
          height={height}
        />
      )}
    </div>
  );
};

export default RadarChart;