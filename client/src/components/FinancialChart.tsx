import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FinancialChartProps {
  chartData: number[];
  labels: string[];
  title?: string;
  height?: number;
}

const FinancialChart: React.FC<FinancialChartProps> = ({
  chartData,
  labels,
  title,
  height = 200
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: title || 'Performance',
        data: chartData,
        fill: 'start',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgba(212, 175, 55, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(212, 175, 55, 0.7)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#666',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      }
    }
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Line data={data} options={options as any} />
    </div>
  );
};

export default FinancialChart;
