import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialChart from "@/components/FinancialChart";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";

// Sample strategies data
const quantStrategies = [
  {
    id: "multi-factor",
    title: "Multi-Factor Equity Model",
    description: "A comprehensive multi-factor model incorporating value, momentum, quality, and low volatility factors with dynamic allocation based on market regime.",
    performance: "+12.4%",
    risk: "Medium",
    sharpeRatio: "1.85",
    chartData: [30, 32, 34, 36, 33, 36, 38, 40, 38, 42, 44, 46],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    featured: true
  },
  {
    id: "macro-trend",
    title: "Macro Trend Following",
    description: "Systematic approach to capturing persistent trends across asset classes, using a proprietary combination of momentum and mean reversion signals.",
    performance: "+15.7%",
    risk: "Medium-High",
    sharpeRatio: "1.62",
    chartData: [25, 28, 30, 28, 32, 36, 40, 38, 42, 46, 44, 48],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    featured: true
  },
  {
    id: "volatility-premium",
    title: "Volatility Risk Premium",
    description: "Sophisticated strategy designed to harvest volatility risk premia across equity and fixed income markets while managing tail risk effectively.",
    performance: "+9.2%",
    risk: "Low-Medium",
    sharpeRatio: "2.10",
    chartData: [40, 41, 43, 45, 44, 46, 47, 48, 50, 51, 52, 54],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    featured: true
  },
  {
    id: "alt-data",
    title: "Alternative Data Alpha",
    description: "Machine learning approach integrating non-traditional data sources (satellite imagery, consumer transactions, social media sentiment) for equity selection.",
    performance: "+18.3%",
    risk: "High",
    sharpeRatio: "1.45",
    chartData: [20, 23, 26, 30, 28, 33, 37, 35, 38, 42, 45, 48],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    featured: false
  }
];

// Backtest data
const backtestData = {
  cumulative: [
    { month: "Jan", strategy: 100, benchmark: 100 },
    { month: "Feb", strategy: 102, benchmark: 101 },
    { month: "Mar", strategy: 105, benchmark: 103 },
    { month: "Apr", strategy: 108, benchmark: 104 },
    { month: "May", strategy: 106, benchmark: 102 },
    { month: "Jun", strategy: 110, benchmark: 105 },
    { month: "Jul", strategy: 114, benchmark: 107 },
    { month: "Aug", strategy: 118, benchmark: 106 },
    { month: "Sep", strategy: 115, benchmark: 104 },
    { month: "Oct", strategy: 120, benchmark: 107 },
    { month: "Nov", strategy: 125, benchmark: 110 },
    { month: "Dec", strategy: 130, benchmark: 112 },
    { month: "Jan", strategy: 133, benchmark: 114 },
    { month: "Feb", strategy: 137, benchmark: 116 },
    { month: "Mar", strategy: 142, benchmark: 118 },
    { month: "Apr", strategy: 146, benchmark: 117 },
    { month: "May", strategy: 150, benchmark: 119 },
    { month: "Jun", strategy: 154, benchmark: 122 },
    { month: "Jul", strategy: 158, benchmark: 125 },
    { month: "Aug", strategy: 163, benchmark: 123 },
    { month: "Sep", strategy: 167, benchmark: 126 },
    { month: "Oct", strategy: 172, benchmark: 129 },
    { month: "Nov", strategy: 177, benchmark: 132 },
    { month: "Dec", strategy: 182, benchmark: 135 }
  ],
  drawdowns: [
    { date: "Feb 2023", strategy: -2.3, benchmark: -4.1 },
    { date: "May 2023", strategy: -3.6, benchmark: -5.8 },
    { date: "Sep 2023", strategy: -4.2, benchmark: -8.3 },
    { date: "Jan 2024", strategy: -2.5, benchmark: -3.7 },
    { date: "Apr 2024", strategy: -3.1, benchmark: -6.2 }
  ],
  monthlyReturns: [
    { month: "Jan", strategy: 0.0, benchmark: 0.0 },
    { month: "Feb", strategy: 2.0, benchmark: 1.0 },
    { month: "Mar", strategy: 2.9, benchmark: 2.0 },
    { month: "Apr", strategy: 2.9, benchmark: 1.0 },
    { month: "May", strategy: -1.9, benchmark: -1.9 },
    { month: "Jun", strategy: 3.8, benchmark: 2.9 },
    { month: "Jul", strategy: 3.6, benchmark: 1.9 },
    { month: "Aug", strategy: 3.5, benchmark: -0.9 },
    { month: "Sep", strategy: -2.5, benchmark: -1.9 },
    { month: "Oct", strategy: 4.3, benchmark: 2.9 },
    { month: "Nov", strategy: 4.2, benchmark: 2.8 },
    { month: "Dec", strategy: 4.0, benchmark: 1.8 }
  ]
};

