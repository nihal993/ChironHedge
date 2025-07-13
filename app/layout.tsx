import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers/Providers';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ChironHedge - Financial Research Platform',
    template: '%s | ChironHedge'
  },
  description: 'Advanced financial research and quantitative analysis platform for institutional investors',
  keywords: ['financial research', 'hedge fund', 'quantitative analysis', 'market intelligence'],
  authors: [{ name: 'ChironHedge' }],
  creator: 'ChironHedge',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'ChironHedge - Financial Research Platform',
    description: 'Advanced financial research and quantitative analysis platform for institutional investors',
    siteName: 'ChironHedge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChironHedge - Financial Research Platform',
    description: 'Advanced financial research and quantitative analysis platform for institutional investors',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}