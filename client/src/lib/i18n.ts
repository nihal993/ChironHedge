// Language settings and translations

import { strategies } from "./data";

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
    en: 'Research',
    it: 'Ricerca'
  },
  'navbar.strategies': {
    en: 'Portfolio Strategies',
    it: 'Strategie di Portafoglio'
  },
  'navbar.contact': {
    en: 'Contact Us',
    it: 'Contattaci'
  },
  'navbar.login': {
    en: 'Login',
    it: 'Accedi'
  },

  // Login translations
  'login.title': {
    en: 'Welcome back',
    it: 'Bentornato'
  },
  'login.subtitle': {
    en: 'Enter your credentials to access your account',
    it: 'Inserisci le tue credenziali per accedere al tuo account'
  },
  'login.email': {
    en: 'Email',
    it: 'Email'
  },
  'login.emailPlaceholder': {
    en: 'Enter your email',
    it: 'Inserisci la tua email'
  },
  'login.password': {
    en: 'Password',
    it: 'Password'
  },
  'login.passwordPlaceholder': {
    en: 'Enter your password',
    it: 'Inserisci la tua password'
  },
  'login.signIn': {
    en: 'Sign In',
    it: 'Accedi'
  },
  'login.signingIn': {
    en: 'Signing in...',
    it: 'Accesso in corso...'
  },
  'login.forgotPassword': {
    en: 'Forgot your password?',
    it: 'Hai dimenticato la password?'
  },
  'login.noAccount': {
    en: "Don't have an account?",
    it: 'Non hai un account?'
  },
  'login.signUp': {
    en: 'Sign up',
    it: 'Registrati'
  },
  'login.continueWithGoogle': {
    en: 'Continue with Google',
    it: 'Continua con Google'
  },
  'login.continueWithMicrosoft': {
    en: 'Continue with Microsoft',
    it: 'Continua con Microsoft'
  },
  'login.continueWithApple': {
    en: 'Continue with Apple',
    it: 'Continua con Apple'
  },
  'login.orContinueWith': {
    en: 'or continue with email',
    it: 'o continua con email'
  },

  // Register translations
  'register.title': {
    en: 'Create your account',
    it: 'Crea il tuo account'
  },
  'register.subtitle': {
    en: 'Join ChironHedge to access exclusive financial insights',
    it: 'Unisciti a ChironHedge per accedere a insights finanziari esclusivi'
  },
  'register.firstName': {
    en: 'First Name',
    it: 'Nome'
  },
  'register.firstNamePlaceholder': {
    en: 'Enter your first name',
    it: 'Inserisci il tuo nome'
  },
  'register.lastName': {
    en: 'Last Name',
    it: 'Cognome'
  },
  'register.lastNamePlaceholder': {
    en: 'Enter your last name',
    it: 'Inserisci il tuo cognome'
  },
  'register.email': {
    en: 'Email',
    it: 'Email'
  },
  'register.emailPlaceholder': {
    en: 'Enter your email',
    it: 'Inserisci la tua email'
  },
  'register.password': {
    en: 'Password',
    it: 'Password'
  },
  'register.passwordPlaceholder': {
    en: 'Create a password (min 8 characters)',
    it: 'Crea una password (min 8 caratteri)'
  },
  'register.confirmPassword': {
    en: 'Confirm Password',
    it: 'Conferma Password'
  },
  'register.confirmPasswordPlaceholder': {
    en: 'Confirm your password',
    it: 'Conferma la tua password'
  },
  'register.createAccount': {
    en: 'Create Account',
    it: 'Crea Account'
  },
  'register.creatingAccount': {
    en: 'Creating account...',
    it: 'Creazione account...'
  },
  'register.haveAccount': {
    en: 'Already have an account?',
    it: 'Hai già un account?'
  },
  'register.signIn': {
    en: 'Sign in',
    it: 'Accedi'
  },
  'register.continueWithGoogle': {
    en: 'Continue with Google',
    it: 'Continua con Google'
  },
  'register.continueWithMicrosoft': {
    en: 'Continue with Microsoft',
    it: 'Continua con Microsoft'
  },
  'register.continueWithApple': {
    en: 'Continue with Apple',
    it: 'Continua con Apple'
  },
  'register.orContinueWith': {
    en: 'or continue with email',
    it: 'o continua con email'
  },
  'register.acceptTerms': {
    en: 'I agree to the',
    it: 'Accetto i'
  },
  'register.termsOfService': {
    en: 'Terms of Service',
    it: 'Termini di Servizio'
  },
  'register.and': {
    en: 'and',
    it: 'e la'
  },
  'register.privacyPolicy': {
    en: 'Privacy Policy',
    it: 'Privacy Policy'
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
  'home.newsTitle': {
    en: 'Federal Reserve',
    it: 'Federal Reserve'
  },
  'home.newsContent': {
    en: 'Federal Reserve Announces Shift in Interest Rate Policy',
    it: 'Federal Reserve Annuncia Cambiamento nella Politica dei Tassi di Interesse'
  },
  'home.moreNews': {
    en: 'More News',
    it: 'Altre Notizie'
  },
  'home.quantitativeModel': {
    en: 'Quantitative Model',
    it: 'Modello Quantitativo'
  },
  'home.modelDescription': {
    en: 'Our proprietary models combine advanced mathematical techniques with machine learning to deliver predictive insights.',
    it: 'I nostri modelli proprietari combinano tecniche matematiche avanzate con il machine learning per fornire informazioni predittive.'
  },
  'home.gdpTab': {
    en: 'Global GDP Forecast',
    it: 'Previsione PIL Globale'
  },
  'home.inflationTab': {
    en: 'Inflation Projection',
    it: 'Proiezione Inflazione'
  },
  'home.gdpChartTitle': {
    en: 'GDP Growth Forecast Model',
    it: 'Modello di Previsione Crescita PIL'
  },
  'home.updated': {
    en: 'Updated',
    it: 'Aggiornato'
  },
  'home.updateDate': {
    en: 'May 10, 2025',
    it: '10 Maggio 2025'
  },
  'home.gdpAccuracy': {
    en: 'Our proprietary recursive neural network forecasts GDP with 87% higher accuracy than traditional models.',
    it: 'La nostra rete neurale ricorsiva proprietaria prevede il PIL con una precisione dell\'87% superiore rispetto ai modelli tradizionali.'
  },
  'home.viewMethodology': {
    en: 'View methodology',
    it: 'Visualizza metodologia'
  },
  'home.inflationTitle': {
    en: 'Inflation Rate Projection Model',
    it: 'Modello di Proiezione del Tasso di Inflazione'
  },
  'home.inflationUpdateDate': {
    en: 'May 8, 2025',
    it: '8 Maggio 2025'
  },
  'home.inflationModelDesc': {
    en: 'Our inflation model incorporates 143 distinct variables for superior predictive power in rate forecasting.',
    it: 'Il nostro modello di inflazione incorpora 143 variabili distinte per una potenza predittiva superiore nelle previsioni dei tassi.'
  },
  'home.factorAnalysisTitle': {
    en: 'Investment Factor Analysis',
    it: 'Analisi dei Fattori di Investimento'
  },
  'home.factorAnalysisDescription': {
    en: 'Our factor analysis identifies market anomalies through proprietary multi-factor regression models.',
    it: 'La nostra analisi dei fattori identifica le anomalie di mercato attraverso modelli di regressione multi-fattoriale proprietari.'
  },
  'home.viewWhitePaper': {
    en: 'View white paper',
    it: 'Visualizza white paper'
  },
  'home.forecastModelTitle': {
    en: 'Forecast Model Accuracy',
    it: 'Precisione del Modello di Previsione'
  },
  'home.forecastModelDesc': {
    en: 'Accuracy metrics for our proprietary forecasting models measured as percentage of predictions within one standard deviation of actual outcomes.',
    it: 'Metriche di accuratezza per i nostri modelli di previsione proprietari misurate come percentuale di previsioni entro una deviazione standard dai risultati effettivi.'
  },
  'home.viewModelMethodology': {
    en: 'View model methodology',
    it: 'Visualizza metodologia del modello'
  },
  'home.factorAnalysisUpdated': {
    en: 'May 11, 2025',
    it: '11 Maggio 2025'
  },
  'home.forecastModelUpdated': {
    en: 'May 9, 2025',
    it: '9 Maggio 2025'
  },
  'home.marketsInsight': {
    en: 'Markets Insight',
    it: 'Analisi dei Mercati'
  },
  'home.marketPerformance': {
    en: 'Market Performance',
    it: 'Performance di Mercato'
  },
  'home.marketVolatility': {
    en: 'Market Volatility',
    it: 'Volatilità di Mercato'
  },
  'home.latestMarketNews': {
    en: 'Latest Market News',
    it: 'Ultime Notizie di Mercato'
  },
  'home.interestRates': {
    en: 'Interest Rates',
    it: 'Tassi di Interesse'
  },
  'home.assetCorrelation': {
    en: 'Asset Correlation',
    it: 'Correlazione tra Asset'
  },
  'home.crossAssetCorrelation': {
    en: 'Cross-Asset Correlation',
    it: 'Correlazione tra Asset Diversi'
  },
  'home.portfolioStrategies': {
    en: 'Portfolio Strategies',
    it: 'Strategie di Portafoglio'
  },
  'home.exploreOurResearch': {
    en: 'Explore Our Research',
    it: 'Esplora le Nostre Ricerche'
  },
  
  // Our Research Section
  'ourResearch.title': {
    en: 'Our Research',
    it: 'Le Nostre Ricerche'
  },
  'home.researchTitle': {
    en: 'Research',
    it: 'Ricerca'
  },
  'home.researchDescription': {
    en: 'Our research combines rigorous academic methodologies with practical applications for institutional investors.',
    it: 'La nostra ricerca combina metodologie accademiche rigorose con applicazioni pratiche per investitori istituzionali.'
  },
  'home.featuredResearch': {
    en: 'Featured Research',
    it: 'Ricerca in Evidenza'
  },
  'home.marketOutlook': {
    en: 'Market Outlook',
    it: 'Previsioni di Mercato'
  },
  'home.globalMarketsTitle': {
    en: 'Global Markets: Navigating Volatility',
    it: 'Mercati Globali: Navigare la Volatilità'
  },
  'home.globalMarketsDesc': {
    en: 'Our analysts examine current market conditions and provide strategic guidance for institutional investors in a changing landscape.',
    it: 'I nostri analisti esaminano le condizioni attuali del mercato e forniscono una guida strategica per gli investitori istituzionali in un panorama in evoluzione.'
  },
  'home.readTheReport': {
    en: 'Read the report',
    it: 'Leggi il report'
  },
  'home.contactUs': {
    en: 'Contact Us',
    it: 'Contattaci'
  },
  'ourResearch.description': {
    en: 'Cutting-edge financial research combining rigorous academic methodologies with practical applications for institutional investors.',
    it: 'Ricerca finanziaria all\'avanguardia che combina metodologie accademiche rigorose con applicazioni pratiche per investitori istituzionali.'
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
  'news.errorTitle': {
    en: 'Error',
    it: 'Errore'
  },
  'news.errorDescription': {
    en: 'Failed to load news. Please try again later.',
    it: 'Impossibile caricare le notizie. Si prega di riprovare più tardi.'
  },
  'newsAI.source': {
    en: 'Source',
    it: 'Fonte'
  },
  'newsAI.federalReserve': {
    en: 'In a significant policy adjustment, the Federal Reserve has indicated a potential pivot in its approach to interest rates, suggesting a more accommodative stance may be forthcoming.',
    it: 'In un significativo aggiustamento di politica monetaria, la Federal Reserve ha indicato un potenziale cambiamento nel suo approccio ai tassi di interesse, suggerendo che potrebbe essere imminente una posizione più accomodante.'
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
    en: 'Quantitative Models',
    it: 'Modelli Quantitativi'
  },
  'quantModel.volatilityTab': {
    en: 'Volatility Forecasting',
    it: 'Previsione Volatilità'
  },
  'quantModel.factorTab': {
    en: 'Factor Returns',
    it: 'Rendimenti Fattoriali'
  },
  'quantModel.yieldTab': {
    en: 'Yield Curve Analysis',
    it: 'Analisi Curva dei Rendimenti'
  },
  'quantModel.description': {
    en: 'Explore our suite of sophisticated quantitative models that provide unique insights into market dynamics, risk factors, and investment opportunities.',
    it: 'Esplora la nostra suite di modelli quantitativi sofisticati che forniscono approfondimenti unici sulle dinamiche di mercato, i fattori di rischio e le opportunità di investimento.'
  },
  'quantModel.volatilityTitle': {
    en: 'Volatility Forecasting Model',
    it: 'Modello di Previsione della Volatilità'
  },
  'quantModel.volatilityDescription': {
    en: 'Our proprietary volatility prediction model leverages machine learning algorithms to forecast expected market volatility, comparing it with realized values and historical averages.',
    it: 'Il nostro modello proprietario di previsione della volatilità utilizza algoritmi di machine learning per prevedere la volatilità attesa del mercato, confrontandola con valori realizzati e medie storiche.'
  },
  'quantModel.factorTitle': {
    en: 'Equity Factor Returns',
    it: 'Rendimenti dei Fattori Azionari'
  },
  'quantModel.factorDescription': {
    en: 'Analysis of major equity factor performance across time periods, showing the cyclicality and relative strength of different investment styles.',
    it: 'Analisi dei rendimenti dei principali fattori azionari in diversi periodi, che mostra la ciclicità e la forza relativa dei diversi stili di investimento.'
  },
  'quantModel.yieldTitle': {
    en: 'Yield Curve Analysis',
    it: 'Analisi della Curva dei Rendimenti'
  },
  'quantModel.yieldDescription': {
    en: 'Comparative view of yield curves across different time periods, with analysis of curve shape, steepness, and implications for economic outlook.',
    it: 'Visione comparativa delle curve dei rendimenti in diversi periodi di tempo, con analisi della forma della curva, della pendenza e delle implicazioni per le prospettive economiche.'
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
  'research.macroEconomic': {
    en: 'Macro Economic Analysis',
    it: 'Analisi Macroeconomica'
  },
  'research.globalTrends': {
    en: 'Global trends, policy impacts',
    it: 'Tendenze globali, impatti politici'
  },
  'research.reportCount': {
    en: 'reports',
    it: 'report'
  },
  'research.sectorInsights': {
    en: 'Sector Insights',
    it: 'Analisi Settoriale'
  },
  'research.industryTrends': {
    en: 'Industry trends analysis',
    it: 'Analisi delle tendenze industriali'
  },
  'research.esgFramework': {
    en: 'ESG Investment Framework for Institutions',
    it: 'Framework ESG per Investimenti Istituzionali'
  },
  'research.esgDescription': {
    en: 'Our ESG research team provides a comprehensive framework for integrating sustainability metrics into investment decisions.',
    it: 'Il nostro team di ricerca ESG fornisce un framework completo per integrare le metriche di sostenibilità nelle decisioni di investimento.'
  },
  'research.quantitative': {
    en: 'Quantitative Research',
    it: 'Ricerca Quantitativa'
  },
  'research.dataDriven': {
    en: 'Data-driven frameworks',
    it: 'Framework basati sui dati'
  },
  'research.marketStructure': {
    en: 'Market Structure',
    it: 'Struttura di Mercato'
  },
  'research.liquidityAnalysis': {
    en: 'Liquidity and flow analysis',
    it: 'Analisi di liquidità e flussi'
  },
  'research.policyResearch': {
    en: 'Policy Research',
    it: 'Ricerca sulle Politiche'
  },
  'research.regulatoryAnalysis': {
    en: 'Regulatory analysis',
    it: 'Analisi normativa'
  },
  'research.viewAll': {
    en: 'View all research',
    it: 'Visualizza tutte le ricerche'
  },
  
  // Quantitative Strategies Section
  'quantStrategies.title': {
    en: 'Quantitative Strategies',
    it: 'Strategie Quantitative'
  },
  'quantStrategies.subtitle': {
    en: 'Proprietary systematic investment approaches combining advanced mathematical models, machine learning, and financial expertise to generate alpha across market conditions.',
    it: 'Approcci di investimento sistematici proprietari che combinano modelli matematici avanzati, machine learning ed esperienza finanziaria per generare alpha in diverse condizioni di mercato.'
  },
  'strategies.featured': {
    en: 'Featured Strategies',
    it: 'Strategie in Evidenza'
  },
  'strategies.multiAsset1': {
    en: 'Multi-Asset',
    it: 'Multi-Asset'
  },
  'strategies.equityFocus': {
    en: 'Equity Focus',
    it: 'Focus Azionario'
  },
  'strategies.risk': {
    en: 'Risk',
    it: 'Rischio'
  },
  'strategies.sharpe': {
    en: 'Sharpe',
    it: 'Sharpe'
  },
  'strategies.performance': {
    en: 'Performance',
    it: 'Performance'
  },
  'strategies.strategyDetails': {
    en: 'Strategy Details',
    it: 'Dettagli della Strategia'
  },
  'strategies.backtest': {
    en: 'Backtest Results',
    it: 'Risultati del Backtest'
  },
  'strategies.cumulativeReturn': {
    en: 'Cumulative Return',
    it: 'Rendimento Cumulativo'
  },
  'strategies.drawdowns': {
    en: 'Maximum Drawdowns',
    it: 'Drawdown Massimi'
  },
  'strategies.monthlyReturns': {
    en: 'Monthly Returns',
    it: 'Rendimenti Mensili'
  },
  'strategies.performanceMetrics': {
    en: 'Performance Metrics',
    it: 'Metriche di Performance'
  },
  'strategies.strategy': {
    en: 'Strategy',
    it: 'Strategia'
  },
  'strategies.benchmark': {
    en: 'Benchmark',
    it: 'Benchmark'
  },
  'strategies.metric': {
    en: 'Metric',
    it: 'Metrica'
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
  
  // Chart and Data labels
  'chart.modelAccuracy': {
    en: 'Model Accuracy',
    it: 'Precisione del Modello'
  },
  'chart.lastMonths': {
    en: 'Last 12 months',
    it: 'Ultimi 12 mesi'
  },
  'chart.averageDeviation': {
    en: 'Average Deviation',
    it: 'Deviazione Media'
  },
  'chart.predictedVsRealized': {
    en: 'Predicted vs. Realized',
    it: 'Previsto vs. Realizzato'
  },
  'chart.currentForecast': {
    en: 'Current Forecast',
    it: 'Previsione Attuale'
  },
  'chart.next30days': {
    en: 'Next 30 days',
    it: 'Prossimi 30 giorni'
  },
  'chart.realized': {
    en: 'Realized',
    it: 'Realizzato'
  },
  'chart.predicted': {
    en: 'Predicted',
    it: 'Previsto'
  },
  'chart.historical': {
    en: 'Historical',
    it: 'Storico'
  },
  'chart.value': {
    en: 'Value',
    it: 'Valore'
  },
  'chart.momentum': {
    en: 'Momentum',
    it: 'Momentum'
  },
  'chart.quality': {
    en: 'Quality',
    it: 'Qualità'
  },
  'chart.lowVol': {
    en: 'Low Volatility',
    it: 'Bassa Volatilità'
  },
  'chart.current': {
    en: 'Current',
    it: 'Attuale'
  },
  'chart.lastMonth': {
    en: 'Last Month',
    it: 'Mese Scorso'
  },
  'chart.lastYear': {
    en: 'Last Year',
    it: 'Anno Scorso'
  },
  
  // Auth and Contact
  'login': {
    en: 'Login',
    it: 'Accedi'
  },
  'contact': {
    en: 'Contact Us',
    it: 'Contattaci'
  },
  
  // Footer
  'footer.companyName': {
    en: 'ChironHedge',
    it: 'ChironHedge'
  },
  'footer.tagline': {
    en: 'Advanced quantitative research solutions for institutional investors.',
    it: 'Soluzioni di ricerca quantitativa avanzata per investitori istituzionali.'
  },
  'footer.services': {
    en: 'Our Services',
    it: 'I nostri servizi'
  },
  'footer.company': {
    en: 'Company',
    it: 'Azienda'
  },
  'footer.legal': {
    en: 'Legal',
    it: 'Legale'
  },
  'footer.aboutUs': {
    en: 'About Us',
    it: 'Chi Siamo'
  },
  'footer.leadership': {
    en: 'Leadership',
    it: 'Leadership'
  },
  'footer.careers': {
    en: 'Careers',
    it: 'Carriere'
  },
  'footer.media': {
    en: 'Media',
    it: 'Media'
  },
  'footer.newsletter': {
    en: 'Newsletter',
    it: 'Newsletter'
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    it: 'Informativa sulla Privacy'
  },
  'footer.terms': {
    en: 'Terms of Service',
    it: 'Termini di Servizio'
  },
  'footer.risk': {
    en: 'Risk Warnings',
    it: 'Avvisi di Rischio'
  },
  'footer.cookie': {
    en: 'Cookie Policy',
    it: 'Politica dei Cookie'
  },
  'footer.security': {
    en: 'Security',
    it: 'Sicurezza'
  },
  'footer.accessibility': {
    en: 'Accessibility',
    it: 'Accessibilità'
  },
  'footer.copyright': {
    en: '© ${year} ChironHedge Global Services Ltd. All rights reserved.',
    it: '© ${year} ChironHedge Global Services Ltd. Tutti i diritti riservati.'
  },
  'footer.registration': {
    en: 'Company Reg: 01234567890 | Authorized and regulated by Financial Conduct Authority',
    it: 'Registrazione azienda: 01234567890 | Autorizzata e regolamentata dall\'Autorità di Condotta Finanziaria'
  },
  'footer.disclaimer': {
    en: 'Disclaimer: The information provided is for informational purposes only and does not constitute investment advice or financial recommendations. Past performance is not indicative of future results. Investments involve risk.',
    it: 'Disclaimer: Le informazioni fornite sono solo a scopo informativo e non costituiscono consulenza sugli investimenti o raccomandazioni finanziarie. I risultati passati non sono indicativi di risultati futuri. Gli investimenti comportano rischi.'
  },
  
  // About Us Section in Home
  'aboutUs.title': {
    en: 'About Us',
    it: 'Chi Siamo'
  },
  'aboutUs.description1': {
    en: 'ChironHedge is a cutting-edge financial research firm, founded by a team of Italian engineers and economists specialized in quantitative analysis and financial markets.',
    it: 'ChironHedge è un\'azienda di ricerca finanziaria all\'avanguardia, fondata da un team di ingegneri ed economisti italiani specializzati in analisi quantitativa e mercati finanziari.'
  },
  'aboutUs.description2': {
    en: 'Our approach combines traditional fundamental analysis with advanced quantitative methodologies, using proprietary algorithms and machine learning techniques to identify investment opportunities and manage risk with precision.',
    it: 'Il nostro approccio combina l\'analisi fondamentale tradizionale con metodologie quantitative avanzate, utilizzando algoritmi proprietari e tecniche di machine learning per identificare opportunità di investimento e gestire il rischio con precisione.'
  },
  'aboutUs.description3': {
    en: 'We specialize in macroeconomic analysis, statistical modeling, and the development of systematic investment strategies that have proven their effectiveness through various market cycles.',
    it: 'Siamo specializzati in analisi macroeconomica, modellazione statistica e sviluppo di strategie di investimento sistematiche che hanno dimostrato la loro efficacia attraverso vari cicli di mercato.'
  },
  'aboutUs.description4': {
    en: 'Our team combines diverse expertise with backgrounds in economics, quantitative finance, data engineering, and artificial intelligence to deliver innovative financial solutions.',
    it: 'Il nostro team combina diverse competenze nei campi dell\'economia, della finanza quantitativa, dell\'ingegneria dei dati e dell\'intelligenza artificiale per fornire soluzioni finanziarie innovative.'
  },
  
  // Strategies Section
  'strategies.title': {
    en: 'Quantitative Strategies',
    it: 'Strategie Quantitative'
  },
  'strategies.description': {
    en: 'Our proprietary strategies combine cutting-edge machine learning techniques, big data, and traditional financial modeling.',
    it: 'Le nostre strategie proprietarie uniscono tecniche all\'avanguardia di machine learning, big data e modellazione finanziaria tradizionale.'
  },
  'strategies.systemDescription': {
    en: 'Our systematic quantitative strategies harness advanced mathematics and machine learning for consistent alpha generation across market conditions.',
    it: 'Le nostre strategie quantitative sistematiche sfruttano matematica avanzata e apprendimento automatico per generare alpha consistente in diverse condizioni di mercato.'
  },
  'strategies.multiAssetDiv': {
    en: 'Multi-Asset',
    it: 'Multi-Asset'
  },
  'strategies.equityFocus2': {
    en: 'Equity Focus',
    it: 'Focus Azionario'
  },
  'strategies.multiFactorEquity': {
    en: 'Multi-Factor Equity Alpha',
    it: 'Alpha Azionario Multi-Fattoriale'
  },
  'strategies.systematicEquity': {
    en: 'Systematic equity selection combining value, momentum, quality, and low volatility factors with adaptive weighting algorithm.',
    it: 'Selezione azionaria sistematica che combina fattori di valore, momentum, qualità e bassa volatilità con un algoritmo di ponderazione adattivo.'
  },
  'strategies.fixedIncome': {
    en: 'Fixed Income',
    it: 'Reddito Fisso'
  },
  'strategies.globalTactical': {
    en: 'Global Tactical Asset Allocation',
    it: 'Allocazione Tattica Globale degli Asset'
  },
  'strategies.factorRotation': {
    en: 'Multi-Factor Rotation Strategy',
    it: 'Strategia di Rotazione Multi-Fattoriale'
  },
  'strategies.absoluteReturn': {
    en: 'Absolute Return Fixed Income',
    it: 'Reddito Fisso a Ritorno Assoluto'
  },
  'strategies.ytdPerformance': {
    en: 'YTD Performance',
    it: 'Performance YTD'
  },
  'strategies.dynamicAllocation': {
    en: 'Dynamic allocation across global asset classes driven by proprietary regime identification and risk parity optimization techniques.',
    it: 'Allocazione dinamica tra classi di attività globali guidata da tecniche proprietarie di identificazione del regime e ottimizzazione della parità di rischio.'
  },
  'strategies.factorDescription': {
    en: 'Adaptive factor rotation strategy that dynamically adjusts equity factor exposures based on market regime forecasts and risk models.',
    it: 'Strategia di rotazione fattoriale adattiva che regola dinamicamente le esposizioni ai fattori azionari in base alle previsioni del regime di mercato e ai modelli di rischio.'
  },
  'strategies.absoluteDescription': {
    en: 'Systematic approach to fixed income investing that targets absolute returns across interest rate environments with dynamic duration management.',
    it: 'Approccio sistematico all\'investimento a reddito fisso che mira a rendimenti assoluti in diversi ambienti di tassi di interesse con gestione dinamica della duration.'
  },
  'strategies.metrics.sharpe': {
    en: 'Sharpe',
    it: 'Sharpe'
  },
  'strategies.metrics.vol': {
    en: 'Vol',
    it: 'Vol'
  },
  'strategies.metrics.maxdd': {
    en: 'Max DD',
    it: 'Max DD'
  },
  'strategies.viewDetails': {
    en: 'View strategy details',
    it: 'Vedi dettagli strategia'
  },
  'strategies.viewAll': {
    en: 'View all quantitative strategies',
    it: 'Visualizza tutte le strategie quantitative'
  },
  'strategies.explore': {
    en: 'Explore the strategy',
    it: 'Esplora la strategia'
  },
  'strategies.performanceYTD': {
    en: 'Performance YTD',
    it: 'Performance YTD'
  },
  'strategies.custom.title': {
    en: 'Custom Solutions',
    it: 'Soluzioni Customizzate'
  },
  'strategies.custom.description': {
    en: 'We develop tailored quantitative strategies based on the specific needs, constraints, and objectives of our institutional clients.',
    it: 'Sviluppiamo strategie quantitative su misura in base alle esigenze specifiche, ai vincoli e agli obiettivi dei nostri clienti istituzionali.'
  },
  'strategies.custom.feature1': {
    en: 'Implementation of custom ESG constraints',
    it: 'Implementazione di vincoli ESG personalizzati'
  },
  'strategies.custom.feature2': {
    en: 'Integration with existing systems and processes',
    it: 'Integrazione con i sistemi e processi esistenti'
  },
  'strategies.custom.feature3': {
    en: 'Optimization for specific risk-return objectives',
    it: 'Ottimizzazione per obiettivi specifici di rischio-rendimento'
  },
  'strategies.custom.feature4': {
    en: 'Complete implementation support, including production-ready code',
    it: 'Supporto implementativo completo, incluso codice produzione-ready'
  },
  'strategies.custom.request': {
    en: 'Request a consultation',
    it: 'Richiedi una consulenza'
  },
  'strategies.performance.title': {
    en: 'Performance Comparison',
    it: 'Confronto di Performance'
  },
  'strategies.performance.description': {
    en: 'Our strategies have consistently outperformed reference benchmarks over the past 5 years.',
    it: 'Le nostre strategie hanno costantemente sovraperformato i benchmark di riferimento negli ultimi 5 anni.'
  },
  'strategies.performance.chart.title': {
    en: 'Performance Comparison',
    it: 'Confronto Performance'
  },
  'strategies.performance.chiron': {
    en: 'ChironHedge Strategies',
    it: 'Strategie ChironHedge'
  },
  'strategies.performance.benchmark': {
    en: 'Market Benchmark',
    it: 'Benchmark di mercato'
  },
  'strategies.performance.alpha': {
    en: 'Generated Alpha',
    it: 'Alpha Generato'
  },
  'strategies.performance.sharpe': {
    en: 'Sharpe Ratio',
    it: 'Sharpe Ratio'
  },
  'strategies.performance.drawdown': {
    en: 'Max Drawdown',
    it: 'Max Drawdown'
  },
  'strategies.performance.annual': {
    en: 'annualized (5 years)',
    it: 'annualizzato (5 anni)'
  },
  'strategies.performance.vs': {
    en: 'vs',
    it: 'vs'
  },
  
  // About Us Page
  'aboutpage.title': {
    en: 'About Us',
    it: 'Chi Siamo'
  },
  'aboutpage.description': {
    en: 'A team of Italian engineers and economists, united by a passion for advanced financial research and quantitative market analysis.',
    it: 'Un team di ingegneri e economisti italiani, uniti dalla passione per la ricerca finanziaria avanzata e l\'analisi quantitativa dei mercati finanziari.'
  },
  'aboutpage.approach': {
    en: 'We provide quantitative analysis solutions that combine complex mathematical models, big data, and machine learning techniques to identify unique opportunities in global markets.',
    it: 'Forniamo soluzioni di analisi quantitativa che combinano modelli matematici complessi, big data e tecniche di machine learning per identificare opportunità uniche sui mercati globali.'
  },
  'aboutpage.stats.years': {
    en: 'Years of experience in global markets',
    it: 'Anni di esperienza su mercati globali'
  },
  'aboutpage.stats.publications': {
    en: 'Academic publications',
    it: 'Pubblicazioni accademiche'
  },
  'aboutpage.stats.assets': {
    en: 'Assets supported by our research',
    it: 'Asset supportati dalle nostre ricerche'
  },
  'aboutpage.stats.retention': {
    en: 'Client retention rate',
    it: 'Tasso di ritenzione clienti'
  },
  'aboutpage.mission.title': {
    en: 'Our Mission',
    it: 'La Nostra Missione'
  },
  'aboutpage.mission.description': {
    en: 'Combine academic excellence with practical market experience to offer cutting-edge quantitative solutions.',
    it: 'Combinare l\'eccellenza accademica con l\'esperienza pratica di mercato per offrire soluzioni quantitative all\'avanguardia.'
  },
  'aboutpage.values.research': {
    en: 'Rigorous Research',
    it: 'Ricerca Rigorosa'
  },
  'aboutpage.values.research.desc': {
    en: 'Every analysis and model undergoes rigorous statistical tests and robustness checks before being shared with clients.',
    it: 'Ogni analisi e modello viene sottoposto a rigorosi test statistici e controlli di robustezza prima di essere condiviso con i clienti.'
  },
  'aboutpage.values.innovation': {
    en: 'Constant Innovation',
    it: 'Innovazione Costante'
  },
  'aboutpage.values.innovation.desc': {
    en: 'We continuously invest in new methodologies and technologies to maintain a competitive advantage in quantitative analysis.',
    it: 'Investiamo continuamente in nuove metodologie e tecnologie per mantenere un vantaggio competitivo nell\'analisi quantitativa.'
  },
  'aboutpage.values.collaboration': {
    en: 'Collaboration',
    it: 'Collaborazione'
  },
  'aboutpage.values.collaboration.desc': {
    en: 'We work closely with our clients to understand their specific needs and provide tailored solutions.',
    it: 'Lavoriamo a stretto contatto con i nostri clienti per comprendere le loro esigenze specifiche e fornire soluzioni personalizzate.'
  },
  'aboutpage.approach.title': {
    en: 'Our Approach',
    it: 'Il Nostro Approccio'
  },
  'aboutpage.approach.description': {
    en: 'We combine academic rigor, practical market experience, and cutting-edge technologies to generate unique insights and effective investment strategies.',
    it: 'Combiniamo rigore accademico, esperienza pratica di mercato e tecnologie all\'avanguardia per generare insight unici e strategie d\'investimento efficaci.'
  },
  'aboutpage.approach.feature1': {
    en: 'Analysis of financial and alternative big data',
    it: 'Analisi di big data finanziari e alternativi'
  },
  'aboutpage.approach.feature2': {
    en: 'Advanced statistical models and machine learning',
    it: 'Modelli statistici avanzati e machine learning'
  },
  'aboutpage.approach.feature3': {
    en: 'Rigorous backtesting across different market regimes',
    it: 'Backtesting rigoroso su diversi regimi di mercato'
  },
  'aboutpage.approach.feature4': {
    en: 'Practical implementation with production-ready code',
    it: 'Implementazione pratica con codice produzione-ready'
  },
  'aboutpage.approach.feature5': {
    en: 'Ongoing consulting and implementation support',
    it: 'Consulenza continua e supporto all\'implementazione'
  },
  
  // Contact Page
  'contact.title': {
    en: 'Contact Us',
    it: 'Contattaci'
  },
  'contact.description': {
    en: 'We are available to discuss your advanced financial research needs and how we can support your investment decisions.',
    it: 'Siamo a disposizione per discutere le tue esigenze di ricerca finanziaria avanzata e come possiamo supportare le tue decisioni d\'investimento.'
  },
  'contact.info.address': {
    en: 'Address',
    it: 'Indirizzo'
  },
  'contact.info.email': {
    en: 'Email',
    it: 'Email'
  },
  'contact.info.phone': {
    en: 'Phone',
    it: 'Telefono'
  },
  'contact.form.title': {
    en: 'Send us a message',
    it: 'Inviaci un messaggio'
  },
  'contact.form.firstname': {
    en: 'First Name',
    it: 'Nome'
  },
  'contact.form.lastname': {
    en: 'Last Name',
    it: 'Cognome'
  },
  'contact.form.email': {
    en: 'Email',
    it: 'Email'
  },
  'contact.form.company': {
    en: 'Company (optional)',
    it: 'Azienda (opzionale)'
  },
  'contact.form.phone': {
    en: 'Phone (optional)',
    it: 'Telefono (opzionale)'
  },
  'contact.form.inquiry': {
    en: 'Inquiry Type',
    it: 'Tipo di richiesta'
  },
  'contact.form.message': {
    en: 'Message',
    it: 'Messaggio'
  },
  'contact.form.privacy': {
    en: 'I agree to the privacy policy',
    it: 'Accetto la privacy policy'
  },
  'contact.form.send': {
    en: 'Send Message',
    it: 'Invia Messaggio'
  },
  'contact.form.sending': {
    en: 'Sending...',
    it: 'Invio in corso...'
  },
  'contact.form.success': {
    en: 'Request sent',
    it: 'Richiesta inviata'
  },
  'contact.form.success.description': {
    en: 'Thank you for contacting us. We will respond as soon as possible.',
    it: 'Grazie per averci contattato. Ti risponderemo al più presto.'
  },
  'contact.form.error': {
    en: 'Error',
    it: 'Errore'
  },
  'contact.form.error.description': {
    en: 'An error occurred while sending the request. Please try again later.',
    it: 'Si è verificato un errore nell\'invio della richiesta. Riprova più tardi.'
  },
  'contact.form.validation.firstname': {
    en: 'First name must have at least 2 characters',
    it: 'Il nome deve avere almeno 2 caratteri'
  },
  'contact.form.validation.lastname': {
    en: 'Last name must have at least 2 characters',
    it: 'Il cognome deve avere almeno 2 caratteri'
  },
  'contact.form.validation.email': {
    en: 'Invalid email',
    it: 'Email non valida'
  },
  'contact.form.validation.message': {
    en: 'Message must have at least 10 characters',
    it: 'Il messaggio deve avere almeno 10 caratteri'
  },
  'contact.form.validation.privacy': {
    en: 'You must accept the privacy policy',
    it: 'Devi accettare la privacy policy'
  },
  'contact.form.inquiryType.general': {
    en: 'General Information',
    it: 'Informazioni Generali'
  },
  'contact.form.inquiryType.services': {
    en: 'Research Services',
    it: 'Servizi di Ricerca'
  },
  'contact.form.inquiryType.partnership': {
    en: 'Partnership Opportunities',
    it: 'Opportunità di Partnership'
  },
  'contact.form.inquiryType.support': {
    en: 'Technical Support',
    it: 'Supporto Tecnico'
  },
  
  // Additional Research Page keys
  'research.viewAllBtn': {
    en: 'View All Research',
    it: 'Vedi Tutte le Ricerche'
  },
  'research.viewCategoryBtn': {
    en: 'View Category',
    it: 'Vedi Categoria'
  },
  'research.reports': {
    en: 'Reports',
    it: 'Rapporti'
  },
  'research.featuredPapers': {
    en: 'Featured Research Papers',
    it: 'Articoli di Ricerca in Evidenza'
  },
  'research.readMore': {
    en: 'Read More',
    it: 'Leggi di Più'
  },
  'research.researchCategories': {
    en: 'Research Categories',
    it: 'Categorie di Ricerca'
  },
  'research.researchReports': {
    en: 'Research Reports',
    it: 'Rapporti di Ricerca'
  },
  'research.viewPapers': {
    en: 'View Papers',
    it: 'Vedi Articoli'
  },
  'research.customTitle': {
    en: 'Custom Research',
    it: 'Ricerche Personalizzate'
  },
  'research.customDescription': {
    en: 'In addition to our regular research, we offer customized research projects for specific needs.',
    it: 'Oltre alle nostre ricerche regolari, offriamo progetti di ricerca su misura per esigenze specifiche.'
  },
  'research.customFeature1': {
    en: 'Detailed analysis of specific sectors or assets',
    it: 'Analisi dettagliata di settori o asset specifici'
  },
  'research.customFeature2': {
    en: 'Development of exclusive proprietary models',
    it: 'Sviluppo di modelli proprietari esclusivi'
  },
  'research.customFeature3': {
    en: 'Backtesting of proprietary strategies',
    it: 'Backtesting di strategie proprietarie'
  },
  'research.customFeature4': {
    en: 'Implementation consulting',
    it: 'Consulenza per l\'implementazione'
  },
  'research.requestInfo': {
    en: 'Request Information',
    it: 'Richiedi informazioni'
  },
  'research.contactUs': {
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