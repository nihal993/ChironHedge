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
                {t('home.exploreOurResearch')}
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
              <div className="h-6 w-1 bg-secondary mr-3"></div>
              <span className="text-sm font-medium text-secondary">{t('home.latestMarketNews')}</span>
              <span className="text-xs text-primary/50 ml-3">May 12, 2025</span>
            </div>
            
            <div className="flex items-center space-x-1 text-primary">
              <button className="p-1 rounded hover:bg-gray-200">
                <span className="h-4 w-4 flex items-center justify-center">&#8249;</span>
              </button>
              
              <div className="max-w-xl overflow-hidden">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                  <span className="font-medium mr-2 text-green-600">{t('home.newsTitle')}:</span>
                  {t('home.newsContent')}
                </div>
              </div>
              
              <button className="p-1 rounded hover:bg-gray-200">
                <span className="h-4 w-4 flex items-center justify-center">&#8250;</span>
              </button>
              
              <a href="/news-ai" className="ml-2 text-secondary text-sm font-medium flex items-center">
                {t('home.moreNews')} <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Model Section */}
      <section id="quantitative-model" className="gs-section">
        <div className="flex justify-between items-center mb-8">
          <h2 className="gs-header flex items-center">
            {t('home.quantitativeModel')}
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
              {t('home.modelDescription')}
            </p>
            
            {/* Model Tab Set 1 */}
            <div className="gs-chart-container mb-8">
              <Tabs defaultValue="gdp" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-50">
                  <TabsTrigger value="gdp" className="text-primary font-medium">{t('home.gdpTab')}</TabsTrigger>
                  <TabsTrigger value="inflation" className="text-primary font-medium">{t('home.inflationTab')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gdp" className="pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="gs-chart-title">{t('home.gdpChartTitle')}</h3>
                    <span className="gs-subtle-text">{t('home.updated')}: {t('home.updateDate')}</span>
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
                        {t('home.gdpAccuracy')}
                      </p>
                    </div>
                    <a href="#" className="gs-arrow-link">
                      {t('home.viewMethodology')} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </TabsContent>
                
                <TabsContent value="inflation" className="pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="gs-chart-title">{t('home.inflationTitle')}</h3>
                    <span className="gs-subtle-text">{t('home.updated')}: {t('home.inflationUpdateDate')}</span>
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
                        {t('home.inflationModelDesc')}
                      </p>
                    </div>
                    <a href="#" className="gs-arrow-link">
                      {t('home.viewMethodology')} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Model Set 2 - Factor & Strategy Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="gs-chart-container bg-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">{t('home.factorAnalysisTitle')}</h3>
                  <span className="gs-subtle-text">{t('home.updated')}: {t('home.factorAnalysisUpdated')}</span>
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
                      {t('home.factorAnalysisDescription')}
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    {t('home.viewWhitePaper')} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div className="gs-chart-container bg-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="gs-chart-title">{t('home.forecastModelTitle')}</h3>
                  <span className="gs-subtle-text">{t('home.updated')}: {t('home.forecastModelUpdated')}</span>
                </div>
                <div className="h-72 mb-6">
                  <BarChart 
                    data={[92.6, 87.3, 75.8, 89.4, 94.1, 82.7]}
                    categories={['GDP', 'Inflation', 'FX Rates', 'Rates', 'Commodities', 'Equities']}
                    title=""
                    height={280}
                    horizontal={true}
                    colors={['#0033A0', '#0052CC', '#1D7AFC', '#4C9AFF', '#6685CC', '#8BA6E0']}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="max-w-md">
                    <p className="gs-subtle-text">
                      {t('home.forecastModelDesc')}
                    </p>
                  </div>
                  <a href="#" className="gs-arrow-link">
                    {t('home.viewModelMethodology')} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Markets Insight Section */}
      <section id="markets-insight" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            {t('home.marketsInsight')}
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
              <h3 className="text-xl font-bold mb-4">{t('home.marketPerformance')}</h3>
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
              <h3 className="text-xl font-bold mb-4">{t('home.assetCorrelation')}</h3>
              <div className="h-64 mb-4">
                <HeatMapChart 
                  data={correlationData}
                  categories={assetClasses}
                  title={t('home.crossAssetCorrelation')}
                  height={240}
                />
              </div>
            </div>
            
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">{t('home.interestRates')}</h3>
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
              <h3 className="text-xl font-bold mb-4">{t('home.marketVolatility')}</h3>
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
            {t('home.researchTitle')}
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
              {t('home.researchDescription')}
            </p>
            
            {/* Featured Research - Stile Goldman Sachs */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-3">{t('home.featuredResearch')}</h3>
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
                    <div className="text-sm text-blue-600 font-medium uppercase mb-2">{t('home.marketOutlook')}</div>
                    <h4 className="text-lg font-semibold mb-3">{t('home.globalMarketsTitle')}</h4>
                    <p className="text-primary/70 text-sm mb-5">
                      {t('home.globalMarketsDesc')}
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100">
                    <a href="#" className="gs-arrow-link">
                      {t('home.readTheReport')} <ArrowRight className="h-4 w-4" />
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
                      {t('home.readTheReport')} <ArrowRight className="h-4 w-4" />
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
                      {t('home.readTheReport')} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Research Categories */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <a href="#" className="block p-4 border border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <h4 className="font-medium text-lg mb-1">{t('research.macroEconomic')}</h4>
                <p className="text-primary/70 text-sm">{t('research.globalTrends')}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-secondary">24 {t('research.reportCount')}</span>
                  <span className="text-secondary text-sm">→</span>
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <h4 className="font-medium text-lg mb-1">{t('research.sectorInsights')}</h4>
                <p className="text-primary/70 text-sm">{t('research.industryTrends')}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-secondary">36 {t('research.reportCount')}</span>
                  <span className="text-secondary text-sm">→</span>
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <h4 className="font-medium text-lg mb-1">{t('research.quantitative')}</h4>
                <p className="text-primary/70 text-sm">{t('research.dataDriven')}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-secondary">18 {t('research.reportCount')}</span>
                  <span className="text-secondary text-sm">→</span>
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <h4 className="font-medium text-lg mb-1">{t('research.policyResearch')}</h4>
                <p className="text-primary/70 text-sm">{t('research.regulatoryAnalysis')}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-secondary">16 {t('research.reportCount')}</span>
                  <span className="text-secondary text-sm">→</span>
                </div>
              </a>
            </div>
            
            <div className="flex justify-end">
              <a href="#" className="gs-arrow-link">
                {t('research.viewAll')} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Macro Report Section - Ridimensionata */}
      <section id="macro-report" className="gs-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="gs-header flex items-center">
            {t('macroReport.title')}
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
            <p className="text-lg mb-6 max-w-3xl">
              {t('macroReport.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="gs-chart-container">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="gs-chart-title">{t('macroReport.globalEconomicGrowth')}</h3>
                  <span className="gs-subtle-text">{t('macroReport.updated')}: May 12, 2025</span>
                </div>
                <div className="h-64 mb-4">
                  <BarChart 
                    data={[5.2, 4.1, 3.6, 7.8, 3.2, 2.1]}
                    categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                    title=""
                    height={240}
                    horizontal={true}
                  />
                </div>
                <div className="flex justify-end pt-3 border-t border-gray-100">
                  <a href="#" className="gs-arrow-link">
                    {t('macroReport.viewFullReport')} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div className="gs-chart-container">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="gs-chart-title">{t('macroReport.globalInflationTrends')}</h3>
                  <span className="gs-subtle-text">{t('macroReport.updated')}: May 10, 2025</span>
                </div>
                <div className="h-64 mb-4">
                  <LineChart 
                    data={[3.8, 4.2, 5.1, 2.1, 1.8, 5.6]}
                    categories={['US', 'Eurozone', 'UK', 'China', 'Japan', 'Brazil']}
                    title=""
                    height={240}
                  />
                </div>
                <div className="flex justify-end pt-3 border-t border-gray-100">
                  <a href="#" className="gs-arrow-link">
                    {t('macroReport.viewForecastMethodology')} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mb-2">
              <a href="#" className="gs-arrow-link">
                {t('macroReport.viewAllMacro')} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Quantitative Strategies Section - Espansa */}
      <section id="quantitative-strategies" className="gs-section bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="gs-header flex items-center">
            {t('home.quantitativeStrategies')}
            <button 
              onClick={() => toggleSection('quantitative-strategies')} 
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 text-secondary transition-transform ${activeSection === 'quantitative-strategies' ? 'transform rotate-180' : ''}`} />
            </button>
          </h2>
        </div>
        
        {(activeSection === 'quantitative-strategies' || activeSection === null) && (
          <div>
            <p className="text-lg mb-8 max-w-3xl">
              {t('strategies.systemDescription')}
            </p>
            
            {/* Strategy Cards Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">{t('strategies.multiAsset')}</span>
                  <span className="text-green-600 font-bold">+16.4%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('strategies.globalTactical')}</h3>
                <p className="text-primary/70 text-sm mb-5">
                  {t('strategies.dynamicAllocation')}
                </p>
                <div className="h-40 mb-5">
                  <LineChart 
                    data={[10.2, 12.8, 14.1, 13.5, 14.8, 15.2, 16.4]}
                    categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                    height={160}
                    colors={['#0033A0']}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">{t('strategies.metrics.sharpe')}</p>
                    <p className="text-primary font-bold">1.94</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">{t('strategies.metrics.vol')}</p>
                    <p className="text-primary font-bold">9.2%</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">{t('strategies.metrics.maxdd')}</p>
                    <p className="text-primary font-bold">-8.1%</p>
                  </div>
                </div>
                <a href="#" className="gs-arrow-link">
                  View strategy details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              
              <div className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">{t('strategies.equityFocus')}</span>
                  <span className="text-green-600 font-bold">+21.2%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('strategies.multiFactorEquity')}</h3>
                <p className="text-primary/70 text-sm mb-5">
                  Systematic equity selection combining value, momentum, quality, and low volatility factors with adaptive weighting algorithm.
                </p>
                <div className="h-40 mb-5">
                  <LineChart 
                    data={[8.1, 10.5, 12.8, 14.2, 17.8, 19.5, 21.2]}
                    categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                    height={160}
                    colors={['#1D7AFC']}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Sharpe</p>
                    <p className="text-primary font-bold">2.16</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Vol</p>
                    <p className="text-primary font-bold">12.5%</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Max DD</p>
                    <p className="text-primary font-bold">-11.2%</p>
                  </div>
                </div>
                <a href="#" className="gs-arrow-link">
                  View strategy details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              
              <div className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Fixed Income</span>
                  <span className="text-green-600 font-bold">+12.8%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Global Macro Fixed Income</h3>
                <p className="text-primary/70 text-sm mb-5">
                  Systematic approach to global sovereign and credit markets utilizing term structure models and credit spread analyses.
                </p>
                <div className="h-40 mb-5">
                  <LineChart 
                    data={[5.2, 6.8, 8.1, 9.2, 10.5, 11.7, 12.8]}
                    categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                    height={160}
                    colors={['#4C9AFF']}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Sharpe</p>
                    <p className="text-primary font-bold">1.75</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Vol</p>
                    <p className="text-primary font-bold">7.8%</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Max DD</p>
                    <p className="text-primary font-bold">-5.9%</p>
                  </div>
                </div>
                <a href="#" className="gs-arrow-link">
                  View strategy details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Strategy Cards Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Volatility</span>
                  <span className="text-green-600 font-bold">+14.5%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Statistical Arbitrage VIX</h3>
                <p className="text-primary/70 text-sm mb-5">
                  Exploits volatility risk premium through algorithmic trading of VIX futures and options with dynamic hedging.
                </p>
                <div className="h-40 mb-5">
                  <LineChart 
                    data={[6.2, 7.5, 8.8, 10.4, 11.8, 13.2, 14.5]}
                    categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                    height={160}
                    colors={['#0052CC']}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Sharpe</p>
                    <p className="text-primary font-bold">1.82</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Vol</p>
                    <p className="text-primary font-bold">8.5%</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Max DD</p>
                    <p className="text-primary font-bold">-7.2%</p>
                  </div>
                </div>
                <a href="#" className="gs-arrow-link">
                  View strategy details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              
              <div className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">ESG</span>
                  <span className="text-green-600 font-bold">+18.7%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Sustainable Alpha Strategy</h3>
                <p className="text-primary/70 text-sm mb-5">
                  Quantitative approach to ESG investing leveraging proprietary sustainability metrics with factor integration.
                </p>
                <div className="h-40 mb-5">
                  <LineChart 
                    data={[7.8, 9.2, 11.5, 13.8, 15.2, 17.0, 18.7]}
                    categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                    height={160}
                    colors={['#00875A']}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Sharpe</p>
                    <p className="text-primary font-bold">2.05</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Vol</p>
                    <p className="text-primary font-bold">11.2%</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Max DD</p>
                    <p className="text-primary font-bold">-9.5%</p>
                  </div>
                </div>
                <a href="#" className="gs-arrow-link">
                  View strategy details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              
              <div className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Alternatives</span>
                  <span className="text-green-600 font-bold">+22.5%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">ML-Enhanced Event Arbitrage</h3>
                <p className="text-primary/70 text-sm mb-5">
                  Machine learning approach to event-driven investing with focus on mergers, spinoffs, and corporate restructurings.
                </p>
                <div className="h-40 mb-5">
                  <LineChart 
                    data={[9.2, 11.5, 14.8, 16.2, 18.5, 20.1, 22.5]}
                    categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                    height={160}
                    colors={['#5243AA']}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Sharpe</p>
                    <p className="text-primary font-bold">2.32</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Vol</p>
                    <p className="text-primary font-bold">13.8%</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50">
                    <p className="text-xs text-primary/60">Max DD</p>
                    <p className="text-primary font-bold">-12.3%</p>
                  </div>
                </div>
                <a href="#" className="gs-arrow-link">
                  View strategy details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Strategy Comparison */}
            <div className="bg-white border border-gray-100 p-6 shadow-sm mb-6">
              <h3 className="text-xl font-bold mb-6">Strategy Performance Comparison</h3>
              <div className="h-80">
                <MultiLineChart 
                  series={[
                    { name: 'GTAA', data: [10.2, 12.8, 14.1, 13.5, 14.8, 15.2, 16.4] },
                    { name: 'Multi-Factor', data: [8.1, 10.5, 12.8, 14.2, 17.8, 19.5, 21.2] },
                    { name: 'Fixed Income', data: [5.2, 6.8, 8.1, 9.2, 10.5, 11.7, 12.8] },
                    { name: 'Vol Arb', data: [6.2, 7.5, 8.8, 10.4, 11.8, 13.2, 14.5] },
                    { name: 'ESG', data: [7.8, 9.2, 11.5, 13.8, 15.2, 17.0, 18.7] },
                    { name: 'Event Arb', data: [9.2, 11.5, 14.8, 16.2, 18.5, 20.1, 22.5] }
                  ]}
                  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                  title=""
                  height={320}
                  colors={['#0033A0', '#1D7AFC', '#4C9AFF', '#0052CC', '#00875A', '#5243AA']}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <a href="#" className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium flex items-center">
                View all quantitative strategies <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="mb-12 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            {t('home.contactUs')}
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
              <div className="flex justify-center">
                <button className="px-10 py-3 blue-gradient hover:brightness-105 font-medium text-white transition-all text-center inline-flex items-center justify-center">
                  Request a consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      
      {/* Social Media Banner */}
      <div className="border-t border-gray-200 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* About Us and Mission Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">{t('aboutUs.title')}</h2>
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <p className="text-primary/80 mb-6 leading-relaxed">
                      {t('aboutUs.description1')}
                    </p>
                    <p className="text-primary/80 mb-6 leading-relaxed">
                      {t('aboutUs.description2')}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary/80 mb-6 leading-relaxed">
                      {t('aboutUs.description3')}
                    </p>
                    <p className="text-primary/80 leading-relaxed">
                      {t('aboutUs.description4')}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">Our Mission</h2>
                <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-lg">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-5">
                      <div className="bg-blue-50 w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v0"/><path d="M12 7V3h-3"/><path d="m15 6 2-3"/><path d="M13.6 17.2a3 3 0 0 1-2.2.8h0a3 3 0 0 1-2.8-2m1.8-1h3.2"/><circle cx="12" cy="12" r="10"/></svg>
                      </div>
                      <h3 className="text-primary font-semibold mb-2">Innovation</h3>
                      <p className="text-primary/70 text-sm">We continuously develop new methodologies and analytical models to address the challenges of evolving markets.</p>
                    </div>
                    
                    <div className="p-5">
                      <div className="bg-blue-50 w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><path d="M8 11h6"/></svg>
                      </div>
                      <h3 className="text-primary font-semibold mb-2">Precision</h3>
                      <p className="text-primary/70 text-sm">Our research is based on verifiable data and rigorous analysis, with a constant commitment to accuracy and quality.</p>
                    </div>
                    
                    <div className="p-5">
                      <div className="bg-blue-50 w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a1 1 0 0 1 1.733 0L16.3 8.9a.7.7 0 0 1-.626 1.1"/><path d="M19 14.5a3.5 3.5 0 0 0-3.5-3.5h-1a3.5 3.5 0 0 0-7 0h-1a3.5 3.5 0 0 0-3.5 3.5"/><path d="M14 15h-4v5h4"/></svg>
                      </div>
                      <h3 className="text-primary font-semibold mb-2">Integrity</h3>
                      <p className="text-primary/70 text-sm">We maintain the highest ethical standards and transparency in all our analyses and recommendations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
