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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Directory</h1>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Reference Materials Section */}
          <div id="references">
            <h2 className="text-2xl font-semibold mb-4">Reference Materials</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/reference#symbols" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Optical Symbols</h3>
                  <p className="text-sm text-gray-600">Common symbols used in optical formulas and notation</p>
                </Link>
                
                <Link href="/reference#constants" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Physical Constants</h3>
                  <p className="text-sm text-gray-600">Important constants used in optical calculations</p>
                </Link>
                
                <Link href="/reference#formulas" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Optical Formulas</h3>
                  <p className="text-sm text-gray-600">Essential equations for optical engineering</p>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Calculators Section */}
          <div id="calculators">
            <h2 className="text-2xl font-semibold mb-4">Interactive Calculators</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/calculators/wavelength-energy-frequency" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Wavelength ↔ Energy ↔ Frequency</h3>
                  <p className="text-sm text-gray-600">Convert between different properties of light</p>
                </Link>
                
                <Link href="/calculators/angle-calculator" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Snell's Law & Critical Angle</h3>
                  <p className="text-sm text-gray-600">Calculate refraction angles and critical angles for total internal reflection</p>
                </Link>
                
                <Link href="/calculators/lenses-mirrors" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Lens & Mirror Equation</h3>
                  <p className="text-sm text-gray-600">Calculate focal length, object and image distances</p>
                </Link>
                
                <Link href="/calculators/diffraction" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Diffraction Grating</h3>
                  <p className="text-sm text-gray-600">Calculate diffraction patterns and angles</p>
                </Link>
                
                <Link href="/calculators/power" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Optical & Electrical Power</h3>
                  <p className="text-sm text-gray-600">Calculate power relationships in optical systems</p>
                </Link>
                
                <Link href="/calculators/color-estimator" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h3 className="font-medium">Combined Color Estimator</h3>
                  <p className="text-sm text-gray-600">Estimate resulting colors from combined wavelengths</p>
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
