import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, ExternalLink } from "lucide-react";
import { AINews } from "@/lib/openai-service";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const NewsTicker = () => {
  const [news, setNews] = useState<AINews[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNews, setActiveNews] = useState<AINews | null>(null);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

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
          description: "Failed to load news. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchAINews();
  }, [toast]);

  // Auto scroll news
  useEffect(() => {
    if (news.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [news]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handleNewsClick = (newsItem: AINews) => {
    setActiveNews(newsItem);
  };

  const closeNewsModal = () => {
    setActiveNews(null);
  };

  // Formatting function
  const formatTime = (time: string) => {
    return time;
  };

  if (isLoading || news.length === 0) {
    return (
      <div className="w-full bg-primary text-white py-3 overflow-hidden">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-8"></div>
          <div className="h-6 bg-white/20 animate-pulse rounded w-2/3"></div>
          <div className="w-8"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-primary text-white py-3 overflow-hidden">
        <div className="container mx-auto flex items-center justify-between">
          <button 
            onClick={handlePrev} 
            className="p-1 rounded-full text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Previous news"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex-1 mx-4 overflow-hidden cursor-pointer" onClick={() => handleNewsClick(news[currentIndex])}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={isMobile ? { x: 100, opacity: 0 } : { y: 20, opacity: 0 }}
                animate={isMobile ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
                exit={isMobile ? { x: -100, opacity: 0 } : { y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap overflow-hidden text-ellipsis text-center"
                style={{ fontSize: isMobile ? '0.875rem' : 'inherit' }}
              >
                <span className="text-white/70 text-xs mr-2">
                  {t('newsAI.updated')} {news[currentIndex].date}
                </span>
                <span className="font-medium mr-2 text-white">
                  {news[currentIndex].category}:
                </span>
                {news[currentIndex].title}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <button 
            onClick={handleNext} 
            className="p-1 rounded-full text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Next news"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* News Detail Modal */}
      {activeNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeNewsModal}>
          <div 
            className="bg-white rounded-none max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-none bg-blue-100 text-blue-800">
                  {activeNews.category}
                </span>
                <span className="text-xs text-primary/50 ml-2">{activeNews.date}</span>
              </div>
              <button 
                onClick={closeNewsModal}
                className="text-primary/60 hover:text-primary"
              >
                ✕
              </button>
            </div>
            <h3 className="text-xl font-bold mb-4">{activeNews.title}</h3>
            <p className="text-primary/70 mb-6">{activeNews.summary}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsTicker;