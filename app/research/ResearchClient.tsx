'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Filter, Download, Calendar, Tag, TrendingUp } from 'lucide-react';

interface ResearchCategory {
  id: string;
  title: string;
  description: string;
  reportsCount: number;
}

export default function ResearchClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: ResearchCategory[] = [
    {
      id: 'equity',
      title: 'Equity Research',
      description: 'In-depth analysis of stocks and equity markets',
      reportsCount: 45
    },
    {
      id: 'fixed-income',
      title: 'Fixed Income',
      description: 'Bond markets and credit analysis',
      reportsCount: 32
    },
    {
      id: 'macro',
      title: 'Macro Economics',
      description: 'Global economic trends and central bank policies',
      reportsCount: 28
    },
    {
      id: 'alternative',
      title: 'Alternative Assets',
      description: 'Commodities, real estate, and alternative investments',
      reportsCount: 19
    },
    {
      id: 'quantitative',
      title: 'Quantitative Analysis',
      description: 'Mathematical models and statistical analysis',
      reportsCount: 37
    },
    {
      id: 'esg',
      title: 'ESG Research',
      description: 'Environmental, social, and governance analysis',
      reportsCount: 24
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Q4 2024 Market Outlook: Navigating Uncertainty',
      category: 'Macro Economics',
      date: '2024-12-15',
      author: 'Dr. Sarah Chen',
      summary: 'Comprehensive analysis of market conditions heading into 2025, covering inflation trends, monetary policy implications, and sector rotations.',
      tags: ['Market Outlook', 'Inflation', 'Fed Policy']
    },
    {
      id: 2,
      title: 'AI Revolution in Financial Services: Investment Implications',
      category: 'Equity Research',
      date: '2024-12-10',
      author: 'Michael Rodriguez',
      summary: 'Deep dive into the transformative impact of artificial intelligence on financial services and identified investment opportunities.',
      tags: ['AI', 'Technology', 'Fintech']
    },
    {
      id: 3,
      title: 'Credit Spreads Analysis: Emerging Market Debt',
      category: 'Fixed Income',
      date: '2024-12-08',
      author: 'James Liu',
      summary: 'Analysis of emerging market debt instruments, risk assessment, and yield opportunities in current market conditions.',
      tags: ['Credit', 'Emerging Markets', 'Yield']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Center</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Access our comprehensive library of financial research, market analysis, and investment insights 
              designed for institutional investors and hedge funds.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search research reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>
        </motion.div>

        {/* Research Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.reportsCount} reports</span>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reports</h2>
          <div className="space-y-6">
            {recentReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{report.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {report.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{report.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                      <span>By {report.author}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {report.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                    <Link 
                      href={`/research/${report.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Reports
          </button>
        </div>
      </div>
    </div>
  );
}