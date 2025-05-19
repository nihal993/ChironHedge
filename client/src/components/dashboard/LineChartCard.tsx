import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import DashboardCard from './DashboardCard';

// Registra i componenti Chart.js
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

interface LineChartCardProps {
  title: string;
  subtitle?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
  className?: string;
  fullWidth?: boolean;
  height?: number;
  showLegend?: boolean;
  tooltipCallback?: (label: string, value: number) => string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  subtitle,
  labels,
  datasets,
  className,
  fullWidth,
  height = 300,
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
        borderColor: dataset.borderColor || colors[index % colors.length],
        backgroundColor: dataset.backgroundColor || 
          `${colors[index % colors.length]}20`, // 20 è l'opacità in hex (12.5%)
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3, // Linea leggermente smussata
        fill: dataset.fill || false
      };
    })
  };

  // Opzioni del grafico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
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
          display: false,
          drawBorder: false,
          color: '#E5E7EB'
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        grid: {
          color: '#E5E7EB',
          borderDash: [2, 4],
          drawBorder: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false
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
        <Line data={chartData} options={options} />
      </div>
    </DashboardCard>
  );
};

export default LineChartCard;