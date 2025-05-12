import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface AreaChartProps {
  data: number[];
  categories: string[];
  height?: number;
  title?: string;
  colors?: string[];
}

const AreaChart = ({ 
  data, 
  categories, 
  height = 350, 
  title = "Area Chart",
  colors = ['#0033a0', '#0052cc']
}: AreaChartProps) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'area',
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
      curve: 'smooth',
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
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: colors[0],
            opacity: 0.7
          },
          {
            offset: 90,
            color: colors[1],
            opacity: 0.2
          }
        ]
      }
    },
    colors: colors,
    markers: {
      size: 4,
      colors: colors,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6
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
          type="area"
          height={height}
        />
      )}
    </div>
  );
};

export default AreaChart;