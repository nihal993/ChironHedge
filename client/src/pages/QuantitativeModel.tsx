import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for quantitative models
const volatilityModelData = [
  { date: "Jan", realized: 12, predicted: 13, historical: 14 },
  { date: "Feb", realized: 14, predicted: 15, historical: 15 },
  { date: "Mar", realized: 15, predicted: 14, historical: 14 },
  { date: "Apr", realized: 13, predicted: 12, historical: 12 },
  { date: "May", realized: 18, predicted: 17, historical: 15 },
  { date: "Jun", realized: 20, predicted: 19, historical: 17 },
  { date: "Jul", realized: 17, predicted: 18, historical: 16 },
  { date: "Aug", realized: 15, predicted: 16, historical: 15 },
  { date: "Sep", realized: 19, predicted: 20, historical: 18 },
  { date: "Oct", realized: 21, predicted: 20, historical: 19 },
  { date: "Nov", realized: 22, predicted: 23, historical: 21 },
  { date: "Dec", realized: 24, predicted: 23, historical: 22 }
];

const factorReturnsData = [
  { date: "Jan", value: 4.2, momentum: 2.1, quality: 1.5, lowVol: 3.2 },
  { date: "Feb", value: 3.8, momentum: 2.5, quality: 1.7, lowVol: 3.0 },
  { date: "Mar", value: 3.1, momentum: 3.2, quality: 2.1, lowVol: 2.7 },
  { date: "Apr", value: 2.5, momentum: 3.8, quality: 2.5, lowVol: 2.3 },
  { date: "May", value: 1.8, momentum: 4.2, quality: 3.1, lowVol: 2.1 },
  { date: "Jun", value: 1.2, momentum: 4.0, quality: 3.5, lowVol: 2.0 },
  { date: "Jul", value: 1.0, momentum: 3.7, quality: 3.8, lowVol: 2.2 },
  { date: "Aug", value: 1.5, momentum: 3.3, quality: 3.6, lowVol: 2.5 },
  { date: "Sep", value: 2.0, momentum: 3.0, quality: 3.2, lowVol: 2.8 },
  { date: "Oct", value: 2.6, momentum: 2.7, quality: 2.7, lowVol: 3.1 },
  { date: "Nov", value: 3.3, momentum: 2.3, quality: 2.2, lowVol: 3.5 },
  { date: "Dec", value: 3.9, momentum: 2.0, quality: 1.8, lowVol: 3.7 }
];

