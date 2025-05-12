import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialChart from "@/components/FinancialChart";

// Sample market insights data
const marketInsightsData = [
  {
    id: "insight-1",
    title: "Global Central Bank Policy Divergence Analysis",
    description: "In-depth examination of the growing divergence in central bank policies across major economies and implications for currency markets and global asset allocation.",
    type: "Weekly Analysis",
    date: "May 9, 2025",
    category: "Monetary Policy"
  },
  {
    id: "insight-2",
    title: "Commodity Supercycle Evaluation",
    description: "Structural analysis of whether current commodity price trends represent a new supercycle or a temporary pandemic-recovery phenomenon.",
    type: "Special Report",
    date: "May 7, 2025",
    category: "Commodities"
  },
  {
    id: "insight-3",
    title: "High Frequency Alternative Data Signals",
    description: "Exploring the latest high-frequency alternative data sources and their predictive capabilities for equity market movements.",
    type: "Research Paper",
    date: "May 5, 2025",
    category: "Alternative Data"
  },
  {
    id: "insight-4",
    title: "Corporate Credit Spreads: Risk Premia Analysis",
    description: "Decomposition of corporate credit spreads into risk premia components, with focus on current market distortions and opportunities.",
    type: "Monthly Review",
    date: "May 1, 2025",
    category: "Fixed Income"
  }
];

// Sample market data
const equityData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      name: "S&P 500",
      data: [4200, 4150, 4250, 4300, 4400, 4450, 4500, 4550, 4400, 4500, 4600, 4650]
    },
    {
      name: "FTSE 100",
      data: [7500, 7450, 7550, 7600, 7650, 7700, 7750, 7800, 7750, 7850, 7900, 7950]
    },
    {
      name: "Nikkei 225",
      data: [28500, 28000, 28700, 29000, 29500, 30000, 30500, 29800, 29500, 30200, 30800, 31000]
    }
  ]
};

const bondYields = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      name: "US 10Y",
      data: [1.5, 1.6, 1.7, 1.6, 1.5, 1.4, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8]
    },
    {
      name: "German 10Y",
      data: [0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5]
    },
    {
      name: "UK 10Y",
      data: [0.9, 1.0, 1.1, 1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2]
    }
  ]
};

const commoditiesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      name: "Gold",
      data: [1800, 1820, 1840, 1860, 1880, 1900, 1920, 1940, 1930, 1950, 1970, 1990]
    },
    {
      name: "Oil (WTI)",
      data: [70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92]
    },
    {
      name: "Copper",
      data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3]
    }
  ]
};

const categoryColors = {
  "Monetary Policy": "bg-blue-100 text-blue-800",
  "Commodities": "bg-amber-100 text-amber-800",
  "Alternative Data": "bg-purple-100 text-purple-800",
  "Fixed Income": "bg-green-100 text-green-800",
  "Equities": "bg-red-100 text-red-800",
  "Currencies": "bg-cyan-100 text-cyan-800"
};

