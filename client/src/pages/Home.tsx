import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AINews } from "@/lib/openai-service";
import { apiRequest } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { strategies } from "@/lib/data";

// Import chart components
import AreaChart from "@/components/charts/AreaChart";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import RadarChart from "@/components/charts/RadarChart";
import HeatMapChart from "@/components/charts/HeatMapChart";
import MultiLineChart from "@/components/charts/MultiLineChart";

// Import sample chart data
import { 
  months, 
  gdpGrowthData, 
  inflationData, 
  marketPerformance, 
  volatilityData, 
  interestRateData, 
  correlationData, 
  assetClasses, 
  factorPerformance, 
  portfolioMetrics, 
  metricLabels, 
  economicSurpriseData,
  sectorPerformanceData
} from "@/lib/chartData";

const Home = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      // Scroll to the section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section id="hero" className="w-full relative overflow-hidden bg-primary h-[600px] mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0a192f] to-[#0033a0] opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
          alt="Abstract financial data visualization" 
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-16 max-w-[1100px] mx-auto">
            <div className="border-l-4 border-secondary pl-6 mb-8">
              <h5 className="text-secondary font-medium mb-2 text-sm uppercase tracking-wide">Advanced Quantitative Analysis</h5>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                Institutional-Grade <br />Research Solutions
              </h1>
            </div>
            <p className="text-base md:text-xl text-white/80 mb-10 max-w-xl font-light">
              Proprietary models & advanced analytics delivering actionable insights for sophisticated investors.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => toggleSection('our-research')}
                className="gs-blue-btn px-8 py-4 text-lg"
              >
                Explore Our Research
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News AI Section */}
      <section id="news-ai" className="gs-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="gs-header flex items-center">
            News AI
            <button 
              onClick={() => toggleSection('news-ai')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 text-secondary transition-transform ${activeSection === 'news-ai' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'news-ai' || activeSection === null) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* News Ticker Section */}
            <div className="md:col-span-2 bg-secondary text-white p-6">
              <h3 className="text-xl font-bold mb-4">AI-Powered Financial News Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 p-4 flex flex-col">
                  <span className="text-white/80 text-xs mb-1">TRENDING</span>
                  <h4 className="font-bold text-white mb-2">Federal Reserve</h4>
                  <p className="text-white/80 text-sm mb-2">Significant shift in interest rate policy indicating more accommodative stance.</p>
                  <div className="flex items-center mt-auto">
                    <span className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-100 text-xs font-medium mr-2">
                      +2.1%
                    </span>
                    <span className="text-xs text-white/60">Market Impact</span>
                  </div>
                </div>
                
                <div className="bg-white/10 p-4 flex flex-col">
                  <span className="text-white/80 text-xs mb-1">TRENDING</span>
                  <h4 className="font-bold text-white mb-2">Tech Sector</h4>
                  <p className="text-white/80 text-sm mb-2">Valuations face scrutiny amid AI integration challenges in major companies.</p>
                  <div className="flex items-center mt-auto">
                    <span className="inline-flex items-center px-2 py-1 bg-red-500/20 text-red-100 text-xs font-medium mr-2">
                      -1.3%
                    </span>
                    <span className="text-xs text-white/60">Market Impact</span>
                  </div>
                </div>
                
                <div className="bg-white/10 p-4 flex flex-col">
                  <span className="text-white/80 text-xs mb-1">TRENDING</span>
                  <h4 className="font-bold text-white mb-2">Emerging Markets</h4>
                  <p className="text-white/80 text-sm mb-2">Bond yields display unusual pattern shift in recent trading sessions.</p>
                  <div className="flex items-center mt-auto">
                    <span className="inline-flex items-center px-2 py-1 bg-blue-500/20 text-blue-100 text-xs font-medium mr-2">
                      ±0.3%
                    </span>
                    <span className="text-xs text-white/60">Market Impact</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sentiment Analysis */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Market Sentiment Analysis</h3>
              <div className="h-64 mb-4">
                <LineChart 
                  data={[0.64, 0.58, 0.62, 0.45, 0.52, 0.49, 0.38, 0.42, 0.51, 0.59, 0.62, 0.68]}
                  categories={months}
                  title="Market Sentiment Index (0-1)"
                  height={240}
                />
              </div>
            </div>
            
            {/* News Categories */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">News by Category</h3>
              <div className="h-64 mb-4">
                <BarChart 
                  data={[32, 24, 18, 12, 9, 5]}
                  categories={['Monetary Policy', 'Corporate', 'Markets', 'Economics', 'Geopolitics', 'Regulatory']}
                  title="Today's News Distribution (%)"
                  height={240}
                  horizontal={true}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quantitative Model Section */}
      <section id="quantitative-model" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            Quantitative Model
            <button 
              onClick={() => toggleSection('quantitative-model')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'quantitative-model' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'quantitative-model' || activeSection === null) && (
          <div className="bg-white border border-gray-200 p-6">
            <Tabs defaultValue="gdp" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="gdp">GDP Growth</TabsTrigger>
                <TabsTrigger value="inflation">Inflation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gdp" className="pt-4">
                <h3 className="text-lg font-bold mb-2">GDP Growth Forecast (%)</h3>
                <p className="text-primary/70 mb-4 text-sm">
                  Our proprietary GDP growth forecast model shows a gradual slowing in global economic activity over the next 12 months.
                </p>
                <div className="h-64 mb-4">
                  <AreaChart 
                    data={gdpGrowthData}
                    categories={months}
                    title="GDP Growth Forecast"
                    height={240}
                  />
                </div>
                <div className="flex justify-end">
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                    View detailed analysis <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="inflation" className="pt-4">
                <h3 className="text-lg font-bold mb-2">Inflation Trends (%)</h3>
                <p className="text-primary/70 mb-4 text-sm">
                  Our inflation forecasting model projects a gradual decline in inflation rates across major economies in the coming year.
                </p>
                <div className="h-64 mb-4">
                  <LineChart 
                    data={inflationData}
                    categories={months}
                    title="Inflation Forecast"
                    height={240}
                  />
                </div>
                <div className="flex justify-end">
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                    View detailed analysis <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </section>

      {/* Markets Insight Section */}
      <section id="markets-insight" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            Markets Insight
            <button 
              onClick={() => toggleSection('markets-insight')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'markets-insight' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'markets-insight' || activeSection === null) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Market Performance</h3>
              <div className="h-64 mb-4">
                <MultiLineChart 
                  series={[
                    { name: 'US Markets', data: marketPerformance[0] },
                    { name: 'Europe', data: marketPerformance[1] },
                    { name: 'Asia', data: marketPerformance[2] }
                  ]}
                  categories={months}
                  title="Regional Performance (%)"
                  height={240}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Asset Correlation</h3>
              <div className="h-64 mb-4">
                <HeatMapChart 
                  data={correlationData}
                  categories={assetClasses}
                  title="Cross-Asset Correlation"
                  height={240}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Interest Rates</h3>
              <div className="h-64 mb-4">
                <LineChart 
                  data={interestRateData}
                  categories={months}
                  title="Policy Rate Projections (%)"
                  height={240}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Market Volatility</h3>
              <div className="h-64 mb-4">
                <AreaChart 
                  data={volatilityData}
                  categories={months}
                  title="Volatility Index (VIX)"
                  height={240}
                  colors={['#7c3aed', '#a78bfa']}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Our Research Section */}
      <section id="our-research" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            Our Research
            <button 
              onClick={() => toggleSection('our-research')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'our-research' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'our-research' || activeSection === null) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Factor Performance</h3>
              <div className="h-64 mb-4">
                <MultiLineChart 
                  series={[
                    { name: 'Value', data: factorPerformance[0].data },
                    { name: 'Growth', data: factorPerformance[1].data },
                    { name: 'Momentum', data: factorPerformance[2].data },
                    { name: 'Quality', data: factorPerformance[3].data }
                  ]}
                  categories={months}
                  title="Factor Performance Trend (%)"
                  height={240}
                  colors={['#0033A0', '#0052CC', '#1D7AFC', '#4C9AFF']}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Portfolio Metrics</h3>
              <div className="h-64 mb-4">
                <RadarChart 
                  data={portfolioMetrics}
                  categories={metricLabels}
                  title="Strategy Assessment"
                  height={240}
                  colors={['#0033A0']}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Economic Surprises</h3>
              <div className="h-64 mb-4">
                <BarChart 
                  data={economicSurpriseData}
                  categories={months}
                  title="Economic Surprise Index"
                  height={240}
                  colors={economicSurpriseData.map(val => val >= 0 ? '#0033A0' : '#a3a3a3')}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Latest Research Papers</h3>
              <div className="space-y-3">
                <div className="p-3 border-b border-gray-100">
                  <h4 className="font-bold">Factor Timing: A Quantitative Framework</h4>
                  <p className="text-xs text-primary/60">May 2025 · Dr. Maria Rossi, Dr. James Chen</p>
                </div>
                <div className="p-3 border-b border-gray-100">
                  <h4 className="font-bold">Entropy-Based Portfolio Construction</h4>
                  <p className="text-xs text-primary/60">April 2025 · Dr. Alessandro Bianchi, Sarah Johnson</p>
                </div>
                <div className="p-3 border-b border-gray-100">
                  <h4 className="font-bold">Yield Curve Dynamics and Recession Prediction</h4>
                  <p className="text-xs text-primary/60">March 2025 · Michael Zhang, PhD, Emma Roberts</p>
                </div>
                <div className="flex justify-end mt-3">
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                    View all publications <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Macro Report Section */}
      <section id="macro-report" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            Macro Report
            <button 
              onClick={() => toggleSection('macro-report')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'macro-report' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'macro-report' || activeSection === null) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Global GDP Growth</h3>
              <div className="h-64 mb-4">
                <BarChart 
                  data={[5.2, 4.1, 3.6, 7.8, 3.2, 2.1]}
                  categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                  title="GDP Growth by Region (%)"
                  height={240}
                  horizontal={true}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Inflation Trends</h3>
              <div className="h-64 mb-4">
                <LineChart 
                  data={[3.8, 4.2, 5.1, 2.1, 1.8, 5.6]}
                  categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                  title="Inflation by Region (%)"
                  height={240}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Manufacturing PMI</h3>
              <div className="h-64 mb-4">
                <AreaChart 
                  data={[52.1, 49.8, 48.6, 53.2, 48.9, 51.4]}
                  categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                  title="Manufacturing PMI by Region"
                  height={240}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Central Bank Rates</h3>
              <div className="h-64 mb-4">
                <BarChart 
                  data={[4.75, 3.75, 5.0, 3.55, 0.25, 10.75]}
                  categories={['US Fed', 'ECB', 'BoE', 'PBoC', 'BoJ', 'BCB']}
                  title="Policy Rates (%)"
                  height={240}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quantitative Strategies Section */}
      <section id="quantitative-strategies" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            Quantitative Strategies
            <button 
              onClick={() => toggleSection('quantitative-strategies')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'quantitative-strategies' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'quantitative-strategies' || activeSection === null) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.slice(0, 2).map((strategy) => (
              <div 
                key={strategy.id}
                className="border border-gray-200 p-6"
              >
                <h3 className="text-xl font-bold mb-3">{strategy.title}</h3>
                <p className="text-primary/70 text-sm mb-4">
                  {strategy.description.substring(0, 120)}...
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-primary/60">YTD Performance</p>
                    <p className="text-lg font-bold text-secondary">{strategy.performance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/60">Sharpe Ratio</p>
                    <p className="text-lg font-bold text-secondary">1.8</p>
                  </div>
                </div>
                <div className="h-32 mb-4">
                  <LineChart 
                    data={strategy.chartDataset || []}
                    categories={strategy.labels || []}
                    height={120}
                  />
                </div>
                <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                  View strategy details <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Get in Touch Section */}
      <section id="contact" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            Get in Touch
            <button 
              onClick={() => toggleSection('contact')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'contact' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'contact' || activeSection === null) && (
          <div className="border border-gray-200 p-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">
                Ready to elevate your investment strategies?
              </h3>
              <p className="text-primary/70 mb-6">
                Discover how our advanced quantitative research can support your investment decisions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 blue-gradient hover:brightness-105 font-medium text-white transition-all text-center inline-flex items-center justify-center">
                  Request a consultation
                </button>
                <button className="px-8 py-3 bg-white border border-secondary hover:bg-secondary/5 font-medium text-secondary transition-all text-center inline-flex items-center justify-center">
                  Schedule a demo
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