const yieldCurveData = [
  { month: "1m", current: 4.5, lastMonth: 4.2, lastYear: 3.8 },
  { month: "3m", current: 4.7, lastMonth: 4.3, lastYear: 4.0 },
  { month: "6m", current: 4.8, lastMonth: 4.5, lastYear: 4.2 },
  { month: "1y", current: 4.9, lastMonth: 4.7, lastYear: 4.3 },
  { month: "2y", current: 4.7, lastMonth: 4.6, lastYear: 4.5 },
  { month: "3y", current: 4.6, lastMonth: 4.5, lastYear: 4.6 },
  { month: "5y", current: 4.4, lastMonth: 4.3, lastYear: 4.7 },
  { month: "7y", current: 4.3, lastMonth: 4.2, lastYear: 4.8 },
  { month: "10y", current: 4.2, lastMonth: 4.1, lastYear: 4.9 },
  { month: "20y", current: 4.1, lastMonth: 4.0, lastYear: 5.0 },
  { month: "30y", current: 4.0, lastMonth: 3.9, lastYear: 5.1 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded border border-gray-100">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const QuantitativeModel = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Quantitative Models</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Explore our suite of sophisticated quantitative models that provide unique insights into market dynamics, risk factors, and investment opportunities.
          </p>
        </motion.div>
        
        <div className="mb-16">
          <Tabs defaultValue="volatility" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="volatility">Volatility Forecasting</TabsTrigger>
              <TabsTrigger value="factors">Factor Returns</TabsTrigger>
              <TabsTrigger value="yield">Yield Curve Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="volatility" className="pt-4">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">Volatility Forecasting Model</h3>
                <p className="text-primary/70 mb-6">
                  Our proprietary volatility prediction model leverages machine learning algorithms to forecast expected market volatility, comparing it with realized values and historical averages.
                </p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={volatilityModelData}
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
                      <Line 
                        type="monotone" 
                        dataKey="realized" 
                        name="Realized Volatility" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        name="Predicted Volatility" 
                        stroke="#2A2A2A" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="historical" 
                        name="Historical Average" 
                        stroke="#666666" 
                        strokeDasharray="5 5" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-primary/60 mb-1">Model Accuracy</p>
                    <p className="text-2xl font-bold text-secondary">92.7%</p>
                    <p className="text-xs text-primary/50">Last 12 months</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-primary/60 mb-1">Average Deviation</p>
                    <p className="text-2xl font-bold text-secondary">±1.2%</p>
                    <p className="text-xs text-primary/50">Predicted vs. Realized</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-primary/60 mb-1">Current Forecast</p>
                    <p className="text-2xl font-bold text-secondary">22.4%</p>
                    <p className="text-xs text-primary/50">Next 30 days</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="factors" className="pt-4">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">Equity Factor Returns</h3>
                <p className="text-primary/70 mb-6">
                  Analysis of major equity factor performance across time periods, showing the cyclicality and relative strength of different investment styles.
                </p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={factorReturnsData}
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
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Value" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="momentum" 
                        name="Momentum" 
                        stroke="#2A2A2A" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="quality" 
                        name="Quality" 
                        stroke="#666666" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lowVol" 
                        name="Low Volatility" 
                        stroke="#999999" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 bg-white p-4 rounded shadow-sm">
                  <h4 className="font-bold mb-3">Factor Rotation Analysis</h4>
                  <p className="text-primary/70 text-sm">
                    Current phase indicates a rotation from momentum to value factors, typically associated with a mid-cycle economic environment. Our models suggest this rotation may continue for the next 2-3 quarters, with quality factors potentially outperforming in the latter part of the period.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="yield" className="pt-4">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">Yield Curve Analysis</h3>
                <p className="text-primary/70 mb-6">
                  Comparative view of yield curves across different time periods, with analysis of curve shape, steepness, and implications for economic outlook.
                </p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={yieldCurveData}
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
                        dataKey="current" 
                        name="Current" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lastMonth" 
                        name="Last Month" 
                        stroke="#2A2A2A" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lastYear" 
                        name="Last Year" 
                        stroke="#666666" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-primary/60 mb-1">2s-10s Spread</p>
                    <p className="text-2xl font-bold text-secondary">-0.5%</p>
                    <p className="text-xs text-primary/50">Inverted</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-primary/60 mb-1">5s-30s Spread</p>
                    <p className="text-2xl font-bold text-secondary">0.4%</p>
                    <p className="text-xs text-primary/50">Flattening</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-primary/60 mb-1">Curve Steepness</p>
                    <p className="text-2xl font-bold text-secondary">Low</p>
                    <p className="text-xs text-primary/50">Historical Context</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-sm text-primary/60 mb-1">Recession Probability</p>
                    <p className="text-2xl font-bold text-secondary">62%</p>
                    <p className="text-xs text-primary/50">Next 12 months</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <motion.div 
          className="mt-16 bg-primary text-white p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Custom Model Development</h3>
              <p className="text-neutral-200 mb-6">
                Our quantitative research team can develop bespoke models tailored to your specific investment strategy, risk parameters, and asset classes.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-neutral-200">Proprietary factor development and testing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-neutral-200">Machine learning model optimization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-neutral-200">Alternative data integration capabilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-neutral-200">Production-ready implementation code</span>
                </li>
              </ul>
              <button className="inline-flex items-center px-6 py-3 gold-gradient text-primary font-medium rounded-md hover:brightness-105 transition-all">
                Request Custom Model Development
              </button>
            </div>
            <div className="bg-primary-light/20 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Model Methodology</h4>
              <p className="text-neutral-200 mb-4">
                Our quantitative models are developed using a rigorous process:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-200">
                <li>Comprehensive data collection and cleaning</li>
                <li>Feature engineering and selection</li>
                <li>Model development and training</li>
                <li>Backtesting across multiple market regimes</li>
                <li>Out-of-sample validation</li>
                <li>Ongoing recalibration and improvement</li>
              </ol>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-neutral-300">
                  All models undergo rigorous statistical validation and are continuously monitored for performance against established benchmarks.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuantitativeModel;