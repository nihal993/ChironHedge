import { log } from './vite';

export interface FinancialNews {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  url?: string;
  imageUrl?: string;
  publishedAt?: string;
}

// Multi-source news aggregator
export class FinancialNewsService {
  private readonly NEWS_API_KEY = process.env.NEWS_API_KEY;
  private readonly ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  private readonly POLYGON_API_KEY = process.env.POLYGON_API_KEY;
  private readonly FMP_API_KEY = process.env.FMP_API_KEY; // Financial Modeling Prep
  
  // Smart cache system
  private newsCache: {
    data: FinancialNews[];
    timestamp: number;
    source: string;
  } | null = null;
  
  private readonly CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  private readonly MAX_DAILY_REQUESTS = 20; // Leave 5 requests as buffer
  private dailyRequestCount = 0;
  private lastResetDate = new Date().getDate();

  constructor() {
    this.checkApiKeys();
    this.resetDailyCounterIfNeeded();
  }

  private resetDailyCounterIfNeeded() {
    const currentDate = new Date().getDate();
    if (currentDate !== this.lastResetDate) {
      this.dailyRequestCount = 0;
      this.lastResetDate = currentDate;
      log(`Daily request counter reset. Date: ${currentDate}`);
    }
  }

  private isCacheValid(): boolean {
    if (!this.newsCache) return false;
    const now = Date.now();
    const cacheAge = now - this.newsCache.timestamp;
    return cacheAge < this.CACHE_DURATION;
  }

  private canMakeAPIRequest(): boolean {
    return this.dailyRequestCount < this.MAX_DAILY_REQUESTS;
  }

  private updateCache(data: FinancialNews[], source: string) {
    this.newsCache = {
      data,
      timestamp: Date.now(),
      source
    };
    log(`News cache updated with ${data.length} articles from ${source}`);
  }

  private checkApiKeys() {
    const apiKeys = {
      NEWS_API_KEY: this.NEWS_API_KEY,
      ALPHA_VANTAGE_API_KEY: this.ALPHA_VANTAGE_API_KEY,
      POLYGON_API_KEY: this.POLYGON_API_KEY,
      FMP_API_KEY: this.FMP_API_KEY
    };

    const availableKeys = Object.entries(apiKeys).filter(([, value]) => value).map(([key]) => key);
    const missingKeys = Object.entries(apiKeys).filter(([, value]) => !value).map(([key]) => key);

    if (availableKeys.length > 0) {
      log(`News service initialized with: ${availableKeys.join(', ')}`);
    }
    if (missingKeys.length > 0) {
      log(`Missing API keys: ${missingKeys.join(', ')}`);
    }
  }

  async getFinancialNews(): Promise<FinancialNews[]> {
    this.resetDailyCounterIfNeeded();
    
    // Check if we have valid cached data
    if (this.isCacheValid()) {
      log(`Returning cached news from ${this.newsCache!.source} (${this.newsCache!.data.length} articles)`);
      return this.newsCache!.data;
    }
    
    // Check if we can make API requests
    if (!this.canMakeAPIRequest()) {
      log(`Daily request limit reached (${this.dailyRequestCount}/${this.MAX_DAILY_REQUESTS}). Using fallback data.`);
      const fallbackData = this.getMockData();
      this.updateCache(fallbackData, 'Fallback');
      return fallbackData;
    }

    const sources = [
      { fn: () => this.getNewsFromAlphaVantage(), name: 'Alpha Vantage', hasKey: !!this.ALPHA_VANTAGE_API_KEY },
      { fn: () => this.getNewsFromNewsAPI(), name: 'NewsAPI', hasKey: !!this.NEWS_API_KEY },
      { fn: () => this.getNewsFromPolygon(), name: 'Polygon', hasKey: !!this.POLYGON_API_KEY },
      { fn: () => this.getNewsFromFMP(), name: 'FMP', hasKey: !!this.FMP_API_KEY }
    ];

    let allNews: FinancialNews[] = [];
    let successfulSource = '';
    
    for (const source of sources) {
      if (!source.hasKey || !this.canMakeAPIRequest()) continue;
      
      try {
        this.dailyRequestCount++;
        log(`Making API request ${this.dailyRequestCount}/${this.MAX_DAILY_REQUESTS} to ${source.name}`);
        
        const news = await source.fn();
        if (news.length > 0) {
          allNews.push(...news);
          successfulSource = source.name;
          log(`${source.name} returned ${news.length} articles`);
          
          if (allNews.length >= 10) break; // We have enough news
        }
      } catch (error) {
        log(`${source.name} failed: ${error}`);
      }
    }

    if (allNews.length === 0) {
      log('All news sources failed, using fallback data');
      const fallbackData = this.getMockData();
      this.updateCache(fallbackData, 'Fallback');
      return fallbackData;
    }

    // Sort by date and return top 20 most recent
    const sortedNews = allNews.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.date);
      const dateB = new Date(b.publishedAt || b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    const finalNews = this.removeDuplicatesAndSort(sortedNews.slice(0, 20));
    this.updateCache(finalNews, successfulSource || 'Mixed Sources');
    return finalNews;
  }