// Performance metrics
const performanceMetrics = [
  { name: "Annualized Return", strategy: "18.2%", benchmark: "12.5%" },
  { name: "Volatility", strategy: "9.8%", benchmark: "14.2%" },
  { name: "Sharpe Ratio", strategy: "1.85", benchmark: "0.88" },
  { name: "Max Drawdown", strategy: "-7.4%", benchmark: "-12.6%" },
  { name: "Information Ratio", strategy: "1.42", benchmark: "N/A" },
  { name: "Beta", strategy: "0.65", benchmark: "1.00" },
  { name: "Alpha", strategy: "8.4%", benchmark: "0.0%" },
  { name: "Sortino Ratio", strategy: "2.45", benchmark: "1.12" }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded border border-gray-100">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? 
                          (entry.dataKey === 'strategy' || entry.dataKey === 'benchmark' ? 
                           entry.value.toFixed(1) : entry.value.toFixed(2) + '%') : 
                           entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const QuantitativeStrategies = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(quantStrategies[0].id);
  
  const strategy = quantStrategies.find(s => s.id === selectedStrategy) || quantStrategies[0];

  const { t } = useLanguage();
  
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('quantStrategies.title')}</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            {t('quantStrategies.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-8">{t('strategies.featured')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {quantStrategies.filter(s => s.featured).map((strategy) => (
              <div 
                key={strategy.id}
                className={`bg-neutral p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 ${selectedStrategy === strategy.id ? 'border-secondary' : 'border-transparent'}`}
                onClick={() => setSelectedStrategy(strategy.id)}
              >
                <h4 className="font-bold mb-3 flex items-center">
                  {strategy.title}
                  {selectedStrategy === strategy.id && (
                    <span className="ml-2 inline-block w-2 h-2 bg-secondary rounded-full"></span>
                  )}
                </h4>
                <p className="text-primary/70 text-sm mb-4">
                  {strategy.description.length > 100 
                    ? `${strategy.description.substring(0, 100)}...` 
                    : strategy.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-primary/60">{t('strategies.performance')}</p>
                    <p className="text-lg font-bold text-secondary">{strategy.performance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/60">{t('strategies.sharpe')}</p>
                    <p className="text-lg font-bold text-secondary">{strategy.sharpeRatio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/60">{t('strategies.risk')}</p>
                    <p className="text-lg font-bold text-secondary">{strategy.risk}</p>
                  </div>
                </div>
                <div className="h-32">
                  <FinancialChart 
                    chartData={strategy.chartData}
                    labels={strategy.labels}
                    height={120}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-neutral p-8 rounded-xl shadow-md">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">{strategy.title}</h3>
                <p className="text-primary/70 max-w-3xl">
                  {strategy.description}
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Link href={`/strategy-detail/${strategy.id}`} className="inline-flex items-center px-5 py-2.5 gold-gradient text-primary font-medium rounded-md hover:brightness-105 transition-all">
                  {t('strategies.strategyDetails')}
                </Link>
              </div>
            </div>
            
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="performance">{t('strategies.performance')}</TabsTrigger>
                <TabsTrigger value="drawdowns">{t('strategies.drawdowns')}</TabsTrigger>
                <TabsTrigger value="monthly">{t('strategies.monthlyReturns')}</TabsTrigger>
                <TabsTrigger value="metrics">{t('strategies.performanceMetrics')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="pt-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-bold mb-4">{t('strategies.cumulativeReturn')}</h4>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={backtestData.cumulative}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="strategy" 
                          name={`${strategy.title}`} 
                          stroke="#D4AF37" 
                          strokeWidth={2} 
                          dot={{ r: 0 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="benchmark" 
                          name="Benchmark" 
                          stroke="#2A2A2A" 
                          strokeWidth={2} 
                          dot={{ r: 0 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 bg-neutral p-4 rounded-lg">
                    <h5 className="font-bold mb-2">Strategy Description</h5>
                    <p className="text-sm text-primary/70">
                      This strategy combines multiple fundamental and technical factors with a proprietary regime-switching algorithm to dynamically allocate across factors based on market conditions. The model employs machine learning techniques to identify optimal factor weights and includes risk management overlays to mitigate drawdowns during adverse market environments.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="drawdowns" className="pt-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-bold mb-4">Historical Drawdowns (%)</h4>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={backtestData.drawdowns}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="strategy" name={`${strategy.title}`} fill="#D4AF37" />
                        <Bar dataKey="benchmark" name="Benchmark" fill="#2A2A2A" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 bg-neutral p-4 rounded-lg">
                    <h5 className="font-bold mb-2">Drawdown Management</h5>
                    <p className="text-sm text-primary/70">
                      The strategy incorporates sophisticated drawdown mitigation techniques, including dynamic exposure management, volatility targeting, and defensive factor rotation during market stress periods. This approach has historically resulted in shallower drawdowns and faster recovery times compared to traditional approaches and market benchmarks.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="pt-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-bold mb-4">Monthly Returns (Last 12 Months)</h4>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={backtestData.monthlyReturns}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="strategy" name={`${strategy.title}`} fill="#D4AF37" />
                        <Bar dataKey="benchmark" name="Benchmark" fill="#2A2A2A" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-neutral p-4 rounded-lg">
                      <p className="text-sm text-primary/60 mb-1">Positive Months</p>
                      <p className="text-xl font-bold text-secondary">83%</p>
                      <p className="text-xs text-primary/50">vs. 67% benchmark</p>
                    </div>
                    <div className="bg-neutral p-4 rounded-lg">
                      <p className="text-sm text-primary/60 mb-1">Best Month</p>
                      <p className="text-xl font-bold text-secondary">+4.3%</p>
                      <p className="text-xs text-primary/50">October 2024</p>
                    </div>
                    <div className="bg-neutral p-4 rounded-lg">
                      <p className="text-sm text-primary/60 mb-1">Worst Month</p>
                      <p className="text-xl font-bold text-secondary">-2.5%</p>
                      <p className="text-xs text-primary/50">September 2024</p>
                    </div>
                    <div className="bg-neutral p-4 rounded-lg">
                      <p className="text-sm text-primary/60 mb-1">Avg. Monthly Return</p>
                      <p className="text-xl font-bold text-secondary">+2.3%</p>
                      <p className="text-xs text-primary/50">vs. +0.9% benchmark</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="pt-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-bold mb-4">Performance Metrics</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-sm">Metric</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">{strategy.title}</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Benchmark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceMetrics.map((metric, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{metric.name}</td>
                            <td className="py-3 px-4 text-secondary font-bold">{metric.strategy}</td>
                            <td className="py-3 px-4">{metric.benchmark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 bg-neutral p-4 rounded-lg">
                    <h5 className="font-bold mb-2">Risk-Adjusted Performance</h5>
                    <p className="text-sm text-primary/70">
                      The strategy delivers superior risk-adjusted returns as evidenced by its high Sharpe and Sortino ratios. With a moderate beta of 0.65, the strategy provides meaningful diversification benefits while generating significant positive alpha. The information ratio above 1.4 demonstrates consistent outperformance relative to the benchmark.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-md border border-neutral">
            <h4 className="text-xl font-bold mb-4">Investment Process</h4>
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-secondary">1</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Factor Selection & Design</h5>
                  <p className="text-primary/70 text-sm">
                    Rigorous research process to identify persistent, economically intuitive factors with robust statistical properties across diverse market regimes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-secondary">2</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Signal Generation</h5>
                  <p className="text-primary/70 text-sm">
                    Proprietary algorithms transform raw data into alpha signals with appropriate normalization, outlier handling, and cross-sectional ranking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-secondary">3</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Portfolio Construction</h5>
                  <p className="text-primary/70 text-sm">
                    Sophisticated optimization framework incorporating signal alpha, risk factors, transaction costs, and portfolio constraints.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-secondary">4</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Risk Management</h5>
                  <p className="text-primary/70 text-sm">
                    Multi-layered risk framework including position limits, factor exposures, volatility targeting, and drawdown controls.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-secondary">5</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Implementation & Monitoring</h5>
                  <p className="text-primary/70 text-sm">
                    Efficient execution algorithms, continuous performance attribution, and strategy refinement process.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-neutral">
            <h4 className="text-xl font-bold mb-4">Strategy Applications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-neutral p-4 rounded-lg">
                <h5 className="font-bold text-secondary mb-2">Core Equity Allocation</h5>
                <p className="text-primary/70 text-sm">
                  Serve as a core equity allocation with improved risk-adjusted returns and lower drawdowns compared to traditional market cap-weighted indices.
                </p>
              </div>
              
              <div className="bg-neutral p-4 rounded-lg">
                <h5 className="font-bold text-secondary mb-2">Portfolio Diversification</h5>
                <p className="text-primary/70 text-sm">
                  Add as a complementary strategy to reduce overall portfolio correlation and enhance diversification beyond traditional asset classes.
                </p>
              </div>
              
              <div className="bg-neutral p-4 rounded-lg">
                <h5 className="font-bold text-secondary mb-2">Alpha Overlay</h5>
                <p className="text-primary/70 text-sm">
                  Implement as an alpha overlay to existing allocations, enhancing returns while maintaining desired market exposures.
                </p>
              </div>
              
              <div className="bg-neutral p-4 rounded-lg">
                <h5 className="font-bold text-secondary mb-2">Risk Mitigation</h5>
                <p className="text-primary/70 text-sm">
                  Utilize defensive characteristics to provide downside protection during market stress periods while participating in upside opportunities.
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-white border border-neutral rounded-lg p-6">
              <h5 className="font-bold mb-3">Client Customization Options</h5>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-primary/70 text-sm">Risk target customization based on investor profile</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-primary/70 text-sm">ESG/SRI integration with customizable criteria</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-primary/70 text-sm">Factor tilts based on client preferences or views</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-primary/70 text-sm">Tax-aware implementation for taxable investors</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-primary p-8 rounded-xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold mb-4">Strategy Implementation</h3>
              <p className="mb-6 text-neutral-300">
                Our quantitative strategies are available through various implementation options to meet the needs of institutional investors.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Separately Managed Accounts</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Fund Investment</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Advisory Services</span>
                <span className="bg-primary-light/30 px-3 py-1 rounded-full text-sm">Model Delivery</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <Link href="/implementation" className="block w-full py-3 px-6 gold-gradient text-primary font-medium rounded-md text-center hover:brightness-105 transition-all mb-3">
                Implementation Options
              </Link>
              <Link href="/contact" className="block w-full py-3 px-6 bg-transparent border border-secondary text-secondary font-medium rounded-md text-center hover:bg-secondary/10 transition-colors">
                Request Strategy Details
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuantitativeStrategies;