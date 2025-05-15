import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import NewsAI from "@/pages/NewsAI";
import QuantitativeModel from "@/pages/QuantitativeModel";
import MarketsInsight from "@/pages/MarketsInsight";
import OurResearch from "@/pages/OurResearch";
import MacroReport from "@/pages/MacroReport";
import QuantitativeStrategies from "@/pages/QuantitativeStrategies";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import AboutUs from "@/pages/AboutUs";
import { LanguageProvider } from "@/contexts/LanguageContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/news-ai" component={NewsAI} />
      <Route path="/quantitative-model" component={QuantitativeModel} />
      <Route path="/markets-insight" component={MarketsInsight} />
      <Route path="/our-research" component={OurResearch} />
      <Route path="/macro-report" component={MacroReport} />
      <Route path="/quantitative-strategies" component={QuantitativeStrategies} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={AboutUs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <LanguageProvider>
        <Layout>
          <Router />
        </Layout>
      </LanguageProvider>
    </TooltipProvider>
  );
}

export default App;