  private async getNewsFromNewsAPI(): Promise<FinancialNews[]> {
    const url = `https://newsapi.org/v2/everything?q=finance OR economy OR stocks OR markets&language=en&sortBy=publishedAt&pageSize=20&apiKey=${this.NEWS_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();
    return data.articles?.map((article: any, index: number) => ({
      id: `newsapi-${index}`,
      title: article.title,
      summary: article.description || article.content?.substring(0, 200) + "...",
      date: this.formatTime(new Date(article.publishedAt)),
      source: article.source.name,
      category: "Market News",
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt
    })) || [];
  }

  private async getNewsFromAlphaVantage(): Promise<FinancialNews[]> {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${this.ALPHA_VANTAGE_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Alpha Vantage error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.Information) {
      throw new Error(`Alpha Vantage API limit: ${data.Information}`);
    }
    
    if (!data.feed || !Array.isArray(data.feed)) {
      return [];
    }
    
    return data.feed.slice(0, 10).map((item: any, index: number) => {
      // Parse Alpha Vantage date format (YYYYMMDDTHHMMSS)
      const dateStr = item.time_published;
      let parsedDate = new Date();
      
      if (dateStr && dateStr.length >= 8) {
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1; // Month is 0-indexed
        const day = parseInt(dateStr.substring(6, 8));
        const hour = dateStr.length >= 10 ? parseInt(dateStr.substring(9, 11)) : 0;
        const minute = dateStr.length >= 12 ? parseInt(dateStr.substring(11, 13)) : 0;
        
        parsedDate = new Date(year, month, day, hour, minute);
      }
      
      return {
        id: `av-${index}`,
        title: item.title,
        summary: item.summary?.substring(0, 200) + "...",
        date: this.formatTime(parsedDate),
        source: item.source,
        category: "Financial Markets",
        url: item.url,
        publishedAt: parsedDate.toISOString()
      };
    }) || [];
  }

  private async getNewsFromPolygon(): Promise<FinancialNews[]> {
    const url = `https://api.polygon.io/v2/reference/news?limit=20&apikey=${this.POLYGON_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Polygon error: ${response.status}`);
    }

    const data = await response.json();
    return data.results?.map((item: any, index: number) => ({
      id: `polygon-${index}`,
      title: item.title,
      summary: item.description?.substring(0, 200) + "...",
      date: this.formatTime(new Date(item.published_utc)),
      source: item.publisher?.name || "Polygon",
      category: "Markets",
      url: item.article_url,
      imageUrl: item.image_url,
      publishedAt: item.published_utc
    })) || [];
  }

  private async getNewsFromFMP(): Promise<FinancialNews[]> {
    const url = `https://financialmodelingprep.com/api/v3/stock_news?limit=20&apikey=${this.FMP_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`FMP error: ${response.status}`);
    }

    const data = await response.json();
    return data?.map((item: any, index: number) => ({
      id: `fmp-${index}`,
      title: item.title,
      summary: item.text?.substring(0, 200) + "...",
      date: this.formatTime(new Date(item.publishedDate)),
      source: item.site,
      category: "Stock News",
      url: item.url,
      imageUrl: item.image,
      publishedAt: item.publishedDate
    })) || [];
  }

  private removeDuplicatesAndSort(news: FinancialNews[]): FinancialNews[] {
    log(`Starting deduplication with ${news.length} articles`);
    
    // Remove duplicates based on title similarity
    const unique: FinancialNews[] = [];
    
    for (const item of news) {
      const isDuplicate = unique.some(existing => 
        this.calculateSimilarity(item.title, existing.title) > 0.8
      );
      
      if (!isDuplicate) {
        unique.push(item);
      } else {
        log(`Removing duplicate: "${item.title}"`);
      }
    }

    log(`After deduplication: ${unique.length} unique articles`);

    // Sort by published date (most recent first)
    return unique.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.date);
      const dateB = new Date(b.publishedAt || b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const intersection = words1.filter(word => words2.includes(word));
    return intersection.length / Math.max(words1.length, words2.length);
  }

  private formatTime(date: Date): string {
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      // Show time if within 24 hours
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else {
      // Show date if older than 24 hours
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  }

  private formatDateTime(date: Date): string {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  private getMockData(): FinancialNews[] {
    const now = new Date();
    return [
      {
        id: "fallback-1",
        title: "Global Markets Show Mixed Performance Amid Economic Uncertainty",
        summary: "Major indices displayed varied performance as investors weigh inflation concerns against positive earnings reports from leading technology companies.",
        date: this.formatTime(new Date(now.getTime() - 2 * 60 * 60 * 1000)), // 2 hours ago
        source: "Financial Times",
        category: "Markets",
        publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "fallback-2", 
        title: "Federal Reserve Signals Cautious Approach to Interest Rate Policy",
        summary: "Recent statements from Fed officials suggest a measured stance on monetary policy as economic indicators present conflicting signals about growth trajectory.",
        date: this.formatTime(new Date(now.getTime() - 4 * 60 * 60 * 1000)), // 4 hours ago
        source: "Reuters",
        category: "Central Banking",
        publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "fallback-3",
        title: "Energy Sector Gains Momentum as Oil Prices Stabilize Above Key Levels",
        summary: "Crude oil futures maintain stability above $75 per barrel, supporting energy equity valuations and investor confidence in the sector's near-term outlook.",
        date: this.formatTime(new Date(now.getTime() - 6 * 60 * 60 * 1000)), // 6 hours ago
        source: "Bloomberg",
        category: "Energy",
        publishedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "fallback-4",
        title: "Technology Earnings Season Reveals Strong AI Infrastructure Demand",
        summary: "Leading cloud computing companies report robust growth in artificial intelligence-related services, driving optimism for continued sector expansion.",
        date: this.formatTime(new Date(now.getTime() - 8 * 60 * 60 * 1000)), // 8 hours ago
        source: "Wall Street Journal",
        category: "Technology",
        publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "fallback-5",
        title: "European Central Bank Maintains Dovish Stance on Monetary Policy",
        summary: "ECB officials emphasize gradual approach to policy normalization as eurozone economic data shows signs of stabilization after recent volatility.",
        date: this.formatTime(new Date(now.getTime() - 10 * 60 * 60 * 1000)), // 10 hours ago
        source: "Financial Times",
        category: "Central Banking",
        publishedAt: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
}

export const newsService = new FinancialNewsService();