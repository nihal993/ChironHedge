// Sample chart data for various components

// Market data (months)
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// GDP Growth data
export const gdpGrowthData = [3.2, 3.1, 3.0, 3.2, 3.5, 3.3, 3.1, 2.9, 2.7, 2.6, 2.5, 2.4];

// Inflation data
export const inflationData = [2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.4, 2.5, 2.6, 2.5, 2.4, 2.3];

// Market performance
export const marketPerformance = [
  [2.4, 2.7, 3.0, 3.5, 3.8, 4.1, 3.8, 3.5, 3.2, 3.5, 3.8, 4.0], // US
  [1.8, 1.5, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 2.4, 2.1, 2.4, 2.7], // Europe
  [4.0, 4.3, 4.6, 4.9, 5.2, 5.0, 4.7, 4.4, 4.7, 5.0, 5.3, 5.6]  // Asia
];

// Volatility data
export const volatilityData = [18, 16, 14, 12, 15, 18, 20, 22, 18, 15, 13, 16];

// Interest rates
export const interestRateData = [4.5, 4.5, 4.5, 4.5, 4.25, 4.25, 4.0, 4.0, 3.75, 3.75, 3.5, 3.5];

// Asset correlation heatmap
export const correlationData = [
  { name: 'US Equities', data: [1.0, 0.7, 0.5, 0.3, -0.2, 0.1] },
  { name: 'EU Equities', data: [0.7, 1.0, 0.6, 0.2, -0.1, 0.1] },
  { name: 'EM Equities', data: [0.5, 0.6, 1.0, 0.1, 0.0, 0.2] },
  { name: 'US Bonds', data: [0.3, 0.2, 0.1, 1.0, 0.8, 0.4] },
  { name: 'EU Bonds', data: [-0.2, -0.1, 0.0, 0.8, 1.0, 0.3] },
  { name: 'Gold', data: [0.1, 0.1, 0.2, 0.4, 0.3, 1.0] }
];

export const assetClasses = ['US Equities', 'EU Equities', 'EM Equities', 'US Bonds', 'EU Bonds', 'Gold'];

// Factor performance
export const factorPerformance = [
  { name: 'Value', data: [5.2, 4.8, 4.1, 3.8, 4.2, 4.8, 5.2, 5.6, 5.2, 4.8, 5.2, 5.6] },
  { name: 'Growth', data: [3.8, 4.2, 4.8, 5.2, 5.6, 5.2, 4.8, 4.2, 3.8, 4.2, 4.6, 5.0] },
  { name: 'Momentum', data: [4.5, 5.0, 5.5, 6.0, 5.5, 5.0, 4.5, 5.0, 5.5, 6.0, 5.5, 5.0] },
  { name: 'Quality', data: [4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 5.2, 5.0, 4.8, 4.5, 4.2] }
];

// Portfolio metrics
export const portfolioMetrics = [8.5, 7.2, 6.5, 5.8, 4.2, 6.2];
export const metricLabels = ['Return', 'Volatility', 'Sharpe', 'Max DD', 'Sortino', 'Info Ratio'];

// Economic surprises
export const economicSurpriseData = [-0.2, 0.3, 0.5, 0.2, -0.1, -0.3, -0.5, -0.3, 0.0, 0.2, 0.4, 0.6];

// Sector performance
export const sectorPerformanceData = [
  { name: 'Tech', data: [12.5] },
  { name: 'Health', data: [8.2] },
  { name: 'Finance', data: [5.1] },
  { name: 'Energy', data: [3.2] },
  { name: 'Utilities', data: [1.5] },
  { name: 'Real Estate', data: [-2.3] },
  { name: 'Consumer', data: [4.6] }
];