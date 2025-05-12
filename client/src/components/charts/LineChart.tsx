import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
  data: number[];
  categories: string[];
  height?: number;
  title?: string;
  colors?: string[];
}

const LineChart = ({ 
  data, 
  categories, 
  height = 350, 
  title = "Line Chart",
  colors = ['#0033a0']
}: LineChartProps) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'line',
      height: height,
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
      zoom: {
        enabled: false
      }
    },
    theme: {
      mode: 'light'
    },
    stroke: {
      curve: 'straight',
      width: 3
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
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5
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
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#8e8da4',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        formatter: function (val) {
          return val.toFixed(1);
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    },
    colors: colors,
    markers: {
      size: 5,
      colors: colors,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7
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
          type="line"
          height={height}
        />
      )}
    </div>
  );
};

export default LineChart;