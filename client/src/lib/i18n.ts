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
    en: 'Research',
    it: 'Ricerca'
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
    en: 'Contact Us',
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
  },
  
  // Footer
  'footer.companyName': {
    en: 'ChironEdge',
    it: 'ChironEdge'
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
    en: '© ${year} ChironEdge Global Services Ltd. All rights reserved.',
    it: '© ${year} ChironEdge Global Services Ltd. Tutti i diritti riservati.'
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
    en: 'ChironEdge is a cutting-edge financial research firm, founded by a team of Italian engineers and economists specialized in quantitative analysis and financial markets.',
    it: 'ChironEdge è un\'azienda di ricerca finanziaria all\'avanguardia, fondata da un team di ingegneri ed economisti italiani specializzati in analisi quantitativa e mercati finanziari.'
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
  'strategies.explore': {
    en: 'Explore the strategy',
    it: 'Esplora la strategia'
  },
  'strategies.performance': {
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
    en: 'ChironEdge Strategies',
    it: 'Strategie ChironEdge'
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