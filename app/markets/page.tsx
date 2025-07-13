import { Metadata } from 'next';
import MarketsClient from './MarketsClient';

export const metadata: Metadata = {
  title: 'Market Insights',
  description: 'Real-time market data, analysis, and insights for global financial markets',
  keywords: ['market data', 'financial markets', 'real-time quotes', 'market analysis'],
};

export default function MarketsPage() {
  return <MarketsClient />;
}