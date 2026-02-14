import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, PieChart, Activity } from "lucide-react";

export default function PortfolioTracker() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            {t('navbar.portfolioTracker')}
          </h1>
          <p className="text-gray-600 mb-8">
            Monitor and analyze your investment performance with real-time analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase">Total Value</CardTitle>
                <Briefcase className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245,670.00</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2.5% since last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase">Allocation</CardTitle>
                <PieChart className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Equities Focus</div>
                <p className="text-xs text-gray-500 mt-1">65% Stocks / 35% Bonds</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase">Risk Score</CardTitle>
                <Activity className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Medium-High</div>
                <p className="text-xs text-gray-500 mt-1">Sharpe Ratio: 1.84</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase">Active Strategies</CardTitle>
                <Activity className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 Active</div>
                <p className="text-xs text-gray-500 mt-1">Global Macro, Factor, Arbitrage</p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-12 text-center bg-white">
            <h3 className="text-xl font-semibold mb-4">Interactive Portfolio Analysis Coming Soon</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We are currently integrating our advanced quantitative engine with personal portfolio tracking. 
              Soon you will be able to upload your holdings and see how ChironHedge models would optimize your risk-adjusted returns.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
