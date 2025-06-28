
import axios from 'axios';

interface NewsAPIResponse {
  articles: Array<{
    title: string;
    description: string;
    publishedAt: string;
    source: {
      name: string;
    };
    url: string;
  }>;
}

interface AlphaVantageNewsResponse {
  feed: Array<{
    title: string;
    summary: string;
    time_published: string;
    source: string;
    url: string;
    topics: Array<{
      topic: string;
    }>;
  }>;
}

export class RealNewsService {
  private newsApiKey = process.env.NEWS_API_KEY;
  private alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY;

  async getFinancialNewsFromNewsAPI() {
    if (!this.newsApiKey) {
      console.log('NEWS_API_KEY not found, using mock data');
      return null;
    }

    try {
      const response = await axios.get<NewsAPIResponse>(
        `https://newsapi.org/v2/everything?q=financial%20OR%20stock%20market%20OR%20economy%20OR%20trading&sortBy=publishedAt&language=en&pageSize=10`,
        {
          headers: {
            'X-API-Key': this.newsApiKey
          }
        }
      );

      return response.data.articles.map((article, index) => ({
        id: `news-api-${index}`,
        title: article.title,
        summary: article.description || article.title,
        date: new Date(article.publishedAt).toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        source: article.source.name,
        category: this.categorizeNews(article.title + ' ' + article.description),
        url: article.url
      }));
    } catch (error) {
      console.error('Error fetching from NewsAPI:', error);
      return null;
    }
  }

  async getFinancialNewsFromAlphaVantage() {
    if (!this.alphaVantageKey) {
      console.log('ALPHA_VANTAGE_API_KEY not found, using mock data');
      return null;
    }

    try {
      const response = await axios.get<AlphaVantageNewsResponse>(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets,economy_fiscal,economy_monetary&apikey=${this.alphaVantageKey}&limit=10`
      );

      return response.data.feed.map((item, index) => ({
        id: `alpha-${index}`,
        title: item.title,
        summary: item.summary,
        date: new Date(item.time_published).toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        source: item.source,
        category: item.topics[0]?.topic || 'Financial Markets',
        url: item.url
      }));
    } catch (error) {
      console.error('Error fetching from Alpha Vantage:', error);
      return null;
    }
  }

  private categorizeNews(text: string): string {
    const lowercaseText = text.toLowerCase();
    
    if (lowercaseText.includes('fed') || lowercaseText.includes('interest rate') || lowercaseText.includes('monetary')) {
      return 'Monetary Policy';
    }
    if (lowercaseText.includes('stock') || lowercaseText.includes('equity') || lowercaseText.includes('shares')) {
      return 'Equity Markets';
    }
    if (lowercaseText.includes('bond') || lowercaseText.includes('treasury') || lowercaseText.includes('yield')) {
      return 'Fixed Income';
    }
    if (lowercaseText.includes('crypto') || lowercaseText.includes('bitcoin') || lowercaseText.includes('ethereum')) {
      return 'Cryptocurrency';
    }
    if (lowercaseText.includes('oil') || lowercaseText.includes('gold') || lowercaseText.includes('commodity')) {
      return 'Commodities';
    }
    if (lowercaseText.includes('tech') || lowercaseText.includes('technology') || lowercaseText.includes('ai')) {
      return 'Technology';
    }
    
    return 'Financial Markets';
  }

  async getRealNews() {
    // Prova prima NewsAPI, poi Alpha Vantage come fallback
    let news = await this.getFinancialNewsFromNewsAPI();
    
    if (!news || news.length === 0) {
      news = await this.getFinancialNewsFromAlphaVantage();
    }

    return news;
  }
}
