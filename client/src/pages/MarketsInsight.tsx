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

// Sample market data for all charts
const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Row 1: Major Equity Indices
const equityIndices = [
  {
    title: "S&P 500",
    description: "The S&P 500 has shown strong resilience despite macroeconomic headwinds, driven primarily by technology and AI-related stocks. Recent price action suggests institutional investors are positioning for continued earnings growth.",
    data: [4200, 4150, 4250, 4300, 4400, 4450, 4500, 4550, 4400, 4500, 4600, 4650]
  },
  {
    title: "NASDAQ Composite",
    description: "Technology stocks continue to outperform the broader market, with the NASDAQ showing particular strength in semiconductor, cloud computing, and AI sectors. Valuation concerns remain but are offset by strong earnings growth.",
    data: [14000, 13800, 14200, 14500, 14700, 15000, 15200, 15300, 15100, 15400, 15700, 16000]
  },
  {
    title: "Euro Stoxx 50",
    description: "European equities have underperformed US markets, reflecting concerns over economic growth and geopolitical tensions. Banking sector strength has been a positive, while manufacturing continues to face headwinds.",
    data: [4100, 4050, 4150, 4200, 4250, 4300, 4350, 4320, 4270, 4350, 4400, 4450]
  },
  {
    title: "Nikkei 225",
    description: "Japanese equities have benefited from accommodative monetary policy and corporate governance reforms. Export-oriented companies have performed particularly well despite regional growth concerns.",
    data: [28500, 28000, 28700, 29000, 29500, 30000, 30500, 29800, 29500, 30200, 30800, 31000]
  }
];

// Row 2: Fixed Income Markets
const fixedIncomeMarkets = [
  {
    title: "US Treasury Yields (10Y)",
    description: "US Treasury yields have been gradually rising as the Federal Reserve maintains a hawkish stance on inflation. The yield curve inversion between 2Y and 10Y continues to signal caution about economic growth prospects.",
    data: [3.8, 3.9, 4.0, 4.1, 4.0, 3.9, 3.8, 3.7, 3.8, 3.9, 4.0, 4.1]
  },
  {
    title: "Investment Grade Spreads",
    description: "Credit spreads for investment-grade bonds have remained relatively stable, reflecting investor confidence in corporate balance sheets despite higher financing costs. Bank and financial sector spreads have shown more volatility.",
    data: [1.2, 1.3, 1.4, 1.3, 1.2, 1.1, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5]
  },
  {
    title: "High Yield Bond Performance",
    description: "High yield bonds have demonstrated resilience despite rising rates, with default rates remaining below historical averages. Energy and consumer discretionary sectors have shown particular strength.",
    data: [5.5, 5.4, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.8, 5.7, 5.6]
  },
  {
    title: "Emerging Market Debt",
    description: "Emerging market debt has faced challenges from dollar strength and rising US rates. Differentiation across countries has increased, with commodity exporters outperforming importers in this environment.",
    data: [6.5, 6.7, 6.9, 7.0, 6.8, 6.6, 6.5, 6.4, 6.6, 6.8, 7.0, 7.1]
  }
];

// Row 3: Commodities and Alternative Assets
const commoditiesAndAlternatives = [
  {
    title: "Gold (USD/oz)",
    description: "Gold prices have trended higher amid geopolitical uncertainties and persistent inflation concerns. Central bank purchases continue to provide support, while investor positioning suggests further potential upside.",
    data: [1800, 1820, 1840, 1860, 1880, 1900, 1920, 1940, 1930, 1950, 1970, 1990]
  },
  {
    title: "Crude Oil (WTI)",
    description: "Oil prices have fluctuated within a range, balancing supply constraints from OPEC+ against demand concerns related to global growth. Geopolitical premium remains embedded in current pricing.",
    data: [70, 72, 74, 76, 78, 80, 82, 84, 86, 82, 78, 76]
  },
  {
    title: "Bitcoin Performance",
    description: "Cryptocurrency markets have shown increased institutional adoption despite regulatory uncertainties. Bitcoin's correlation with risk assets remains high, though its role as an inflation hedge continues to be debated.",
    data: [42000, 44000, 46000, 48000, 47000, 45000, 46000, 48000, 50000, 52000, 54000, 56000]
  },
  {
    title: "REITs Index",
    description: "Real estate investment trusts have underperformed broader equity markets due to interest rate sensitivity. Industrial and data center REITs have shown relative strength, while office and retail segments continue to face challenges.",
    data: [1850, 1800, 1780, 1820, 1850, 1870, 1840, 1860, 1890, 1910, 1900, 1920]
  }
];

