import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AINews } from "@/lib/openai-service";

// Sentiment color mapping
const sentimentColors = {
  positive: "bg-green-100 text-green-800",
  neutral: "bg-blue-100 text-blue-800",
  negative: "bg-red-100 text-red-800"
};

const NewsAI = () => {
  const [news, setNews] = useState<AINews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch AI-generated news from our API
  useEffect(() => {
    const fetchAINews = async () => {
      setIsLoading(true);
      try {
        // Call the API we implemented
        const response = await apiRequest<AINews[]>("GET", "/api/news-ai");
        setNews(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching AI news:", error);
        toast({
          title: "Error",
          description: "Failed to load AI-generated news. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchAINews();
  }, [toast]);

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">AI-Powered Financial News</h2>
          <p className="text-primary/70 max-w-3xl mx-auto">
            Stay ahead of market developments with our AI-curated financial news, offering data-driven analysis of global economic trends and market indicators.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral p-6 rounded-xl animate-pulse">
                <div className="h-7 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="flex justify-between mt-6">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <motion.div 
                key={item.id}
                className="bg-neutral p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block text-xs font-medium bg-white px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-primary/50">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-primary/70 mb-4">
                  {item.summary}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <span className="text-sm text-primary/60 mr-3">Source: {item.source}</span>
                    {item.sentiment && (
                      <span className={`text-xs px-2 py-1 rounded-full ${sentimentColors[item.sentiment] || 'bg-gray-100 text-gray-800'}`}>
                        {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                        {item.confidence && ` (${Math.round(item.confidence * 100)}%)`}
                      </span>
                    )}
                  </div>
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium">
                    Read Full Analysis
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div 
          className="mt-16 p-8 bg-primary text-white rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">AI News Analysis Technology</h3>
              <p className="text-neutral-200 mb-6">
                Our proprietary AI system continuously analyzes thousands of financial news sources, academic journals, and market data points to identify significant trends and provide actionable insights.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-neutral-200">Real-time sentiment analysis of market-moving news</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-neutral-200">Advanced NLP to detect subtle market indicators</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-neutral-200">Cross-reference with historical data for context</span>
                </div>
              </div>
            </div>
            <div>
              <button className="w-full py-3 px-6 gold-gradient text-primary font-medium rounded-md hover:brightness-105 transition-all mb-3">
                Subscribe to AI Insights
              </button>
              <button className="w-full py-3 px-6 bg-transparent border border-secondary text-secondary font-medium rounded-md hover:bg-secondary/10 transition-colors">
                Learn About Our Technology
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsAI;