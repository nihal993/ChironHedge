import { ResearchCategory, MarketInsight, StrategyPerformance } from './data';

// Versione tradotta delle categorie di ricerca
export const getLocalizedResearchCategories = (language: string): ResearchCategory[] => {
  if (language === 'it') {
    return [
      {
        id: "macro",
        title: "Analisi Macroeconomica",
        description: "Valutazioni tempestive sui principali trend macroeconomici e il loro impatto sui mercati globali.",
        imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Modelli finanziari matematici",
        reportsCount: 20
      },
      {
        id: "volatility",
        title: "Volatilità",
        description: "Modelli proprietari di previsione della volatilità e strategie di trading relative.",
        imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Visualizzazione della volatilità",
        reportsCount: 15
      },
      {
        id: "credit",
        title: "Ricerca sul Credito",
        description: "Analisi approfondite sui mercati del credito con focus su pricing relativo e anomalie.",
        imageSrc: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Visualizzazione dati mercato del credito",
        reportsCount: 18
      },
      {
        id: "equity",
        title: "Fattori Azionari",
        description: "Ricerche sui fattori azionari, dalla value al momentum, con applicazioni pratiche.",
        imageSrc: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Modelli di fattori azionari",
        reportsCount: 25
      },
      {
        id: "fixed-income",
        title: "Strategie di Reddito Fisso",
        description: "Strategie di trading e investimento sui mercati obbligazionari globali.",
        imageSrc: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Modelli di strategia a reddito fisso",
        reportsCount: 22
      },
      {
        id: "alternative-data",
        title: "Dati Alternativi",
        description: "Sfruttamento di dataset non convenzionali per generare alpha nei mercati finanziari.",
        imageSrc: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Visualizzazione di dati alternativi",
        reportsCount: 12
      }
    ];
  } else {
    return [
      {
        id: "macro",
        title: "Macro Analysis",
        description: "Timely assessments of major macroeconomic trends and their impact on global markets.",
        imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Mathematical financial models",
        reportsCount: 20
      },
      {
        id: "volatility",
        title: "Volatility",
        description: "Proprietary volatility forecasting models and related trading strategies.",
        imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Volatility visualization",
        reportsCount: 15
      },
      {
        id: "credit",
        title: "Credit Research",
        description: "In-depth analysis of credit markets with a focus on relative pricing and anomalies.",
        imageSrc: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Credit market data visualization",
        reportsCount: 18
      },
      {
        id: "equity",
        title: "Equity Factors",
        description: "Research on equity factors, from value to momentum, with practical applications.",
        imageSrc: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Equity factor models",
        reportsCount: 25
      },
      {
        id: "fixed-income",
        title: "Fixed Income Strategies",
        description: "Trading and investment strategies in global bond markets.",
        imageSrc: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Fixed income strategy models",
        reportsCount: 22
      },
      {
        id: "alternative-data",
        title: "Alternative Data",
        description: "Leveraging unconventional datasets to generate alpha in financial markets.",
        imageSrc: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
        imageAlt: "Alternative data visualization",
        reportsCount: 12
      }
    ];
  }
};