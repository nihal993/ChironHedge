import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Research from "@/pages/Research";
import Insights from "@/pages/Insights";
import Strategies from "@/pages/Strategies";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chi-siamo" component={AboutUs} />
      <Route path="/ricerche" component={Research} />
      <Route path="/insights" component={Insights} />
      <Route path="/strategie" component={Strategies} />
      <Route path="/contatti" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Layout>
        <Router />
      </Layout>
    </TooltipProvider>
  );
}

export default App;
