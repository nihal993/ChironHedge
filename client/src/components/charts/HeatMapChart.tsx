import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface HeatMapChartProps {
  data: { name: string, data: number[] }[];
  categories: string[];
  height?: number;
  title?: string;
  colorScale?: string[];
}

const HeatMapChart = ({ 
  data, 
  categories, 
  height = 350, 
  title = "Heat Map",
  colorScale = ['#0033a0', '#0052cc', '#0070f3']
}: HeatMapChartProps) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'heatmap',
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
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#8e8da4',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        right: 10,
        left: 10
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    },
    colors: colorScale,
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            {
              from: -10,
              to: 0,
              name: 'Low',
              color: colorScale[0]
            },
            {
              from: 0,
              to: 5,
              name: 'Medium',
              color: colorScale[1]
            },
            {
              from: 5,
              to: 10,
              name: 'High',
              color: colorScale[2]
            }
          ]
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
          series={data}
          type="heatmap"
          height={height}
        />
      )}
    </div>
  );
};

export default HeatMapChart;