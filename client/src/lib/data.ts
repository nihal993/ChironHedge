export interface ResearchCategory {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reportsCount: number;
}

export interface MarketInsight {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
}

export interface StrategyPerformance {
  id: string;
  title: string;
  description: string;
  icon: string;
  performance: string;
  chartDataset: number[];
  labels: string[];
}

export const researchCategories: ResearchCategory[] = [
  {
    id: "macro",
    title: "Macro Analysis",
    description: "Valutazioni tempestive sui principali trend macroeconomici e il loro impatto sui mercati globali.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Mathematical financial models",
    reportsCount: 20
  },
  {
    id: "volatility",
    title: "Volatilità",
    description: "Modelli proprietari di previsione della volatilità e strategie di trading relative.",
    imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Volatility visualization",
    reportsCount: 15
  },
  {
    id: "credit",
    title: "Credit Research",
    description: "Analisi approfondite sui mercati del credito con focus su pricing relativo e anomalie.",
    imageSrc: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Credit market data visualization",
    reportsCount: 18
  },
  {
    id: "equity",
    title: "Equity Factors",
    description: "Ricerche sui fattori azionari, dalla value al momentum, con applicazioni pratiche.",
    imageSrc: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Equity factor models",
    reportsCount: 25
  },
  {
    id: "fixed-income",
    title: "Fixed Income Strategies",
    description: "Strategie di trading e investimento sui mercati obbligazionari globali.",
    imageSrc: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Fixed income strategy models",
    reportsCount: 22
  },
  {
    id: "alternative-data",
    title: "Alternative Data",
    description: "Sfruttamento di dataset non convenzionali per generare alpha nei mercati finanziari.",
    imageSrc: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
    imageAlt: "Alternative data visualization",
    reportsCount: 12
  }
];

export const marketInsights: MarketInsight[] = [
  {
    id: "insight-1",
    title: "Impatto dell'inflazione sui mercati emergenti",
    description: "Un'analisi dettagliata di come le pressioni inflazionistiche globali stiano influenzando le economie emergenti e le opportunità d'investimento relative.",
    type: "Analisi Settimanale",
    date: "15 Maggio 2023"
  },
  {
    id: "insight-2",
    title: "La decorrelazione delle criptovalute",
    description: "Studio quantitativo sulle evoluzioni delle correlazioni tra asset digitali e mercati tradizionali, con implicazioni per la costruzione di portafoglio.",
    type: "Studio Speciale",
    date: "2 Maggio 2023"
  },
  {
    id: "insight-3",
    title: "Trend strutturali nei mercati energetici",
    description: "Una prospettiva di lungo termine sui cambiamenti strutturali nel settore energetico e le implicazioni per investitori istituzionali.",
    type: "Analisi Mensile",
    date: "28 Aprile 2023"
  }
];

export const strategies: StrategyPerformance[] = [
  {
    id: "factor-based",
    title: "Factor-Based Investment",
    description: "Strategie basate su fattori sistematici di rischio-rendimento, ottimizzate per diversi regimi di mercato e classi di attività.",
    icon: "chart-line",
    performance: "+8.4%",
    chartDataset: [30, 40, 35, 50, 49, 60, 70, 91, 86, 75, 80],
    labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov"]
  },
  {
    id: "machine-learning",
    title: "Machine Learning Alpha",
    description: "Algoritmi di apprendimento automatico per identificare inefficienze di mercato a breve termine e pattern nascosti nei dati finanziari.",
    icon: "robot",
    performance: "+12.7%",
    chartDataset: [25, 35, 40, 30, 45, 55, 40, 60, 75, 80, 85],
    labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov"]
  }
];