const MarketsInsight = () => {
  const [selectedDataset, setSelectedDataset] = useState("S&P 500");

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Markets Insight</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Comprehensive analysis of financial markets, identifying key trends, risks, and opportunities across asset classes.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-neutral p-6 rounded-xl shadow-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4">Market Performance</h3>
              
              <Tabs defaultValue="equities" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="equities">Equities</TabsTrigger>
                  <TabsTrigger value="bonds">Bond Yields</TabsTrigger>
                  <TabsTrigger value="commodities">Commodities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="equities" className="pt-2">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="flex justify-end mb-2">
                      <div className="flex space-x-4">
                        {equityData.datasets.map((dataset) => (
                          <button
                            key={dataset.name}
                            className={`text-xs px-3 py-1 rounded-full ${
                              selectedDataset === dataset.name
                                ? "bg-secondary text-white"
                                : "bg-neutral-200 text-primary hover:bg-neutral-300"
                            }`}
                            onClick={() => setSelectedDataset(dataset.name)}
                          >
                            {dataset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-64">
                      <FinancialChart 
                        chartData={equityData.datasets.find(d => d.name === selectedDataset)?.data || []}
                        labels={equityData.labels}
                        title={selectedDataset}
                        height={240}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-primary/70">
                    Equity markets continue to show resilience despite rising interest rates, with technology and energy sectors leading performance. However, valuation concerns persist as multiples remain elevated relative to historical averages.
                  </p>
                </TabsContent>
                
                <TabsContent value="bonds" className="pt-2">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="h-64">
                      <FinancialChart 
                        chartData={bondYields.datasets[0].data}
                        labels={bondYields.labels}
                        title="US 10Y Treasury Yield"
                        height={240}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-primary/70">
                    Bond yields have been trending higher amid persistent inflation and hawkish central bank policies. The yield curve inversion between 2-year and 10-year Treasuries continues to signal potential economic slowdown ahead.
                  </p>
                </TabsContent>
                
                <TabsContent value="commodities" className="pt-2">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="h-64">
                      <FinancialChart 
                        chartData={commoditiesData.datasets[0].data}
                        labels={commoditiesData.labels}
                        title="Gold Price (USD/oz)"
                        height={240}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-primary/70">
                    Commodities have shown divergent performance, with energy prices stabilizing after recent volatility. Precious metals continue to benefit from safe-haven demand amid geopolitical tensions and inflation concerns.
                  </p>
                </TabsContent>
              </Tabs>
            </motion.div>
            
            <motion.div 
              className="bg-primary text-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Key Market Themes</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary-light/20 p-4 rounded-lg">
                  <h4 className="font-bold text-secondary mb-2">Inflation Persistence</h4>
                  <p className="text-neutral-200 text-sm">
                    Despite monetary tightening, inflation remains above target in major economies, challenging the transitory narrative and potentially forcing more aggressive policy responses.
                  </p>
                </div>
                <div className="bg-primary-light/20 p-4 rounded-lg">
                  <h4 className="font-bold text-secondary mb-2">Liquidity Contraction</h4>
                  <p className="text-neutral-200 text-sm">
                    Global liquidity is shrinking as central banks reduce balance sheets, potentially impacting asset prices that have benefited from abundant liquidity conditions.
                  </p>
                </div>
                <div className="bg-primary-light/20 p-4 rounded-lg">
                  <h4 className="font-bold text-secondary mb-2">China Economic Transition</h4>
                  <p className="text-neutral-200 text-sm">
                    China's shift toward "common prosperity" and away from property-led growth has significant implications for global supply chains and commodity markets.
                  </p>
                </div>
                <div className="bg-primary-light/20 p-4 rounded-lg">
                  <h4 className="font-bold text-secondary mb-2">Technological Disruption</h4>
                  <p className="text-neutral-200 text-sm">
                    Accelerating technological change, particularly in AI and clean energy, is creating new investment opportunities while disrupting traditional business models.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Latest Insights</h3>
            <div className="space-y-4">
              {marketInsightsData.map((insight, index) => (
                <div 
                  key={insight.id}
                  className="bg-neutral p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${categoryColors[insight.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}`}>
                      {insight.category}
                    </span>
                    <span className="text-xs text-primary/50">{insight.date}</span>
                  </div>
                  <h4 className="font-bold mb-2">{insight.title}</h4>
                  <p className="text-primary/70 text-sm mb-3">
                    {insight.description.length > 120 
                      ? `${insight.description.substring(0, 120)}...` 
                      : insight.description}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-xs text-primary/60">{insight.type}</span>
                    <Link href={`/markets-insight/${insight.id}`} className="text-secondary hover:text-secondary/80 text-sm font-medium">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/all-insights" className="inline-flex items-center px-5 py-2.5 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors">
                View All Market Insights
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-white p-8 rounded-xl shadow-md border border-neutral mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Custom Market Analysis</h3>
              <p className="text-primary/70 mb-6">
                Our team of analysts can provide customized market analysis focused on specific sectors, regions, or asset classes relevant to your investment strategy.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-primary/70">Tailored to your investment universe and mandates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-primary/70">Integration of proprietary quantitative signals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-primary/70">Regular updates and direct analyst access</span>
                </li>
              </ul>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 gold-gradient text-primary font-medium rounded-md hover:brightness-105 transition-all">
                Request Custom Analysis
              </Link>
            </div>
            <div className="bg-neutral p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Upcoming Market Webcasts</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-secondary pl-4">
                  <h5 className="font-bold">Q2 2025 Market Outlook</h5>
                  <p className="text-sm text-primary/60 mb-1">May 15, 2025 • 10:00 AM EST</p>
                  <p className="text-xs text-primary/50">With Chief Economist Dr. Alessandro Rossi</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h5 className="font-bold">Global Monetary Policy Analysis</h5>
                  <p className="text-sm text-primary/60 mb-1">May 22, 2025 • 11:00 AM EST</p>
                  <p className="text-xs text-primary/50">With Head of Fixed Income Research</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h5 className="font-bold">Alternative Data Investment Applications</h5>
                  <p className="text-sm text-primary/60 mb-1">May 29, 2025 • 2:00 PM EST</p>
                  <p className="text-xs text-primary/50">With Quantitative Strategy Team</p>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 text-center text-secondary hover:text-secondary/80 font-medium">
                Register for Webcasts
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketsInsight;