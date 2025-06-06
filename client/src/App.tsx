import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Preloader from "@/components/ui/preloader";
import Home from "@/pages/home";
import Directory from "@/pages/directory";
import Reference from "@/pages/reference";
import Countdown from "@/pages/countdown";
import UnifiedOptics from "@/pages/unified-optics";
import WavelengthEnergyFrequency from "@/pages/calculators/wavelength-energy-frequency";
import SnellsLaw from "@/pages/calculators/snells-law";
import CriticalAngle from "@/pages/calculators/critical-angle";
import AngleCalculator from "@/pages/calculators/angle-calculator";
import LensesMirrors from "@/pages/calculators/lenses-mirrors";
import Diffraction from "@/pages/calculators/diffraction";
import Power from "@/pages/calculators/power";
import ColorEstimator from "@/pages/calculators/color-estimator";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/directory" component={Directory} />
      <Route path="/reference" component={Reference} />
      <Route path="/countdown" component={Countdown} />
      <Route path="/unified-optics" component={UnifiedOptics} />
      <Route path="/calculators/wavelength-energy-frequency" component={WavelengthEnergyFrequency} />
      <Route path="/calculators/snells-law" component={SnellsLaw} />
      <Route path="/calculators/critical-angle" component={CriticalAngle} />
      <Route path="/calculators/angle-calculator" component={AngleCalculator} />
      <Route path="/calculators/lenses-mirrors" component={LensesMirrors} />
      <Route path="/calculators/diffraction" component={Diffraction} />
      <Route path="/calculators/power" component={Power} />
      <Route path="/calculators/color-estimator" component={ColorEstimator} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // State to track if the app is ready after preloading
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Track current location to add a class to body when on homepage
  const [location] = useLocation();
  
  useEffect(() => {
    // Add specific class for pages that need special CSS handling
    if (location === "/" || location === "/unified-optics") {
      document.body.classList.add('home-page');
    } else {
      document.body.classList.remove('home-page');
    }
  }, [location]);

  // Handle preloader completion
  const handleLoadComplete = () => {
    setIsLoaded(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* Preloader */}
      <Preloader onLoadComplete={handleLoadComplete} />
      
      {/* Main app */}
      <div className="flex flex-col min-h-screen bg-dark-background">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
