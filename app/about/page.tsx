import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ChironHedge\'s mission to provide institutional-grade financial research and quantitative analysis tools',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About ChironHedge</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide institutional-grade financial research and quantitative analysis tools 
            for hedge funds, asset managers, and sophisticated investors worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              ChironHedge was founded with the vision of democratizing access to professional-grade 
              financial research tools. We believe that sophisticated quantitative analysis and 
              market intelligence should be accessible to all serious investors.
            </p>
            <p className="text-lg text-gray-600">
              Our platform combines cutting-edge technology with deep financial expertise to deliver 
              actionable insights that drive investment performance.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">Real-time market data and analysis</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">Advanced quantitative research tools</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">Institutional-grade security and compliance</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">AI-powered financial news analysis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}