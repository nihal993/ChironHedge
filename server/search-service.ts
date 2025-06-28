export interface SearchResult {
  id: string;
  title: string;
  type: 'page' | 'research' | 'strategy' | 'news';
  url: string;
  summary: string;
  category?: string;
  relevance: number;
}

export class SearchService {
  private searchableContent = [
    // Pages
    {
      id: 'home',
      title: 'ChironHedge - Advanced Financial Research',
      type: 'page' as const,
      url: '/',
      content: 'quantitative research hedge fund financial markets portfolio strategies machine learning ai data science engineering',
      summary: 'Advanced quantitative research and portfolio strategies for institutional investors'
    },
    {
      id: 'markets-insight',
      title: 'Markets Insight Dashboard',
      type: 'page' as const,
      url: '/markets-insight',
      content: 'market analysis real-time data financial instruments bonds equities volatility commodities',
      summary: 'Real-time market analysis and financial data visualization'
    },
    {
      id: 'research-overview',
      title: 'Research Overview',
      type: 'research' as const,
      url: '/research',
      content: 'research publications papers academic studies financial markets quantitative analysis',
      summary: 'Comprehensive overview of our research publications and academic studies'
    },
    {
      id: 'data-science',
      title: 'Data Science Research',
      type: 'research' as const,
      url: '/research/data-science',
      content: 'machine learning artificial intelligence predictive models statistical analysis big data',
      summary: 'Advanced data science research in machine learning and predictive modeling'
    },
    {
      id: 'engineering',
      title: 'Engineering Research',
      type: 'research' as const,
      url: '/research/engineering',
      content: 'algorithmic trading systems optimization infrastructure technology fintech',
      summary: 'Engineering research in algorithmic trading systems and financial technology'
    },
    {
      id: 'quantitative-strategies',
      title: 'Quantitative Strategies',
      type: 'strategy' as const,
      url: '/quantitative-strategies',
      content: 'portfolio optimization risk management factor models systematic trading alpha generation',
      summary: 'Quantitative portfolio strategies and risk management systems'
    },
    {
      id: 'news-ai',
      title: 'Financial News & AI Analysis',
      type: 'news' as const,
      url: '/news-ai',
      content: 'financial news market updates ai analysis sentiment natural language processing',
      summary: 'AI-powered financial news analysis and market sentiment tracking'
    },

    // Research Papers - Data Science
    {
      id: 'ml-finance-paper',
      title: 'Machine Learning Applications in Portfolio Construction',
      type: 'research' as const,
      url: '/research/data-science',
      content: 'machine learning portfolio construction deep learning neural networks factor investing',
      summary: 'Exploring advanced machine learning techniques for optimal portfolio construction'
    },
    {
      id: 'nlp-sentiment-paper',
      title: 'NLP-Based Market Sentiment Analysis',
      type: 'research' as const,
      url: '/research/data-science',
      content: 'natural language processing sentiment analysis market sentiment news analysis',
      summary: 'Using NLP techniques to analyze market sentiment from financial news'
    },
    {
      id: 'risk-prediction-paper',
      title: 'Predictive Risk Modeling with Deep Learning',
      type: 'research' as const,
      url: '/research/data-science',
      content: 'risk modeling deep learning prediction models stress testing var',
      summary: 'Advanced risk prediction models using deep learning architectures'
    },

    // Research Papers - Engineering
    {
      id: 'algo-trading-paper',
      title: 'High-Frequency Algorithmic Trading Systems',
      type: 'research' as const,
      url: '/research/engineering',
      content: 'algorithmic trading high frequency low latency optimization execution',
      summary: 'Engineering ultra-low latency trading systems for high-frequency strategies'
    },
    {
      id: 'blockchain-paper',
      title: 'Blockchain Infrastructure for Financial Markets',
      type: 'research' as const,
      url: '/research/engineering',
      content: 'blockchain decentralized finance smart contracts infrastructure security',
      summary: 'Implementing blockchain technology in traditional financial market infrastructure'
    },
    {
      id: 'cloud-computing-paper',
      title: 'Cloud-Native Financial Computing Architecture',
      type: 'research' as const,
      url: '/research/engineering',
      content: 'cloud computing scalability microservices financial computing architecture',
      summary: 'Designing scalable cloud-native architectures for financial computing'
    },

    // Strategies
    {
      id: 'momentum-strategy',
      title: 'Cross-Asset Momentum Strategy',
      type: 'strategy' as const,
      url: '/quantitative-strategies',
      content: 'momentum factor cross asset allocation systematic trading quantitative',
      summary: 'Systematic momentum strategy across multiple asset classes'
    },
    {
      id: 'mean-reversion-strategy',
      title: 'Statistical Arbitrage & Mean Reversion',
      type: 'strategy' as const,
      url: '/quantitative-strategies',
      content: 'statistical arbitrage mean reversion pairs trading cointegration',
      summary: 'Statistical arbitrage strategies exploiting mean reversion patterns'
    },
    {
      id: 'factor-investing-strategy',
      title: 'Multi-Factor Investment Framework',
      type: 'strategy' as const,
      url: '/quantitative-strategies',
      content: 'factor investing multi factor value growth momentum quality',
      summary: 'Comprehensive multi-factor investment framework and optimization'
    }
  ];

  search(query: string): SearchResult[] {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    const results: SearchResult[] = [];

    this.searchableContent.forEach(item => {
      const relevance = this.calculateRelevance(searchTerms, item);
      if (relevance > 0) {
        results.push({
          id: item.id,
          title: item.title,
          type: item.type,
          url: item.url,
          summary: item.summary,
          category: this.getCategoryByType(item.type),
          relevance
        });
      }
    });

    // Sort by relevance (highest first) and return top 10
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 10);
  }

  private calculateRelevance(searchTerms: string[], item: any): number {
    const title = item.title.toLowerCase();
    const content = item.content.toLowerCase();
    const summary = item.summary.toLowerCase();

    let score = 0;

    searchTerms.forEach(term => {
      // Exact title match gets highest score
      if (title.includes(term)) {
        score += title === term ? 10 : 5;
      }
      
      // Content match
      if (content.includes(term)) {
        score += 3;
      }
      
      // Summary match
      if (summary.includes(term)) {
        score += 2;
      }

      // Bonus for multiple word matches
      const wordMatches = (title.match(new RegExp(term, 'g')) || []).length +
                         (content.match(new RegExp(term, 'g')) || []).length;
      score += wordMatches * 0.5;
    });

    return score;
  }

  private getCategoryByType(type: string): string {
    switch (type) {
      case 'page': return 'Website Pages';
      case 'research': return 'Research Papers';
      case 'strategy': return 'Portfolio Strategies';
      case 'news': return 'Financial News';
      default: return 'Content';
    }
  }

  // Get popular/suggested searches
  getSuggestedSearches(): string[] {
    return [
      'machine learning finance',
      'quantitative strategies',
      'risk management',
      'algorithmic trading',
      'portfolio optimization',
      'factor investing',
      'sentiment analysis',
      'blockchain finance',
      'artificial intelligence',
      'data science'
    ];
  }
}

export const searchService = new SearchService();