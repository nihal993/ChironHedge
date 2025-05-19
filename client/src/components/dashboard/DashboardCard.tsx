import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  fullWidth = false
}) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden 
        ${fullWidth ? 'col-span-full' : ''} 
        ${className}`
      }
    >
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-primary/60 mt-1">{subtitle}</p>}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;