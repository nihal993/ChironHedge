import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import NewsAI from "@/pages/NewsAI";
import MarketsInsight from "@/pages/MarketsInsight";
import QuantitativeStrategies from "@/pages/QuantitativeStrategies";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import AboutUs from "@/pages/AboutUs";
import WhitePaper from "@/pages/WhitePaper";
import Research from "@/pages/Research";
import DataScience from "@/pages/DataScience";
import Engineering from "@/pages/Engineering";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import AIChat from './components/AIChat';
import CookieBanner from './components/CookieBanner';


function Router() {
  const [location] = useLocation();
  
  // Scrollare all'inizio della pagina quando cambia la route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  // Routes che non usano il Layout (login/register)
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(location);
  
  if (isAuthRoute) {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
  
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/news-ai" component={NewsAI} />
        <Route path="/markets-insight" component={MarketsInsight} />
        <Route path="/research" component={Research} />
        <Route path="/research/data-science" component={DataScience} />
        <Route path="/research/engineering" component={Engineering} />
        <Route path="/quantitative-strategies" component={QuantitativeStrategies} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={AboutUs} />
        <Route path="/whitepaper" component={WhitePaper} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <LanguageProvider>
        <Router />
        <AIChat />
        <CookieBanner />
      </LanguageProvider>
    </TooltipProvider>
  );
}

export default App;
