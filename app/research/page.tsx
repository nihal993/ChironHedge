import { Metadata } from 'next';
import ResearchClient from './ResearchClient';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Access comprehensive financial research, market analysis, and investment insights from ChironHedge',
  keywords: ['financial research', 'market analysis', 'investment research', 'equity research'],
};

export default function ResearchPage() {
  return <ResearchClient />;
}