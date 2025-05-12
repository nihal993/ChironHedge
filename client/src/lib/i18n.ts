// Language settings and translations

export type Language = 'en' | 'it';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// All text translations for the site
export const translations: Translations = {
  // Navigation
  'navbar.newsAI': {
    en: 'News AI',
    it: 'News AI'
  },
  'navbar.quantitativeModel': {
    en: 'Quantitative Model',
    it: 'Modello Quantitativo'
  },
  'navbar.marketsInsight': {
    en: 'Markets Insight',
    it: 'Analisi di Mercato'
  },
  'navbar.research': {
    en: 'Research & Analysis',
    it: 'Ricerca & Analisi'
  },
  'navbar.macroReport': {
    en: 'Macroeconomic Analysis',
    it: 'Analisi Macroeconomica'
  },
  'navbar.strategies': {
    en: 'Quantitative Strategies',
    it: 'Strategie Quantitative'
  },
  'navbar.contact': {
    en: 'Get in Touch',
    it: 'Contattaci'
  },
  
  // Hero Section
  'hero.subtitle': {
    en: 'Advanced Quantitative Analysis',
    it: 'Analisi Quantitativa Avanzata'
  },
  'hero.title': {
    en: 'Institutional-Grade Research Solutions',
    it: 'Soluzioni di Ricerca di Livello Istituzionale'
  },
  'hero.description': {
    en: 'Proprietary models & advanced analytics delivering actionable insights for sophisticated investors.',
    it: 'Modelli proprietari e analisi avanzate che forniscono insight azionabili per investitori sofisticati.'
  },
  'hero.button': {
    en: 'Explore Our Research',
    it: 'Esplora la Nostra Ricerca'
  },
  
  // News AI Section
  'newsAI.title': {
    en: 'News AI',
    it: 'News AI'
  },
  'newsAI.description': {
    en: 'AI-powered analysis of financial news providing real-time insights with sentiment assessment.',
    it: 'Analisi alimentata da IA delle notizie finanziarie che fornisce approfondimenti in tempo reale con valutazione del sentiment.'
  },
  'newsAI.header': {
    en: 'Today\'s Key Market News',
    it: 'Notizie chiave di mercato di oggi'
  },
  'newsAI.updated': {
    en: 'Updated',
    it: 'Aggiornato'
  },
  'newsAI.ago': {
    en: 'ago',
    it: 'fa'
  },
  'newsAI.source': {
    en: 'Source',
    it: 'Fonte'
  },
  'newsAI.readAnalysis': {
    en: 'Read Analysis',
    it: 'Leggi Analisi'
  },
  'newsAI.viewAll': {
    en: 'View all news',
    it: 'Visualizza tutte le notizie'
  },
  
  // Quantitative Model Section
  'quantModel.title': {
    en: 'Quantitative Model',
    it: 'Modello Quantitativo'
  },
  'quantModel.description': {
    en: 'Our proprietary models combine advanced mathematical techniques with machine learning to deliver predictive insights.',
    it: 'I nostri modelli proprietari combinano tecniche matematiche avanzate con il machine learning per fornire insight predittivi.'
  },
  'quantModel.gdpTitle': {
    en: 'Global GDP Forecast',
    it: 'Previsione PIL Globale'
  },
  'quantModel.inflationTitle': {
    en: 'Inflation Projection',
    it: 'Proiezione Inflazione'
  },
  'quantModel.gdpChartTitle': {
    en: 'GDP Growth Forecast Model',
    it: 'Modello di Previsione Crescita PIL'
  },
  'quantModel.inflationChartTitle': {
    en: 'Inflation Rate Projection Model',
    it: 'Modello di Proiezione Tasso di Inflazione'
  },
  'quantModel.updated': {
    en: 'Updated',
    it: 'Aggiornato'
  },
  'quantModel.gdpDescription': {
    en: 'Our proprietary recursive neural network forecasts GDP with 87% higher accuracy than traditional models.',
    it: 'La nostra rete neurale ricorsiva proprietaria prevede il PIL con una precisione dell\'87% superiore rispetto ai modelli tradizionali.'
  },
  'quantModel.inflationDescription': {
    en: 'Our inflation model incorporates 143 distinct variables for superior predictive power in rate forecasting.',
    it: 'Il nostro modello di inflazione incorpora 143 variabili distinte per una superiore capacità predittiva nella previsione dei tassi.'
  },
  'quantModel.viewMethodology': {
    en: 'View methodology',
    it: 'Visualizza metodologia'
  },
  
  // Markets Insight Section
  'marketsInsight.title': {
    en: 'Markets Insight',
    it: 'Analisi di Mercato'
  },
  
  // Research Section
  'research.title': {
    en: 'Research & Analysis',
    it: 'Ricerca & Analisi'
  },
  'research.description': {
    en: 'Our research combines rigorous academic methodologies with practical applications for institutional investors.',
    it: 'La nostra ricerca combina rigorose metodologie accademiche con applicazioni pratiche per investitori istituzionali.'
  },
  
  // Macro Report Section
  'macroReport.title': {
    en: 'Macroeconomic Analysis',
    it: 'Analisi Macroeconomica'
  },
  'macroReport.description': {
    en: 'Our macroeconomic analysis provides a comprehensive view of global economic conditions and forecasts.',
    it: 'La nostra analisi macroeconomica fornisce una visione completa delle condizioni economiche globali e delle previsioni.'
  },
  
  // Common actions
  'action.viewAll': {
    en: 'View all',
    it: 'Visualizza tutto'
  },
  'action.readMore': {
    en: 'Read more',
    it: 'Leggi di più'
  },
  'action.viewDetails': {
    en: 'View details',
    it: 'Visualizza dettagli'
  },
  'action.viewReport': {
    en: 'View report',
    it: 'Visualizza report'
  },
  
  // Auth and Contact
  'login': {
    en: 'Login',
    it: 'Accedi'
  },
  'contact': {
    en: 'Contact Us',
    it: 'Contattaci'
  }
};

// Function to get a translation
export function t(key: string, lang: Language): string {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  // Fallback to English if translation not found
  if (translations[key] && translations[key]['en']) {
    return translations[key]['en'];
  }
  // Return the key if no translation found at all
  return key;
}