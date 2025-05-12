import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface MultiLineChartProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  height?: number;
  title?: string;
  colors?: string[];
}

const MultiLineChart = ({ 
  series, 
  categories, 
  height = 350, 
  title = "Multi-Line Chart",
  colors = ['#0033a0', '#0052cc', '#0070f3', '#3a86ff']
}: MultiLineChartProps) => {
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
    colors: colors,
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      offsetY: -15,
      itemMargin: {
        horizontal: 10,
        vertical: 8
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
          series={series}
          type="line"
          height={height}
        />
      )}
    </div>
  );
};

export default MultiLineChart;