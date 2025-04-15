import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-blue-500">Greygolus.com</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className={`px-3 py-2 ${location === '/' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors`}>
              Home
            </Link>
            
            <div className="relative group">
              <button className={`px-3 py-2 ${location.startsWith('/directory') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors focus:outline-none flex items-center space-x-1`}>
                <span>Directory</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute hidden mt-2 bg-white shadow-lg rounded-md w-48 group-hover:block">
                <Link href="/directory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">All Tools</Link>
                <Link href="/directory#calculators" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Calculators</Link>
                <Link href="/directory#references" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Reference Materials</Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className={`px-3 py-2 ${location.startsWith('/reference') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors focus:outline-none flex items-center space-x-1`}>
                <span>Reference</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute hidden mt-2 bg-white shadow-lg rounded-md w-48 group-hover:block">
                <Link href="/reference#symbols" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Symbols</Link>
                <Link href="/reference#constants" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Constants</Link>
                <Link href="/reference#formulas" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Formulas</Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className={`px-3 py-2 ${location.startsWith('/calculators') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors focus:outline-none flex items-center space-x-1`}>
                <span>Calculators</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute hidden mt-2 bg-white shadow-lg rounded-md w-60 group-hover:block">
                <Link href="/calculators/wavelength-energy-frequency" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wavelength ↔ Energy ↔ Frequency</Link>
                <Link href="/calculators/snells-law" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Snell's Law</Link>
                <Link href="/calculators/critical-angle" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Critical Angle</Link>
                <Link href="/calculators/lenses-mirrors" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lenses/Mirrors</Link>
                <Link href="/calculators/diffraction" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Diffraction</Link>
                <Link href="/calculators/power" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Power</Link>
                <Link href="/calculators/color-estimator" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Combined Color Estimator</Link>
              </div>
            </div>
            
            <Link href="/countdown" className={`px-3 py-2 ${location === '/countdown' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors`}>
              Countdown
            </Link>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Home</Link>
            <Link href="/directory" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Directory</Link>
            <Link href="/reference" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Reference</Link>
            <Link href="/calculators/wavelength-energy-frequency" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Calculators</Link>
            <Link href="/countdown" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Countdown</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
