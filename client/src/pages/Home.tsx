import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AINews } from "@/lib/openai-service";
import { apiRequest } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  
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

      {/* News AI Banner - versione compatta */}
      <div className="mb-8 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center mb-2 sm:mb-0">
              <div className="h-6 w-1 bg-blue-600 mr-3"></div>
              <span className="text-sm font-medium text-blue-600">Latest Market News</span>
              <span className="text-xs text-primary/50 ml-3">May 12, 2025</span>
            </div>
            
            <div className="flex items-center space-x-1 text-primary">
              <button className="p-1 rounded hover:bg-gray-200">
                <span className="h-4 w-4 flex items-center justify-center">&#8249;</span>
              </button>
              
              <div className="max-w-xl overflow-hidden">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                  <span className="font-medium mr-2 text-green-600">Federal Reserve:</span>
                  Federal Reserve Announces Shift in Interest Rate Policy
                </div>
              </div>
              
              <button className="p-1 rounded hover:bg-gray-200">
                <span className="h-4 w-4 flex items-center justify-center">&#8250;</span>
              </button>
              
              <a href="/news-ai" className="ml-2 text-blue-600 text-sm font-medium flex items-center">
                More News <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Model Section */}
      <section id="quantitative-model" className="gs-section">
        <div className="flex justify-between items-center mb-8">
          <h2 className="gs-header flex items-center">
            Quantitative Model
            <button 
              onClick={() => toggleSection('quantitative-model')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 text-secondary transition-transform ${activeSection === 'quantitative-model' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'quantitative-model' || activeSection === null) && (
          <div>
            <p className="text-lg mb-6 max-w-3xl">
              Our proprietary models combine advanced mathematical techniques with machine learning to deliver predictive insights.
            </p>
            
            {/* Model Tab Set 1 */}
            <div className="gs-chart-container mb-8">
              <Tabs defaultValue="gdp" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-50">
                  <TabsTrigger value="gdp" className="text-primary font-medium">Global GDP Forecast</TabsTrigger>
                  <TabsTrigger value="inflation" className="text-primary font-medium">Inflation Projection</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gdp" className="pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="gs-chart-title">GDP Growth Forecast Model</h3>
                    <span className="gs-subtle-text">Updated: May 10, 2025</span>
                  </div>
                  <div className="h-72 mb-6">
                    <AreaChart 
                      data={gdpGrowthData}
                      categories={months}
                      title=""
                      height={280}
                      colors={['#0033A0', '#0052CC']}
                    />
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="max-w-md">
                      <p className="gs-subtle-text">
                        Our proprietary recursive neural network forecasts GDP with 87% higher accuracy than traditional models.
                      </p>
                    </div>
                    <a href="#" className="gs-arrow-link">
                      View methodology <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </TabsContent>
                
                <TabsContent value="inflation" className="pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="gs-chart-title">Inflation Rate Projection Model</h3>
                    <span className="gs-subtle-text">Updated: May 8, 2025</span>
                  </div>
                  <div className="h-72 mb-6">
                    <LineChart 
                      data={inflationData}
                      categories={months}
                      title=""
                      height={280}
                    />
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="max-w-md">
                      <p className="gs-subtle-text">
                        Our inflation model incorporates 143 distinct variables for superior predictive power in rate forecasting.
                      </p>
                    </div>
                    <a href="#" className="gs-arrow-link">
                      View methodology <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Model Set 2 - Factor & Strategy Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="gs-chart-container bg-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">Investment Factor Analysis</h3>
                  <span className="gs-subtle-text">Updated: May 11, 2025</span>
                </div>
                <div className="h-72 mb-6">
                  <MultiLineChart 
                    series={[
                      { name: 'Value', data: factorPerformance[0].data },
                      { name: 'Growth', data: factorPerformance[1].data },
                      { name: 'Momentum', data: factorPerformance[2].data },
                      { name: 'Quality', data: factorPerformance[3].data }
                    ]}
                    categories={months}
                    title=""
                    height={280}
                    colors={['#0033A0', '#0052CC', '#1D7AFC', '#4C9AFF']}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="max-w-md">
                    <p className="gs-subtle-text">
                      Our factor analysis identifies market anomalies through proprietary multi-factor regression models.
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    View white paper <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div className="gs-chart-container bg-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">Quantitative Strategy Assessment</h3>
                  <span className="gs-subtle-text">Updated: May 9, 2025</span>
                </div>
                <div className="h-72 mb-6">
                  <RadarChart 
                    data={portfolioMetrics}
                    categories={metricLabels}
                    title=""
                    height={280}
                    colors={['#0033A0']}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="max-w-md">
                    <p className="gs-subtle-text">
                      Our multi-dimensional strategy assessment framework evaluates risk-adjusted returns across market regimes.
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    Read methodology <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Model Set 3 - Economic Surprise Index */}
            <div className="gs-chart-container bg-white mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="gs-chart-title">Economic Surprise Index</h3>
                <span className="gs-subtle-text">Updated: May 12, 2025</span>
              </div>
              <div className="h-64 mb-6">
                <BarChart 
                  data={economicSurpriseData}
                  categories={months}
                  title=""
                  height={240}
                  colors={economicSurpriseData.map(val => val >= 0 ? '#0033A0' : '#a3a3a3')}
                />
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="max-w-md">
                  <p className="gs-subtle-text">
                    Our proprietary Economic Surprise Index measures the deviation of actual economic releases from consensus forecasts.
                  </p>
                </div>
                <a href="#" className="gs-arrow-link">
                  View detailed analytics <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
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
      <section id="our-research" className="gs-section bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="gs-header flex items-center">
            Research & Analysis
            <button 
              onClick={() => toggleSection('our-research')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 text-secondary transition-transform ${activeSection === 'our-research' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'our-research' || activeSection === null) && (
          <div>
            <p className="text-lg mb-8 max-w-3xl">
              Our research combines rigorous academic methodologies with practical applications for institutional investors.
            </p>
            
            {/* Featured Research - Stile Goldman Sachs */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-3">Featured Research</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Report Card 1 */}
                <div className="bg-white border border-gray-100 overflow-hidden flex flex-col">
                  <div className="relative h-44 bg-gray-200 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1582481725274-d63bdf929a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Global markets report" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-white text-primary px-3 py-1 text-xs font-medium">May 2025</div>
                  </div>
                  <div className="p-5 flex-grow">
                    <div className="text-sm text-blue-600 font-medium uppercase mb-2">Market Outlook</div>
                    <h4 className="text-lg font-semibold mb-3">Global Markets: Navigating Volatility</h4>
                    <p className="text-primary/70 text-sm mb-5">
                      Our analysts examine current market conditions and provide strategic guidance for institutional investors in a changing landscape.
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100">
                    <a href="#" className="gs-arrow-link">
                      Read the report <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                {/* Report Card 2 */}
                <div className="bg-white border border-gray-100 overflow-hidden flex flex-col">
                  <div className="relative h-44 bg-gray-200 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Institutional investor report" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-white text-primary px-3 py-1 text-xs font-medium">April 2025</div>
                  </div>
                  <div className="p-5 flex-grow">
                    <div className="text-sm text-blue-600 font-medium uppercase mb-2">Industry Analysis</div>
                    <h4 className="text-lg font-semibold mb-3">Financial Services Sector: Strategic Evolution</h4>
                    <p className="text-primary/70 text-sm mb-5">
                      Our in-depth analysis of the financial services industry explores strategic priorities and structural disruptions.
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100">
                    <a href="#" className="gs-arrow-link">
                      Read the report <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                {/* Report Card 3 */}
                <div className="bg-white border border-gray-100 overflow-hidden flex flex-col">
                  <div className="relative h-44 bg-gray-200 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="ESG Investment report" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-white text-primary px-3 py-1 text-xs font-medium">March 2025</div>
                  </div>
                  <div className="p-5 flex-grow">
                    <div className="text-sm text-blue-600 font-medium uppercase mb-2">ESG</div>
                    <h4 className="text-lg font-semibold mb-3">ESG Investment Framework for Institutions</h4>
                    <p className="text-primary/70 text-sm mb-5">
                      Our ESG research team provides a comprehensive framework for integrating sustainability metrics into investment decisions.
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100">
                    <a href="#" className="gs-arrow-link">
                      Read the report <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Publications */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3 bg-white border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-6">Recent Publications</h3>
                <div className="divide-y divide-gray-100">
                  <div className="py-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-blue-600 font-medium">Macro Economics</span>
                      <span className="text-xs text-primary/60">May 12, 2025</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Factor Timing Framework: Optimizing Allocations</h4>
                    <p className="text-primary/70 text-sm mb-3">
                      Quantitative approach to optimal factor allocation across market regimes with systematic implementation guidelines.
                    </p>
                    <p className="text-xs text-secondary">By Dr. Maria Rossi, Dr. James Chen</p>
                  </div>
                  
                  <div className="py-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-blue-600 font-medium">Portfolio Construction</span>
                      <span className="text-xs text-primary/60">April 28, 2025</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Entropy Portfolio Construction: Beyond Markowitz</h4>
                    <p className="text-primary/70 text-sm mb-3">
                      Novel optimization methodology with enhanced risk-adjusted returns across varying market conditions.
                    </p>
                    <p className="text-xs text-secondary">By Dr. Alessandro Bianchi</p>
                  </div>
                  
                  <div className="py-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-blue-600 font-medium">Fixed Income</span>
                      <span className="text-xs text-primary/60">March 15, 2025</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Yield Curve & Recession Prediction: ML Approaches</h4>
                    <p className="text-primary/70 text-sm mb-3">
                      Machine learning approach to yield curve dynamics analysis with improved forecasting accuracy.
                    </p>
                    <p className="text-xs text-secondary">By Michael Zhang, PhD</p>
                  </div>
                  
                  <div className="py-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-blue-600 font-medium">Global Markets</span>
                      <span className="text-xs text-primary/60">February 27, 2025</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Systematic Alpha: Cross-Asset Opportunities</h4>
                    <p className="text-primary/70 text-sm mb-3">
                      Identifying structural alpha opportunities across global markets using systematic methodologies.
                    </p>
                    <p className="text-xs text-secondary">By Dr. Sarah Johnson, Thomas Mueller</p>
                  </div>
                </div>
                <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                  <a href="#" className="gs-arrow-link">
                    View all publications <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* Research Categories */}
              <div className="md:w-1/3 bg-white border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-6">Research Categories</h3>
                <div className="space-y-4">
                  <a href="#" className="block p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <h4 className="font-medium text-lg mb-1">Macro Economic Analysis</h4>
                    <p className="text-primary/70 text-sm">Global trends, policy impacts, and growth forecasts</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-secondary">24 reports</span>
                      <span className="text-blue-600 text-sm">→</span>
                    </div>
                  </a>
                  
                  <a href="#" className="block p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <h4 className="font-medium text-lg mb-1">Sector Insights</h4>
                    <p className="text-primary/70 text-sm">Deep analysis of industry trends and opportunities</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-secondary">36 reports</span>
                      <span className="text-blue-600 text-sm">→</span>
                    </div>
                  </a>
                  
                  <a href="#" className="block p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <h4 className="font-medium text-lg mb-1">Quantitative Research</h4>
                    <p className="text-primary/70 text-sm">Statistical models and data-driven investment frameworks</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-secondary">18 reports</span>
                      <span className="text-blue-600 text-sm">→</span>
                    </div>
                  </a>
                  
                  <a href="#" className="block p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <h4 className="font-medium text-lg mb-1">Policy Research</h4>
                    <p className="text-primary/70 text-sm">Regulatory impact analysis and policy developments</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-secondary">16 reports</span>
                      <span className="text-blue-600 text-sm">→</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Macro Report Section */}
      <section id="macro-report" className="gs-section">
        <div className="flex justify-between items-center mb-8">
          <h2 className="gs-header flex items-center">
            Macroeconomic Analysis
            <button 
              onClick={() => toggleSection('macro-report')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 text-secondary transition-transform ${activeSection === 'macro-report' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'macro-report' || activeSection === null) && (
          <div>
            <p className="text-lg mb-8 max-w-3xl">
              Our macroeconomic analysis provides a comprehensive view of global economic conditions and forecasts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="gs-chart-container">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">Global Economic Growth</h3>
                  <span className="gs-subtle-text">Updated: May 12, 2025</span>
                </div>
                <div className="h-72 mb-6">
                  <BarChart 
                    data={[5.2, 4.1, 3.6, 7.8, 3.2, 2.1]}
                    categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                    title=""
                    height={280}
                    horizontal={true}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="max-w-md">
                    <p className="gs-subtle-text">
                      Annual GDP growth forecasts based on our proprietary leading indicators framework and econometric models.
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    View full report <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div className="gs-chart-container">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">Global Inflation Trends</h3>
                  <span className="gs-subtle-text">Updated: May 10, 2025</span>
                </div>
                <div className="h-72 mb-6">
                  <LineChart 
                    data={[3.8, 4.2, 5.1, 2.1, 1.8, 5.6]}
                    categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                    title=""
                    height={280}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="max-w-md">
                    <p className="gs-subtle-text">
                      Annual inflation rates forecast using our hybrid approach combining cost-push and demand-pull dynamics.
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    View forecast methodology <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="gs-chart-container">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">Manufacturing PMI</h3>
                  <span className="gs-subtle-text">Updated: May 9, 2025</span>
                </div>
                <div className="h-72 mb-6">
                  <AreaChart 
                    data={[52.1, 49.8, 48.6, 53.2, 48.9, 51.4]}
                    categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                    title=""
                    height={280}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="max-w-md">
                    <p className="gs-subtle-text">
                      Manufacturing Purchasing Managers' Index readings with our proprietary diffusion analysis methodology.
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    View indicator details <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div className="gs-chart-container">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">Central Bank Policy Rates</h3>
                  <span className="gs-subtle-text">Updated: May 11, 2025</span>
                </div>
                <div className="h-72 mb-6">
                  <BarChart 
                    data={[4.75, 3.75, 5.0, 3.55, 0.25, 10.75]}
                    categories={['US Fed', 'ECB', 'BoE', 'PBoC', 'BoJ', 'BCB']}
                    title=""
                    height={280}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="max-w-md">
                    <p className="gs-subtle-text">
                      Current policy rates with our proprietary forecasting model projections for the next four quarters.
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    View rate projections <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
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
                  View strategy details <span className="ml-1">&#8250;</span>
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
