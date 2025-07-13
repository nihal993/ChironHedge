# ChironHedge Financial Research Platform

## Overview

ChironHedge is a sophisticated financial research and quantitative analysis platform designed for institutional investors and hedge funds. The application provides AI-powered financial news analysis, comprehensive market insights, quantitative research tools, and portfolio strategy development capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Chart.js and Recharts for financial data visualization
- **Animations**: Framer Motion for smooth transitions and interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Development**: Vite for development server with hot module replacement
- **Session Management**: Express sessions with PostgreSQL storage

### Build System
- **Development**: Vite dev server with TypeScript compilation
- **Production**: Vite build for frontend, esbuild for backend bundling
- **Asset Management**: Vite handles static assets and bundling

## Key Components

### 1. AI-Powered News Analysis
- Integration with OpenAI GPT models for financial news analysis
- Real-time financial news processing and summarization
- Rate limiting and error handling for AI API calls
- Multi-provider support (OpenAI, Claude)

### 2. Market Insights Dashboard
- Multi-timeframe data visualization (1M, 3M, 6M, YTD, 1Y, 3Y, 5Y, MAX)
- Categorized market data (Macro, Equity, Bond Market, Volatility, Commodities, Credit, Sentiment, Liquidity)
- Interactive charts with responsive design
- Real-time market data updates

### 3. Research Platform
- Categorized research papers and publications
- Multi-language support (English/Italian)
- PDF generation and download capabilities
- Advanced search and filtering

### 4. Quantitative Strategies
- Portfolio strategy backtesting and analysis
- Factor-based investment models
- Performance visualization and metrics
- Risk analysis tools

### 5. User Authentication System
- Login/Register functionality with form validation
- Session-based authentication
- Protected routes and user state management

### 6. Cookie Policy & Privacy Management
- GDPR-compliant cookie banner with customizable preferences
- Four cookie categories: Necessary, Analytics, Functional, Marketing
- Real-time cookie policy enforcement via CookieService
- Privacy settings page with detailed controls and status dashboard
- Persistent user preferences with localStorage integration
- Multi-language support for privacy content

## Data Flow

### Client-Server Communication
1. React frontend makes API requests using custom `apiRequest` utility
2. Express server handles requests with comprehensive logging
3. Data flows through React Query for caching and state management
4. Real-time updates via periodic polling for market data

### AI Integration Flow
1. User requests trigger AI analysis endpoints
2. Server proxies requests to external AI services (OpenAI/Claude)
3. Rate limiting prevents abuse
4. Processed results returned to client with caching

### Database Integration
- Drizzle ORM with PostgreSQL for data persistence
- Schema-first approach with type safety
- Migration management through Drizzle Kit
- Connection pooling with Neon Database

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React Router (Wouter), React Query
- **UI/Styling**: Radix UI, Tailwind CSS, Framer Motion
- **Database**: Drizzle ORM, PostgreSQL, Neon Database
- **AI Services**: OpenAI API integration
- **Charts**: Chart.js, Recharts, ApexCharts
- **Forms**: React Hook Form with Zod validation

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development server and build tool
- **ESBuild**: Production backend bundling
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Replit Environment
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Development**: `npm run dev` starts both frontend and backend
- **Production**: `npm run build` followed by `npm run start`
- **Port Configuration**: Internal port 5000, external port 80
- **Auto-scaling**: Configured for Replit's autoscale deployment

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend bundles to `dist` using esbuild
3. Static assets served by Express in production
4. Environment variables managed through Replit secrets

### Database Setup
- PostgreSQL database provisioned automatically
- Drizzle migrations run via `npm run db:push`
- Schema defined in `shared/schema.ts`
- Database URL configured via environment variables

## Changelog
- January 13, 2025. Implemented comprehensive cookie policy system with functional banner and privacy controls
- June 15, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.

## Communication Style

- Before implementing changes, explain what you're going to do and why
- Break down complex tasks into clear steps
- Ask for clarification if requirements are unclear
- Provide brief explanations for technical decisions