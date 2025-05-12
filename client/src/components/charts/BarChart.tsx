import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BarChartProps {
  data: number[];
  categories: string[];
  height?: number;
  title?: string;
  colors?: string[];
  horizontal?: boolean;
}

const BarChart = ({ 
  data, 
  categories, 
  height = 350, 
  title = "Bar Chart",
  colors = ['#0033a0'],
  horizontal = false
}: BarChartProps) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: horizontal ? 'bar' : 'bar',
      height: height,
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
    },
    theme: {
      mode: 'light'
    },
    stroke: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        barHeight: '70%',
        columnWidth: '60%',
        borderRadius: 0,
        dataLabels: {
          position: 'top'
        }
      }
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
      opacity: 1,
      colors: colors
    },
    colors: colors,
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      markers: {
        radius: 12
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
          type={horizontal ? 'bar' : 'bar'}
          height={height}
        />
      )}
    </div>
  );
};

export default BarChart;