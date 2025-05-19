import React from 'react';
import { timeframes } from '@/lib/dashboardData';

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  selectedTimeframe,
  onTimeframeChange
}) => {
  return (
    <div className="w-full flex justify-end mb-4 bg-white p-2 rounded-lg shadow-sm">
      <div className="inline-flex rounded-md shadow-sm">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => onTimeframeChange(timeframe)}
            className={`px-3 py-1.5 text-xs font-medium border border-gray-200 first:rounded-l-md last:rounded-r-md -ml-px first:ml-0 transition-colors
              ${selectedTimeframe === timeframe
                ? 'bg-primary text-white border-primary z-10'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            {timeframe}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeframeSelector;