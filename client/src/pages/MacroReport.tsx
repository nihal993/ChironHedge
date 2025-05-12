import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Sample macro data
const gdpData = [
  { quarter: "Q1 2023", us: 2.2, eurozone: 1.1, china: 4.5, japan: 1.6 },
  { quarter: "Q2 2023", us: 2.4, eurozone: 0.8, china: 4.7, japan: 1.2 },
  { quarter: "Q3 2023", us: 2.8, eurozone: 0.5, china: 4.8, japan: 0.8 },
  { quarter: "Q4 2023", us: 2.5, eurozone: 0.3, china: 5.0, japan: 0.9 },
  { quarter: "Q1 2024", us: 2.0, eurozone: 0.2, china: 5.2, japan: 1.0 },
  { quarter: "Q2 2024", us: 1.5, eurozone: 0.1, china: 5.3, japan: 0.7 },
  { quarter: "Q3 2024", us: 1.3, eurozone: 0.0, china: 5.2, japan: 0.5 },
  { quarter: "Q4 2024", us: 1.2, eurozone: -0.1, china: 5.0, japan: 0.4 },
  { quarter: "Q1 2025", us: 1.4, eurozone: 0.2, china: 4.9, japan: 0.6 }
];

const inflationData = [
  { month: "Jan", us: 3.1, eurozone: 2.8, uk: 4.0, japan: 2.0 },
  { month: "Feb", us: 3.2, eurozone: 2.6, uk: 3.8, japan: 1.9 },
  { month: "Mar", us: 3.3, eurozone: 2.4, uk: 3.6, japan: 1.8 },
  { month: "Apr", us: 3.4, eurozone: 2.3, uk: 3.5, japan: 1.7 },
  { month: "May", us: 3.3, eurozone: 2.2, uk: 3.4, japan: 1.8 },
  { month: "Jun", us: 3.2, eurozone: 2.0, uk: 3.2, japan: 1.9 },
  { month: "Jul", us: 3.0, eurozone: 1.9, uk: 3.0, japan: 2.0 },
  { month: "Aug", us: 2.9, eurozone: 1.8, uk: 2.9, japan: 2.1 },
  { month: "Sep", us: 2.8, eurozone: 1.7, uk: 2.8, japan: 2.0 },
  { month: "Oct", us: 2.7, eurozone: 1.6, uk: 2.7, japan: 1.9 },
  { month: "Nov", us: 2.6, eurozone: 1.5, uk: 2.6, japan: 1.8 },
  { month: "Dec", us: 2.5, eurozone: 1.4, uk: 2.5, japan: 1.7 }
];

const unemploymentData = [
  { quarter: "Q1 2024", us: 3.8, eurozone: 6.5, japan: 2.6, uk: 4.2 },
  { quarter: "Q2 2024", us: 3.9, eurozone: 6.6, japan: 2.5, uk: 4.3 },
  { quarter: "Q3 2024", us: 4.0, eurozone: 6.8, japan: 2.4, uk: 4.4 },
  { quarter: "Q4 2024", us: 4.2, eurozone: 7.0, japan: 2.4, uk: 4.5 },
  { quarter: "Q1 2025", us: 4.3, eurozone: 7.1, japan: 2.5, uk: 4.6 }
];

const interestRatesData = [
  { date: "Jan 2024", fed: 5.25, ecb: 4.00, boe: 5.25, boj: 0.10 },
  { date: "Feb 2024", fed: 5.25, ecb: 4.00, boe: 5.25, boj: 0.10 },
  { date: "Mar 2024", fed: 5.25, ecb: 3.75, boe: 5.25, boj: 0.10 },
  { date: "Apr 2024", fed: 5.00, ecb: 3.75, boe: 5.25, boj: 0.10 },
  { date: "May 2024", fed: 5.00, ecb: 3.50, boe: 5.00, boj: 0.10 },
  { date: "Jun 2024", fed: 4.75, ecb: 3.50, boe: 5.00, boj: 0.25 },
  { date: "Jul 2024", fed: 4.75, ecb: 3.25, boe: 4.75, boj: 0.25 },
  { date: "Aug 2024", fed: 4.50, ecb: 3.25, boe: 4.75, boj: 0.25 },
  { date: "Sep 2024", fed: 4.50, ecb: 3.00, boe: 4.50, boj: 0.25 },
  { date: "Oct 2024", fed: 4.25, ecb: 3.00, boe: 4.50, boj: 0.25 },
  { date: "Nov 2024", fed: 4.25, ecb: 2.75, boe: 4.25, boj: 0.25 },
  { date: "Dec 2024", fed: 4.00, ecb: 2.75, boe: 4.25, boj: 0.25 },
  { date: "Jan 2025", fed: 4.00, ecb: 2.50, boe: 4.00, boj: 0.50 },
  { date: "Feb 2025", fed: 3.75, ecb: 2.50, boe: 4.00, boj: 0.50 },
  { date: "Mar 2025", fed: 3.75, ecb: 2.25, boe: 3.75, boj: 0.50 },
  { date: "Apr 2025", fed: 3.50, ecb: 2.25, boe: 3.75, boj: 0.50 },
  { date: "May 2025", fed: 3.50, ecb: 2.00, boe: 3.50, boj: 0.50 }
];

