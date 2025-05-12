import { Link } from "wouter";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="py-12">
        <div className="w-full">
          <motion.div
            className=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full relative overflow-hidden bg-primary h-[500px] mb-12">
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
                    <Link href="/our-research" className="px-8 py-3 blue-gradient hover:brightness-105 font-medium text-white transition-all text-center inline-flex items-center justify-center">
                      Explore our research
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Insights */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Featured Insights</h2>
                <Link href="/markets-insight" className="text-secondary hover:text-secondary/80 font-medium flex items-center text-sm">
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured Insight 1 */}
                <div className="border border-gray-200 hover:border-secondary transition-colors">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs text-secondary font-medium">Market Analysis</span>
                      <span className="text-xs text-primary/50">May 12, 2025</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">Federal Reserve Policy Impact on Global Markets</h3>
                    <p className="text-primary/70 text-sm mb-4">
                      An analysis of the recent Federal Reserve policy decisions and their potential implications for global financial markets.
                    </p>
                    <Link href="/markets-insight/fed-policy" className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                {/* Featured Insight 2 */}
                <div className="border border-gray-200 hover:border-secondary transition-colors">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs text-secondary font-medium">Quantitative Model</span>
                      <span className="text-xs text-primary/50">May 10, 2025</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">Multi-Factor Equity Model Performance Update</h3>
                    <p className="text-primary/70 text-sm mb-4">
                      Latest performance metrics from our proprietary multi-factor equity model, with factor attribution analysis.
                    </p>
                    <Link href="/quantitative-model/equity" className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                {/* Featured Insight 3 */}
                <div className="border border-gray-200 hover:border-secondary transition-colors">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs text-secondary font-medium">Macro Report</span>
                      <span className="text-xs text-primary/50">May 8, 2025</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">Global Economic Growth Projections Q2 2025</h3>
                    <p className="text-primary/70 text-sm mb-4">
                      Comprehensive analysis of economic growth trends across major economies with detailed forecasts for Q2 2025.
                    </p>
                    <Link href="/macro-report/growth-q2-2025" className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center">
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Our Services</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI News Service */}
                <div className="bg-secondary text-white p-6">
                  <h3 className="text-xl font-bold mb-3">AI-Powered Financial News</h3>
                  <p className="text-white/80 mb-4">
                    Real-time financial news analysis with AI-generated insights and sentiment analysis to help you stay ahead of market developments.
                  </p>
                  <Link href="/news-ai" className="inline-flex items-center text-white hover:text-white/80 font-medium">
                    Explore News AI <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                
                {/* Quantitative Models */}
                <div className="bg-primary text-white p-6">
                  <h3 className="text-xl font-bold mb-3">Quantitative Models</h3>
                  <p className="text-white/80 mb-4">
                    Sophisticated quantitative models combining advanced mathematics, machine learning, and financial expertise.
                  </p>
                  <Link href="/quantitative-model" className="inline-flex items-center text-white hover:text-white/80 font-medium">
                    Explore Models <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                
                {/* Research */}
                <div className="bg-primary text-white p-6">
                  <h3 className="text-xl font-bold mb-3">Financial Research</h3>
                  <p className="text-white/80 mb-4">
                    Cutting-edge research combining rigorous academic methodologies with practical applications for institutional investors.
                  </p>
                  <Link href="/our-research" className="inline-flex items-center text-white hover:text-white/80 font-medium">
                    Explore Research <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                
                {/* Quantitative Strategies */}
                <div className="bg-secondary text-white p-6">
                  <h3 className="text-xl font-bold mb-3">Quantitative Strategies</h3>
                  <p className="text-white/80 mb-4">
                    Proprietary systematic investment approaches to generate alpha across different market conditions.
                  </p>
                  <Link href="/quantitative-strategies" className="inline-flex items-center text-white hover:text-white/80 font-medium">
                    Explore Strategies <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="border border-gray-200 p-6 mb-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to elevate your investment strategies?
                </h2>
                <p className="text-primary/70 mb-6">
                  Discover how our advanced quantitative research can support your investment decisions.
                </p>
                <Link href="/contact" className="inline-flex items-center px-8 py-3 blue-gradient hover:brightness-105 font-medium text-white transition-all">
                  Request a consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
