'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, TrendingUp, BarChart3, Globe, Users, Zap, Shield } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
}

export default function HomeClient() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news-ai');
      if (response.ok) {
        const data = await response.json();
        setNews(data.slice(0, 3)); // Show first 3 news items
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Real-time market analysis with AI-powered insights for informed investment decisions.'
    },
    {
      icon: BarChart3,
      title: 'Quantitative Research',
      description: 'Advanced statistical models and backtesting tools for systematic trading strategies.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Comprehensive coverage of global markets, sectors, and asset classes.'
    },
    {
      icon: Users,
      title: 'Institutional Grade',
      description: 'Professional-grade tools designed for hedge funds and institutional investors.'
    },
    {
      icon: Zap,
      title: 'Real-time Data',
      description: 'Live market data feeds and news aggregation from multiple financial sources.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Advanced risk analytics and portfolio optimization tools.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChironHedge</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/research" className="text-gray-600 hover:text-primary transition-colors">Research</Link>
              <Link href="/markets" className="text-gray-600 hover:text-primary transition-colors">Markets</Link>
              <Link href="/strategies" className="text-gray-600 hover:text-primary transition-colors">Strategies</Link>
              <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
              <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Advanced Financial
              <span className="text-primary block">Research Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering institutional investors with AI-driven market intelligence, 
              quantitative research tools, and real-time financial data analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/research"
                className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                Explore Research
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/markets"
                className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Market Insights
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional-Grade Financial Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for hedge funds, asset managers, and institutional investors who demand 
              the highest quality research and analysis capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Market Intelligence</h2>
            <p className="text-xl text-gray-600">Stay ahead with AI-powered financial news analysis</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-primary font-medium mb-2">{item.source}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                  <div className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/news"
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              View All News
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold">ChironHedge</span>
              </div>
              <p className="text-gray-400">
                Advanced financial research platform for institutional investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Research</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/research" className="hover:text-white transition-colors">Market Analysis</Link></li>
                <li><Link href="/strategies" className="hover:text-white transition-colors">Quantitative Strategies</Link></li>
                <li><Link href="/data-science" className="hover:text-white transition-colors">Data Science</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/markets" className="hover:text-white transition-colors">Market Insights</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">Financial News</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ChironHedge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}