// Sample macro reports
const macroReports = [
  {
    id: "report-1",
    title: "Global Economic Outlook Q2 2025",
    description: "Comprehensive analysis of global economic conditions, with detailed forecasts for growth, inflation, and policy responses across major economies.",
    date: "May 5, 2025",
    type: "Quarterly Outlook",
    featured: true
  },
  {
    id: "report-2",
    title: "Central Bank Policy Divergence: Implications for Markets",
    description: "Analysis of monetary policy divergence among major central banks and the potential impact on currency markets, fixed income, and global asset allocation.",
    date: "April 22, 2025",
    type: "Special Report",
    featured: true
  },
  {
    id: "report-3",
    title: "China's Economic Transition: Updated Scenarios",
    description: "In-depth analysis of China's ongoing economic transition, focusing on consumption trends, debt dynamics, and implications for global markets.",
    date: "April 10, 2025",
    type: "Country Focus",
    featured: true
  },
  {
    id: "report-4",
    title: "Global Trade Patterns: Post-Pandemic Evolution",
    description: "Examination of structural changes in global trade patterns following the pandemic, with implications for supply chains and inflation dynamics.",
    date: "March 28, 2025",
    type: "Thematic Analysis",
    featured: false
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded border border-gray-100">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const MacroReport = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Macro Reports</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            In-depth analysis of global economic trends and policy developments to help institutional investors navigate complex macro environments.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-8">Global Economic Dashboard</h3>
          
          <Tabs defaultValue="growth" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="growth">GDP Growth</TabsTrigger>
              <TabsTrigger value="inflation">Inflation</TabsTrigger>
              <TabsTrigger value="unemployment">Unemployment</TabsTrigger>
              <TabsTrigger value="rates">Policy Rates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="growth" className="pt-4">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <h4 className="text-xl font-bold mb-2">Quarterly GDP Growth (YoY %)</h4>
                <p className="text-primary/70 mb-6">
                  Year-over-year GDP growth across major economies, showing divergent recovery patterns and growth outlooks.
                </p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={gdpData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="us" 
                        name="United States" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="eurozone" 
                        name="Eurozone" 
                        stroke="#2A2A2A" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="china" 
                        name="China" 
                        stroke="#d32f2f" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="japan" 
                        name="Japan" 
                        stroke="#0277bd" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 bg-white p-5 rounded-lg">
                  <h5 className="font-bold mb-3">Key Insights - GDP Growth</h5>
                  <ul className="space-y-2 text-sm text-primary/70">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>US growth is moderating but remains resilient, supported by strong labor markets and consumer spending.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary mt-1.5 mr-2 rounded-full"></span>
                      <span>Eurozone experiencing more pronounced slowdown due to energy price impacts and tighter financial conditions.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-600 mt-1.5 mr-2 rounded-full"></span>
                      <span>China's growth has stabilized near 5%, reflecting targeted stimulus and shift toward consumption-led growth.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 mt-1.5 mr-2 rounded-full"></span>
                      <span>Japan maintains moderate growth trajectory as accommodative policy partially offsets global headwinds.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="inflation" className="pt-4">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <h4 className="text-xl font-bold mb-2">Inflation Rate (YoY %)</h4>
                <p className="text-primary/70 mb-6">
                  Year-over-year inflation rates across major economies, showing the evolution of price pressures and policy effectiveness.
                </p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={inflationData}
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
                        dataKey="us" 
                        name="United States" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="eurozone" 
                        name="Eurozone" 
                        stroke="#2A2A2A" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="uk" 
                        name="United Kingdom" 
                        stroke="#7b1fa2" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="japan" 
                        name="Japan" 
                        stroke="#0277bd" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 bg-white p-5 rounded-lg">
                  <h5 className="font-bold mb-3">Key Insights - Inflation</h5>
                  <ul className="space-y-2 text-sm text-primary/70">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>US inflation remains above target but is gradually declining as tighter monetary policy restrains demand.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary mt-1.5 mr-2 rounded-full"></span>
                      <span>Eurozone inflation showing more rapid moderation amid weakening demand and energy price normalization.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-700 mt-1.5 mr-2 rounded-full"></span>
                      <span>UK inflation persistence reflects tight labor markets and structural supply constraints.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 mt-1.5 mr-2 rounded-full"></span>
                      <span>Japan experiencing modest price pressures after decades of deflation, prompting gradual policy normalization.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="unemployment" className="pt-4">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <h4 className="text-xl font-bold mb-2">Unemployment Rate (%)</h4>
                <p className="text-primary/70 mb-6">
                  Quarterly unemployment rates across major economies, highlighting labor market conditions and structural differences.
                </p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={unemploymentData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="us" name="United States" fill="#D4AF37" />
                      <Bar dataKey="eurozone" name="Eurozone" fill="#2A2A2A" />
                      <Bar dataKey="japan" name="Japan" fill="#0277bd" />
                      <Bar dataKey="uk" name="United Kingdom" fill="#7b1fa2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 bg-white p-5 rounded-lg">
                  <h5 className="font-bold mb-3">Key Insights - Labor Markets</h5>
                  <ul className="space-y-2 text-sm text-primary/70">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>US unemployment gradually rising from historic lows as monetary tightening impacts demand.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary mt-1.5 mr-2 rounded-full"></span>
                      <span>Eurozone labor markets showing resilience despite economic slowdown, partly due to structural reforms.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 mt-1.5 mr-2 rounded-full"></span>
                      <span>Japan maintaining exceptionally low unemployment due to demographic factors and labor market practices.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-700 mt-1.5 mr-2 rounded-full"></span>
                      <span>UK labor force participation challenges persist, contributing to wage pressures despite slowing growth.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rates" className="pt-4">
              <div className="bg-neutral p-6 rounded-xl shadow-sm">
                <h4 className="text-xl font-bold mb-2">Central Bank Policy Rates (%)</h4>
                <p className="text-primary/70 mb-6">
                  Evolution of policy rates across major central banks, showing the pace of tightening and potential pivot toward easing.
                </p>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={interestRatesData}
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
                        dataKey="fed" 
                        name="Federal Reserve" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ecb" 
                        name="European Central Bank" 
                        stroke="#2A2A2A" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="boe" 
                        name="Bank of England" 
                        stroke="#7b1fa2" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="boj" 
                        name="Bank of Japan" 
                        stroke="#0277bd" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 bg-white p-5 rounded-lg">
                  <h5 className="font-bold mb-3">Key Insights - Monetary Policy</h5>
                  <ul className="space-y-2 text-sm text-primary/70">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary mt-1.5 mr-2 rounded-full"></span>
                      <span>Federal Reserve has begun its easing cycle with measured rate cuts as inflation moderates while maintaining vigilance.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary mt-1.5 mr-2 rounded-full"></span>
                      <span>ECB following with more aggressive cuts as growth concerns mount and inflation returns to target more rapidly.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-700 mt-1.5 mr-2 rounded-full"></span>
                      <span>Bank of England maintaining a more cautious stance due to persistent inflation and tight labor markets.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 mt-1.5 mr-2 rounded-full"></span>
                      <span>Bank of Japan has begun modest tightening after decades of ultra-accommodative policy as inflation becomes sustainable.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8">Latest Macro Reports</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macroReports.filter(report => report.featured).map((report) => (
              <div 
                key={report.id}
                className="bg-neutral p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block text-xs font-medium bg-white px-3 py-1 rounded-full">
                    {report.type}
                  </span>
                  <span className="text-xs text-primary/50">{report.date}</span>
                </div>
                <h4 className="font-bold mb-3">{report.title}</h4>
                <p className="text-primary/70 text-sm mb-4">
                  {report.description.length > 120 
                    ? `${report.description.substring(0, 120)}...` 
                    : report.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                      Premium Report
                    </span>
                    <Link href={`/macro-report/${report.id}`} className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read Report <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/all-reports" className="inline-flex items-center px-6 py-3 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors">
              View All Macro Reports
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
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
            <h4 className="text-xl font-bold mb-4">Key Macro Themes</h4>
            <div className="space-y-4">
              <div className="bg-neutral p-4 rounded-lg">
                <h5 className="font-bold text-secondary mb-2">Developed Market Slowdown</h5>
                <p className="text-primary/70 text-sm">
                  Major developed economies are facing coordinated slowdown as the lagged effects of monetary tightening impact growth, with particular vulnerabilities in consumption and housing sectors.
                </p>
              </div>
              <div className="bg-neutral p-4 rounded-lg">
                <h5 className="font-bold text-secondary mb-2">Emerging Market Resilience</h5>
                <p className="text-primary/70 text-sm">
                  Select emerging markets demonstrating resilience amid global headwinds, benefiting from improved policy frameworks, reduced external vulnerabilities, and less aggressive rate hike cycles.
                </p>
              </div>
              <div className="bg-neutral p-4 rounded-lg">
                <h5 className="font-bold text-secondary mb-2">Inflation Normalization</h5>
                <p className="text-primary/70 text-sm">
                  Inflation continuing its gradual normalization toward target levels, though sticky service inflation and potential supply shocks present ongoing risks to the disinflation narrative.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-neutral">
            <h4 className="text-xl font-bold mb-4">Regional Outlook</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-3 flex items-center justify-center w-10 h-10 flex-shrink-0">
                  <span className="font-bold text-secondary">US</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">United States</h5>
                  <p className="text-primary/70 text-sm">
                    Moderating growth with resilient labor markets. Inflation gradually returning to target, allowing gradual monetary easing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-3 flex items-center justify-center w-10 h-10 flex-shrink-0">
                  <span className="font-bold text-secondary">EU</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Eurozone</h5>
                  <p className="text-primary/70 text-sm">
                    More pronounced economic weakness with significant divergence between core and periphery. Faster disinflation enabling more aggressive ECB easing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-3 flex items-center justify-center w-10 h-10 flex-shrink-0">
                  <span className="font-bold text-secondary">CN</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">China</h5>
                  <p className="text-primary/70 text-sm">
                    Economic stabilization amid targeted stimulus and ongoing transition from property-led growth. Demographic challenges and geopolitical tensions remain headwinds.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-3 flex items-center justify-center w-10 h-10 flex-shrink-0">
                  <span className="font-bold text-secondary">EM</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Emerging Markets</h5>
                  <p className="text-primary/70 text-sm">
                    Heterogeneous outlook with differentiation based on commodity exposure, external balances, and policy credibility. Earlier easing cycles supporting growth in select markets.
                  </p>
                </div>
              </div>
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
              <h3 className="text-2xl font-bold mb-4">Macro Strategy Webinars</h3>
              <p className="mb-6 text-neutral-300">
                Join our expert economists and strategists for live discussion of key macro trends and investment implications.
              </p>
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-secondary pl-4">
                  <h5 className="font-bold text-white">Global Economic Outlook: Q2 2025</h5>
                  <p className="text-sm text-neutral-200 mb-1">May 20, 2025 • 10:00 AM EST</p>
                  <p className="text-xs text-neutral-300">With Chief Economist Dr. Alessandro Rossi</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h5 className="font-bold text-white">Monetary Policy Divergence: Market Implications</h5>
                  <p className="text-sm text-neutral-200 mb-1">June 4, 2025 • 11:00 AM EST</p>
                  <p className="text-xs text-neutral-300">With Global Macro Strategy Team</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <Link href="/webinars" className="block w-full py-3 px-6 gold-gradient text-primary font-medium rounded-md text-center hover:brightness-105 transition-all mb-3">
                Register for Upcoming Webinars
              </Link>
              <Link href="/macro-archive" className="block w-full py-3 px-6 bg-transparent border border-secondary text-secondary font-medium rounded-md text-center hover:bg-secondary/10 transition-colors">
                Access Webinar Archive
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MacroReport;