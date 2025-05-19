import React from 'react';
import DashboardCard from './DashboardCard';

interface HeatmapItemProps {
  label: string;
  value: number;
  color: string;
  textColor: string;
  onClick?: () => void;
  format?: ((value: number) => string) | undefined;
}

const HeatmapItem: React.FC<HeatmapItemProps> = ({ 
  label, 
  value, 
  color, 
  textColor,
  onClick,
  format
}) => {
  const formattedValue = format ? format(value) : value.toFixed(2);
  
  return (
    <div 
      className="flex-1 min-w-[100px] p-3 rounded-md cursor-pointer transition-all hover:brightness-95"
      style={{ backgroundColor: color, color: textColor }}
      onClick={onClick}
    >
      <div className="text-sm font-medium mb-1 truncate" title={label}>{label}</div>
      <div className="text-lg font-bold">{formattedValue}</div>
    </div>
  );
};

interface HeatmapCardProps {
  title: string;
  subtitle?: string;
  items: Array<{
    label?: string;
    value?: number;
    name?: string;
    change?: number;
  }>;
  className?: string;
  fullWidth?: boolean;
  // Funzione per determinare il colore in base al valore
  getColorForValue: (value: number) => { bg: string; text: string };
  format?: (value: number) => string;
  onItemClick?: (item: any) => void;
}

const HeatmapCard: React.FC<HeatmapCardProps> = ({
  title,
  subtitle,
  items,
  className,
  fullWidth,
  getColorForValue,
  format,
  onItemClick
}) => {
  return (
    <DashboardCard
      title={title}
      subtitle={subtitle}
      className={className}
      fullWidth={fullWidth}
    >
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => {
          // Supporta sia il formato { label, value } che { name, change }
          const itemLabel: string = (item.label || item.name || '').toString();
          const itemValue: number = typeof item.value === 'number' ? item.value : 
                                    typeof item.change === 'number' ? item.change : 0;
          const { bg, text } = getColorForValue(itemValue);
          
          return (
            <HeatmapItem
              key={index}
              label={itemLabel}
              value={itemValue}
              color={bg}
              textColor={text}
              format={format}
              onClick={() => onItemClick && onItemClick(item)}
            />
          );
        })}
      </div>
    </DashboardCard>
  );
};

export default HeatmapCard;