// Row 4: Economic Indicators
const economicIndicators = [
  {
    title: "US Inflation (CPI YoY%)",
    description: "Inflation readings have moderated from peak levels but remain above central bank targets. Core services inflation has proven persistent, while goods inflation has normalized. Wage growth continues to be closely monitored.",
    data: [4.2, 4.0, 3.8, 3.7, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8]
  },
  {
    title: "Global PMI Manufacturing",
    description: "Manufacturing activity has shown signs of stabilization after a period of contraction. Regional differences remain significant, with North America outperforming Europe, while Asia shows mixed signals.",
    data: [49.2, 49.5, 49.8, 50.2, 50.5, 50.8, 51.0, 51.2, 51.0, 50.8, 50.6, 50.4]
  },
  {
    title: "US Consumer Confidence",
    description: "Consumer sentiment has improved despite higher interest rates and persistent inflation. Labor market strength continues to support household spending, though higher-income segments show greater resilience than lower-income groups.",
    data: [102, 103, 105, 104, 106, 108, 110, 112, 113, 114, 112, 110]
  },
  {
    title: "Global Economic Surprise Index",
    description: "Economic data has generally outperformed economists' expectations in recent months, with particular strength in labor markets and consumer spending. Regional divergences have increased, with emerging markets showing greater volatility.",
    data: [-5, -2, 0, 3, 5, 8, 10, 12, 8, 5, 2, 0]
  }
];

// Row 5: Market Metrics
const marketMetrics = [
  {
    title: "VIX Volatility Index",
    description: "Market volatility has remained subdued despite various macro uncertainties, suggesting complacency among investors. Historical patterns indicate current levels may not be sustainable for extended periods.",
    data: [18, 20, 22, 19, 17, 16, 15, 17, 18, 20, 22, 19]
  },
  {
    title: "US Dollar Index",
    description: "The US dollar has maintained its strength against major currencies, supported by interest rate differentials and safe-haven flows. This strength continues to impact global trade and emerging market assets.",
    data: [105, 104, 103, 104, 105, 106, 107, 108, 107, 106, 105, 104]
  },
  {
    title: "Corporate Earnings Growth (%)",
    description: "Earnings growth has exceeded analysts' expectations, particularly in technology and energy sectors. Margin pressures from higher input costs and wages have been offset by pricing power in many industries.",
    data: [8, 9, 10, 11, 12, 11, 10, 9, 8, 10, 12, 14]
  },
  {
    title: "Global Liquidity Indicators",
    description: "Central bank balance sheet contraction has led to tighter financial conditions globally. Market functioning remains orderly despite reduced liquidity, though stress indicators in funding markets require monitoring.",
    data: [100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78]
  }
];

const categoryColors = {
  "Monetary Policy": "bg-blue-100 text-blue-800",
  "Commodities": "bg-amber-100 text-amber-800",
  "Alternative Data": "bg-purple-100 text-purple-800",
  "Fixed Income": "bg-green-100 text-green-800",
  "Equities": "bg-red-100 text-red-800",
  "Currencies": "bg-cyan-100 text-cyan-800"
};

const MarketsInsight = () => {

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Markets Insight</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Comprehensive analysis of financial markets, identifying key trends, risks, and opportunities across asset classes.
          </p>
        </motion.div>
        
        {/* Market Charts Grid - 4 columns x 5 rows = 20 charts total */}
        <div className="mb-12">
          {/* Row 1 Title: Major Equity Indices */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Major Equity Indices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equityIndices.map((chart, index) => (
                <div key={`equity-${index}`} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <h4 className="font-bold text-lg mb-3">{chart.title}</h4>
                  <div className="h-80 mb-4">
                    <FinancialChart 
                      chartData={chart.data}
                      labels={monthlyLabels}
                      title=""
                      height={320}
                    />
                  </div>
                  <p className="text-sm text-primary/70 mt-4">
                    {chart.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 2 Title: Fixed Income Markets */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Fixed Income Markets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fixedIncomeMarkets.map((chart, index) => (
                <div key={`fixed-${index}`} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <h4 className="font-bold text-lg mb-3">{chart.title}</h4>
                  <div className="h-80 mb-4">
                    <FinancialChart 
                      chartData={chart.data}
                      labels={monthlyLabels}
                      title=""
                      height={320}
                    />
                  </div>
                  <p className="text-sm text-primary/70 mt-4">
                    {chart.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 3 Title: Commodities and Alternative Assets */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Commodities and Alternative Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commoditiesAndAlternatives.map((chart, index) => (
                <div key={`commodity-${index}`} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <h4 className="font-bold text-lg mb-3">{chart.title}</h4>
                  <div className="h-80 mb-4">
                    <FinancialChart 
                      chartData={chart.data}
                      labels={monthlyLabels}
                      title=""
                      height={320}
                    />
                  </div>
                  <p className="text-sm text-primary/70 mt-4">
                    {chart.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 4 Title: Economic Indicators */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Economic Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {economicIndicators.map((chart, index) => (
                <div key={`economic-${index}`} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <h4 className="font-bold text-lg mb-3">{chart.title}</h4>
                  <div className="h-80 mb-4">
                    <FinancialChart 
                      chartData={chart.data}
                      labels={monthlyLabels}
                      title=""
                      height={320}
                    />
                  </div>
                  <p className="text-sm text-primary/70 mt-4">
                    {chart.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 5 Title: Market Metrics */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Market Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {marketMetrics.map((chart, index) => (
                <div key={`metric-${index}`} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <h4 className="font-bold text-lg mb-3">{chart.title}</h4>
                  <div className="h-60 mb-4">
                    <FinancialChart 
                      chartData={chart.data}
                      labels={monthlyLabels}
                      title=""
                      height={240}
                    />
                  </div>
                  <p className="text-sm text-primary/70 mt-4">
                    {chart.description}
                  </p>
                </div>
              ))}
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