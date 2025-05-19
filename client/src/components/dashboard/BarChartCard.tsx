import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import DashboardCard from './DashboardCard';

// Registra i componenti Chart.js
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

interface BarChartCardProps {
  title: string;
  subtitle?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
  className?: string;
  fullWidth?: boolean;
  height?: number;
  horizontal?: boolean;
  showLegend?: boolean;
  tooltipCallback?: (label: string, value: number) => string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  subtitle,
  labels,
  datasets,
  className,
  fullWidth,
  height = 300,
  horizontal = false,
  showLegend = true,
  tooltipCallback
}) => {
  
  // Prepara i dati per il grafico
  const chartData = {
    labels,
    datasets: datasets.map((dataset, index) => {
      // Colori predefiniti se non specificati
      const colors = [
        '#0033A0', // blu scuro
        '#1D7AFC', // blu medio
        '#4C9AFF', // blu chiaro
        '#FFB020', // giallo/oro
        '#10B981', // verde
        '#F43F5E', // rosso
      ];
      
      return {
        label: dataset.label,
        data: dataset.data,
        backgroundColor: dataset.backgroundColor || colors[index % colors.length],
        borderColor: dataset.borderColor || 'transparent',
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 40
      };
    })
  };

  // Opzioni del grafico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    plugins: {
      legend: {
        display: showLegend && datasets.length > 1,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (tooltipCallback) {
              return tooltipCallback(context.dataset.label, context.raw);
            }
            return ` ${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: !horizontal,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        grid: {
          display: horizontal,
          borderDash: [2, 4],
          drawBorder: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <DashboardCard
      title={title}
      subtitle={subtitle}
      className={className}
      fullWidth={fullWidth}
    >
      <div style={{ height: `${height}px` }}>
        <Bar data={chartData} options={options} />
      </div>
    </DashboardCard>
  );
};

export default BarChartCard;