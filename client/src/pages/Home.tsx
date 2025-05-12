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
      <section id="hero" className="w-full relative overflow-hidden bg-primary h-[500px] mb-8">
        <img 
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80" 
          alt="Abstract financial data visualization" 
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12 max-w-[900px]">
            <h5 className="text-secondary font-medium mb-3 text-sm uppercase tracking-wider">Advanced Financial Research</h5>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Hedge Fund Level Quantitative Research Solutions
            </h1>
            <p className="text-base md:text-lg text-neutral-300 mb-8 max-w-xl">
              Advanced financial analysis and proprietary quantitative models specifically designed for institutional investors.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => toggleSection('news-ai')}
                className="px-8 py-3 blue-gradient hover:brightness-105 font-medium text-white transition-all text-center inline-flex items-center justify-center"
              >
                Explore our platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News AI Section */}
      <section id="news-ai" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-secondary mr-2">01</span> News AI
            <button 
              onClick={() => toggleSection('news-ai')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'news-ai' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'news-ai' || activeSection === null) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News 1 */}
            <div className="border border-gray-200 hover:border-secondary transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1">Positive</span>
                  <span className="text-xs text-primary/50">May 12, 2025</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Federal Reserve Announces Shift in Interest Rate Policy</h3>
                <p className="text-primary/70 text-sm mb-4">
                  In a significant policy adjustment, the Federal Reserve has indicated a potential pivot in its approach to interest rates, suggesting a more accommodative stance may be forthcoming.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary/60">Source: Bloomberg Financial</span>
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                    Read Full Analysis <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* News 2 */}
            <div className="border border-gray-200 hover:border-secondary transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1">Neutral</span>
                  <span className="text-xs text-primary/50">May 10, 2025</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Emerging Markets Bond Yields Display Unusual Pattern Shift</h3>
                <p className="text-primary/70 text-sm mb-4">
                  Emerging market bond yields have exhibited an atypical pattern shift in recent trading sessions, pointing to a potential recalibration of risk assessment by institutional investors.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary/60">Source: Reuters</span>
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                    Read Full Analysis <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* News 3 */}
            <div className="border border-gray-200 hover:border-secondary transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1">Negative</span>
                  <span className="text-xs text-primary/50">May 8, 2025</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Tech Sector Valuations Face Scrutiny Amid AI Integration Challenges</h3>
                <p className="text-primary/70 text-sm mb-4">
                  Technology company valuations are under renewed scrutiny as investors reassess the timeline and implementation challenges associated with artificial intelligence integration.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary/60">Source: Wall Street Journal</span>
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                    Read Full Analysis <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quantitative Model Section */}
      <section id="quantitative-model" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-secondary mr-2">02</span> Quantitative Model
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
            <span className="text-secondary mr-2">03</span> Markets Insight
            <button 
              onClick={() => toggleSection('markets-insight')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'markets-insight' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'markets-insight' || activeSection === null) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-secondary text-white p-6">
              <h3 className="text-xl font-bold mb-4">Key Market Theme: Central Bank Divergence</h3>
              <p className="text-white/90 mb-6">
                Diverging monetary policy paths among major central banks are creating unique trading opportunities across asset classes.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 p-4">
                  <h4 className="font-bold text-white">Fed</h4>
                  <p className="text-white/80 text-sm">Gradual easing cycle with data-dependent approach</p>
                </div>
                <div className="bg-white/10 p-4">
                  <h4 className="font-bold text-white">ECB</h4>
                  <p className="text-white/80 text-sm">More aggressive cutting cycle amid growth concerns</p>
                </div>
                <div className="bg-white/10 p-4">
                  <h4 className="font-bold text-white">BOE</h4>
                  <p className="text-white/80 text-sm">Cautious stance due to persistent inflation pressures</p>
                </div>
                <div className="bg-white/10 p-4">
                  <h4 className="font-bold text-white">BOJ</h4>
                  <p className="text-white/80 text-sm">Early stages of policy normalization after decades</p>
                </div>
              </div>
              <button className="text-white hover:text-white/80 text-sm font-medium flex items-center">
                Read full analysis <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-6">
              <div className="border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-secondary font-medium">Global Equities</span>
                </div>
                <h4 className="font-bold mb-1">Sector Rotation Implications</h4>
                <p className="text-primary/70 text-sm">
                  Analysis of ongoing sector rotation trends and investment implications.
                </p>
                <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center mt-2">
                  View report <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-secondary font-medium">Fixed Income</span>
                </div>
                <h4 className="font-bold mb-1">Credit Spread Analysis</h4>
                <p className="text-primary/70 text-sm">
                  Current credit spread levels and historical comparisons by sector.
                </p>
                <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center mt-2">
                  View report <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-secondary font-medium">Commodities</span>
                </div>
                <h4 className="font-bold mb-1">Supply Constraints Impact</h4>
                <p className="text-primary/70 text-sm">
                  Analysis of persistent supply constraints on commodity prices.
                </p>
                <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center mt-2">
                  View report <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Our Research Section */}
      <section id="our-research" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-secondary mr-2">04</span> Our Research
            <button 
              onClick={() => toggleSection('our-research')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'our-research' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'our-research' || activeSection === null) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-primary text-white p-6">
              <h3 className="text-xl font-bold mb-4">Research Categories</h3>
              <ul className="space-y-3">
                <li className="flex items-center p-2 hover:bg-white/10 cursor-pointer">
                  <span className="w-2 h-2 bg-secondary mr-2"></span>
                  <span>Macro Analysis</span>
                </li>
                <li className="flex items-center p-2 hover:bg-white/10 cursor-pointer">
                  <span className="w-2 h-2 bg-secondary mr-2"></span>
                  <span>Volatility Research</span>
                </li>
                <li className="flex items-center p-2 hover:bg-white/10 cursor-pointer">
                  <span className="w-2 h-2 bg-secondary mr-2"></span>
                  <span>Credit Research</span>
                </li>
                <li className="flex items-center p-2 hover:bg-white/10 cursor-pointer">
                  <span className="w-2 h-2 bg-secondary mr-2"></span>
                  <span>Equity Factors</span>
                </li>
                <li className="flex items-center p-2 hover:bg-white/10 cursor-pointer">
                  <span className="w-2 h-2 bg-secondary mr-2"></span>
                  <span>Fixed Income Strategies</span>
                </li>
                <li className="flex items-center p-2 hover:bg-white/10 cursor-pointer">
                  <span className="w-2 h-2 bg-secondary mr-2"></span>
                  <span>Alternative Data</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/20">
                <button className="text-white hover:text-white/80 text-sm font-medium flex items-center">
                  View all research <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-secondary font-medium">Factor-Based Investment</span>
                    <span className="text-xs text-primary/50">May 2025</span>
                  </div>
                  <h4 className="font-bold mb-1">Factor Timing: A Quantitative Framework</h4>
                  <p className="text-primary/70 text-sm">
                    A novel quantitative framework for identifying market regimes and optimizing factor exposures.
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-primary/60">By Dr. Maria Rossi, Dr. James Chen</span>
                    <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read paper <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-secondary font-medium">Portfolio Construction</span>
                    <span className="text-xs text-primary/50">April 2025</span>
                  </div>
                  <h4 className="font-bold mb-1">Entropy-Based Portfolio Construction</h4>
                  <p className="text-primary/70 text-sm">
                    An entropy-based portfolio optimization methodology with superior risk-adjusted returns.
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-primary/60">By Dr. Alessandro Bianchi, Sarah Johnson</span>
                    <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read paper <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-secondary font-medium">Fixed Income</span>
                    <span className="text-xs text-primary/50">March 2025</span>
                  </div>
                  <h4 className="font-bold mb-1">Yield Curve Dynamics and Recession Prediction</h4>
                  <p className="text-primary/70 text-sm">
                    Machine learning techniques to analyze yield curve dynamics and improve recession prediction.
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-primary/60">By Michael Zhang, PhD, Emma Roberts</span>
                    <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read paper <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-secondary font-medium">ESG Research</span>
                    <span className="text-xs text-primary/50">February 2025</span>
                  </div>
                  <h4 className="font-bold mb-1">ESG Factor Integration</h4>
                  <p className="text-primary/70 text-sm">
                    Analysis of how ESG factor integration affects portfolio risk-adjusted returns across regions.
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-primary/60">By Dr. Sophie Williams, Thomas Nelson</span>
                    <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read paper <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
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
            <span className="text-secondary mr-2">05</span> Macro Report
            <button 
              onClick={() => toggleSection('macro-report')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === 'macro-report' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'macro-report' || activeSection === null) && (
          <div className="border border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Global Economic Outlook Q2 2025</h3>
              <p className="text-primary/70 mb-6">
                Comprehensive analysis of global economic conditions, with detailed forecasts for growth, inflation, and policy responses across major economies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="border border-gray-200 p-4">
                  <h4 className="font-bold mb-2">Developed Markets</h4>
                  <ul className="space-y-2 text-sm text-primary/70">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>US growth moderating but resilient</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>Eurozone facing more pronounced slowdown</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>UK facing stagflationary pressures</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 p-4">
                  <h4 className="font-bold mb-2">Emerging Markets</h4>
                  <ul className="space-y-2 text-sm text-primary/70">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>China stabilizing near 5% growth</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>India maintaining strong momentum</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>Brazil facing policy challenges</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 p-4">
                  <h4 className="font-bold mb-2">Policy Outlook</h4>
                  <ul className="space-y-2 text-sm text-primary/70">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>Central bank easing cycles progressing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>Fiscal consolidation in focus</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>Structural reforms gaining momentum</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                <div>
                  <span className="text-sm text-primary/60">Published: May 5, 2025</span>
                  <span className="text-sm text-primary/60 ml-4">Authors: Economics Team</span>
                </div>
                <button className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                  Read full report <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quantitative Strategies Section */}
      <section id="quantitative-strategies" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-secondary mr-2">06</span> Quantitative Strategies
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
            <span className="text-secondary mr-2">07</span> Get in Touch
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
