import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const Directory = () => {
  const [, setLocation] = useLocation();

  // Function to scroll to a specific element ID when the URL has a hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Handle hash navigation manually
  const handleHashClick = (hash: string) => {
    setLocation(`/directory#${hash}`);
    
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 gradient-text animate-fade-in">Directory</h1>
        
        <div className="grid grid-cols-1 gap-12 animate-fade-in-up">
          {/* Reference Materials Section */}
          <div id="references" className="animate-fade-in-up" style={{animationDelay: '100ms'}}>
            <h2 className="text-3xl font-bold mb-6 gradient-text">Reference Materials</h2>
            <div className="bg-dark-card rounded-xl shadow-xl border border-dark-border p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link 
                  href="/reference#symbols" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Optical Symbols</h3>
                  <p className="text-sm text-gray-300">Common symbols used in optical formulas and notation</p>
                </Link>
                
                <Link 
                  href="/reference#constants" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Physical Constants</h3>
                  <p className="text-sm text-gray-300">Important constants used in optical calculations</p>
                </Link>
                
                <Link 
                  href="/reference#formulas" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Optical Formulas</h3>
                  <p className="text-sm text-gray-300">Essential equations for optical engineering</p>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Calculators Section */}
          <div id="calculators" className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <h2 className="text-3xl font-bold mb-6 gradient-text">Interactive Calculators</h2>
            <div className="bg-dark-card rounded-xl shadow-xl border border-dark-border p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link 
                  href="/calculators/wavelength-energy-frequency" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Wavelength ↔ Energy ↔ Frequency</h3>
                  <p className="text-sm text-gray-300">Convert between different properties of light</p>
                </Link>
                
                <Link 
                  href="/calculators/angle-calculator" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Snell's Law & Critical Angle</h3>
                  <p className="text-sm text-gray-300">Calculate refraction angles and critical angles for total internal reflection</p>
                </Link>
                
                <Link 
                  href="/calculators/lenses-mirrors" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Lens & Mirror Equation</h3>
                  <p className="text-sm text-gray-300">Calculate focal length, object and image distances</p>
                </Link>
                
                <Link 
                  href="/calculators/diffraction" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Diffraction Grating</h3>
                  <p className="text-sm text-gray-300">Calculate diffraction patterns and angles</p>
                </Link>
                
                <Link 
                  href="/calculators/power" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Optical & Electrical Power</h3>
                  <p className="text-sm text-gray-300">Calculate power relationships in optical systems</p>
                </Link>
                
                <Link 
                  href="/calculators/color-estimator" 
                  className="p-5 border border-dark-border rounded-xl hover:bg-dark-hover transition-all duration-300 hover:scale-102 hover:shadow-lg"
                >
                  <h3 className="font-medium text-white mb-2">Combined Color Estimator</h3>
                  <p className="text-sm text-gray-300">Estimate resulting colors from combined wavelengths</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Directory;
