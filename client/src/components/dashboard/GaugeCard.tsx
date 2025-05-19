import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import DashboardCard from './DashboardCard';

interface GaugeCardProps {
  title: string;
  subtitle?: string;
  value: number;
  min?: number;
  max?: number;
  className?: string;
  fullWidth?: boolean;
  height?: number;
  format?: (value: number) => string;
  colorRanges?: {
    from: number;
    to: number;
    color: string;
  }[];
  label?: string;
}

const GaugeCard: React.FC<GaugeCardProps> = ({
  title,
  subtitle,
  value,
  min = 0,
  max = 100,
  className,
  fullWidth,
  height = 200,
  format,
  colorRanges = [
    { from: 0, to: 33, color: '#F43F5E' },   // Rosso
    { from: 33, to: 67, color: '#FFB020' },  // Giallo
    { from: 67, to: 100, color: '#10B981' }, // Verde
  ],
  label
}) => {
  // Prepara i dati per il grafico
  const series = [value];
  
  // Formatta il valore
  const formattedValue = format ? format(value) : value.toFixed(1);
  
  // Opzioni del grafico
  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: '97%',
          margin: 5,
          dropShadow: {
            enabled: false
          }
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            color: '#888',
            offsetY: -10
          },
          value: {
            offsetY: -2,
            fontSize: '20px',
            fontFamily: 'Inter, sans-serif',
            color: '#111',
            formatter: function() {
              return formattedValue;
            }
          }
        },
        hollow: {
          margin: 0,
          size: '50%'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      },
    },
    labels: [label || ''],
    colors: colorRanges.map(range => {
      if (value >= range.from && value <= range.to) {
        return range.color;
      }
      return colorRanges[0].color; // Default
    }).filter(color => color !== colorRanges[0].color)[0] || colorRanges[0].color
  };

  return (
    <DashboardCard
      title={title}
      subtitle={subtitle}
      className={className}
      fullWidth={fullWidth}
    >
      <div style={{ height: `${height}px` }}>
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={height}
        />
      </div>
    </DashboardCard>
  );
};

export default GaugeCard;