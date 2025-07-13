'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, BarChart3 } from 'lucide-react';

export default function LoginClient() {
  const handleLogin = () => {
    // Redirect to Replit Auth
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">ChironHedge</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to access professional financial research tools</p>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 bg-primary text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Shield className="h-5 w-5" />
                Sign in with Replit
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Secure authentication</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/contact" className="text-primary font-semibold hover:underline">
                    Contact us for access
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our terms of service and privacy policy. 
                Your data is protected with enterprise-grade security.
              </p>
            </div>
          </motion.div>

          {/* Right side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional-Grade Financial Research
              </h2>
              <p className="text-lg text-gray-600">
                Access institutional-quality research, real-time market data, and advanced analytics 
                designed for hedge funds and asset managers.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Intelligence</h3>
                  <p className="text-gray-600">
                    Real-time market analysis with AI-powered insights for informed investment decisions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantitative Research</h3>
                  <p className="text-gray-600">
                    Advanced statistical models and backtesting tools for systematic trading strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Institutional Security</h3>
                  <p className="text-gray-600">
                    Bank-grade security and compliance standards to protect your sensitive financial data.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm text-primary font-medium">
                Trusted by leading hedge funds and institutional investors worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}