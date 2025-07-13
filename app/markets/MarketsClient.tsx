'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Globe, BarChart3 } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export default function MarketsClient() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1D');
  const [selectedCategory, setSelectedCategory] = useState<string>('indices');

  // Mock market data - in production this would come from your API
  const marketData: MarketData[] = [
    { symbol: 'SPX', name: 'S&P 500', price: 4756.50, change: 23.45, changePercent: 0.49, volume: '2.1B' },
    { symbol: 'NDX', name: 'NASDAQ 100', price: 16842.30, change: -45.67, changePercent: -0.27, volume: '1.8B' },
    { symbol: 'DJI', name: 'Dow Jones', price: 37248.89, change: 156.78, changePercent: 0.42, volume: '1.2B' },
    { symbol: 'VIX', name: 'Volatility Index', price: 14.23, change: -0.87, changePercent: -5.76, volume: '245M' },
  ];

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'YTD'];
  const categories = [
    { id: 'indices', name: 'Indices', icon: BarChart3 },
    { id: 'forex', name: 'Forex', icon: Globe },
    { id: 'commodities', name: 'Commodities', icon: Activity },
    { id: 'crypto', name: 'Crypto', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Insights</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Real-time market data, analysis, and insights for global financial markets with institutional-grade accuracy.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg p-1 inline-flex">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Market Data Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {marketData.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.symbol}</h3>
                  <p className="text-sm text-gray-600">{item.name}</p>
                </div>
                {item.change >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {item.price.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </div>
                
                <div className={`flex items-center gap-2 text-sm ${
                  item.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span>
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                  </span>
                  <span>
                    ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                  </span>
                </div>
                
                <div className="text-sm text-gray-500">
                  Volume: {item.volume}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Overview</h3>
              <p className="text-gray-600 mb-4">
                Today's market session shows mixed signals with technology stocks leading gains while 
                traditional sectors face pressure. The volatility index remains at manageable levels, 
                suggesting investor confidence despite ongoing economic uncertainties.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Technology sector outperforming with +1.2% gain</li>
                <li>• Energy stocks under pressure due to oil price decline</li>
                <li>• Financial sector showing resilience amid rate concerns</li>
                <li>• Consumer discretionary stocks mixed on inflation data</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Drivers</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Fed Policy</h4>
                  <p className="text-sm text-blue-700">
                    Market pricing in 25bps rate cut with 70% probability for next meeting
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Earnings Season</h4>
                  <p className="text-sm text-green-700">
                    Q4 earnings beating expectations by average of 5.2%
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Geopolitical</h4>
                  <p className="text-sm text-yellow-700">
                    Trade tensions creating uncertainty in global supply chains
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}