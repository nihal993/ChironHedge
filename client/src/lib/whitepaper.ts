// Traduzioni per il contenuto del whitepaper

export interface WhitePaperTranslations {
  [key: string]: {
    en: string;
    it: string;
  };
}

export const whitepaper: WhitePaperTranslations = {
  title: {
    en: "Beyond Mean-Variance: building robust allocatives architectures",
    it: "Oltre la media-varianza: la creazione di architetture allocative robuste"
  },
  publishedDate: {
    en: "Published: May 27, 2025",
    it: "Pubblicato: 27 Maggio 2025"
  },
  authors: {
    en: "Federico Ciaralli, ChironEdge Research CFO",
    it: "Federico Ciaralli, CFO di ChironEdge Research"
  },
  summaryTitle: {
    en: "Executive Summary",
    it: "Sommario Esecutivo"
  },
  summaryPara1: {
    en: "This research paper examines the performance of various factor-based investment strategies across different asset classes and market regimes. Using proprietary quantitative models, we investigate how value, momentum, quality, and low volatility factors contribute to alpha generation in a multi-asset portfolio context.",
    it: "Questo documento di ricerca esamina la performance di varie strategie di investimento basate su fattori tra diverse classi di attività e regimi di mercato. Utilizzando modelli quantitativi proprietari, investighiamo come i fattori di valore, momentum, qualità e bassa volatilità contribuiscono alla generazione di alpha in un contesto di portafoglio multi-asset."
  },
  summaryPara2: {
    en: "Our analysis demonstrates that factor performance exhibits significant cyclicality, with different factors outperforming in specific macroeconomic environments. The research indicates that a dynamic allocation approach to factor investing can substantially enhance risk-adjusted returns compared to static allocations.",
    it: "La nostra analisi dimostra che la performance dei fattori presenta una significativa ciclicità, con diversi fattori che sovraperformano in specifici ambienti macroeconomici. La ricerca indica che un approccio di allocazione dinamica all'investimento fattoriale può migliorare sostanzialmente i rendimenti corretti per il rischio rispetto alle allocazioni statiche."
  },
  keyQuote: {
    en: "Factor premia are not static rewards but dynamic opportunities that evolve with changing economic conditions and market sentiment.",
    it: "I premi di fattore non sono ricompense statiche ma opportunità dinamiche che si evolvono con il cambiamento delle condizioni economiche e del sentiment di mercato."
  },
  summaryPara3: {
    en: "The study further explores how machine learning techniques can be employed to forecast factor performance and optimize factor timing. Our backtests covering the period from 2000 to 2024 demonstrate that ML-enhanced factor rotation strategies significantly outperform traditional approaches.",
    it: "Lo studio esplora inoltre come le tecniche di machine learning possano essere impiegate per prevedere la performance dei fattori e ottimizzare il timing fattoriale. I nostri backtest che coprono il periodo dal 2000 al 2024 dimostrano che le strategie di rotazione fattoriale potenziate dal ML superano significativamente gli approcci tradizionali."
  },
  keyFindings: {
    en: "Key Findings",
    it: "Risultati Principali"
  },
  finding1: {
    en: "Factor performance shows strong correlation with specific macroeconomic indicators, particularly inflation rates, economic growth momentum, and central bank policy directions.",
    it: "La performance dei fattori mostra una forte correlazione con specifici indicatori macroeconomici, in particolare tassi di inflazione, momentum della crescita economica e direzioni della politica delle banche centrali."
  },
  finding2: {
    en: "Value factor strategies tend to outperform during economic recovery phases, while quality and low volatility factors excel during economic slowdowns.",
    it: "Le strategie basate sul fattore valore tendono a sovraperformare durante le fasi di ripresa economica, mentre i fattori qualità e bassa volatilità eccellono durante i rallentamenti economici."
  },
  finding3: {
    en: "Multi-factor approaches that dynamically adjust factor weights based on macroeconomic regime shifts achieved an average annualized alpha of 3.8% with a Sharpe ratio of 1.4.",
    it: "Gli approcci multi-fattoriali che adattano dinamicamente i pesi dei fattori in base ai cambiamenti di regime macroeconomico hanno raggiunto un alpha annualizzato medio del 3,8% con un rapporto di Sharpe di 1,4."
  },
  finding4: {
    en: "Machine learning algorithms demonstrated 68% accuracy in predicting factor rotation points, significantly improving timing decisions.",
    it: "Gli algoritmi di machine learning hanno dimostrato un'accuratezza del 68% nel prevedere i punti di rotazione fattoriale, migliorando significativamente le decisioni di timing."
  },
  conclusion: {
    en: "Conclusion",
    it: "Conclusione"
  },
  conclusionText: {
    en: "Our research validates the efficacy of a systematic, quantitative approach to factor investing across asset classes. The pronounced cyclicality of factor performance underscores the importance of dynamic allocation methodologies. We believe these findings have significant implications for institutional portfolio management, particularly for funds seeking to enhance returns while maintaining rigorous risk management standards.",
    it: "La nostra ricerca convalida l'efficacia di un approccio sistematico e quantitativo all'investimento fattoriale tra classi di attività. La pronunciata ciclicità della performance dei fattori sottolinea l'importanza delle metodologie di allocazione dinamica. Riteniamo che questi risultati abbiano implicazioni significative per la gestione di portafogli istituzionali, in particolare per i fondi che cercano di migliorare i rendimenti mantenendo rigorosi standard di gestione del rischio."
  },
  downloadTitle: {
    en: "Download Complete Research Paper",
    it: "Scarica il Documento di Ricerca Completo"
  },
  downloadDescription: {
    en: "Access the full 42-page research paper including detailed methodology, extensive data analysis, and complete backtesting results.",
    it: "Accedi al documento di ricerca completo di 42 pagine che include metodologia dettagliata, analisi approfondita dei dati e risultati completi di backtesting."
  },
  downloadButton: {
    en: "Download White Paper (PDF)",
    it: "Scarica White Paper (PDF)"
  },
  downloading: {
    en: "Downloading...",
    it: "Download in corso..."
  },
  downloadSuccess: {
    en: "The white paper download should begin shortly. If it doesn't start automatically, please check your browser settings.",
    it: "Il download del white paper dovrebbe iniziare a breve. Se non si avvia automaticamente, controlla le impostazioni del browser."
  }
};
