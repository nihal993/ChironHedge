import { Metadata } from 'next';
import HomeClient from './components/HomeClient';

export const metadata: Metadata = {
  title: 'Home',
  description: 'ChironHedge Financial Research Platform - Advanced market intelligence and quantitative analysis',
};

export default function Home() {
  return <HomeClient />;
}