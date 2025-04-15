import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-blue-500">Grey Golus</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className={`px-3 py-2 ${location === '/' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors`}>
              Home
            </Link>
            
            <Link href="/countdown" className={`px-3 py-2 ${location === '/countdown' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors`}>
              Countdown
            </Link>
            
            <div className="relative group">
              <button 
                className={`px-3 py-2 ${location.startsWith('/directory') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors focus:outline-none flex items-center space-x-1`}
              >
                <span>Personal Projects</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute hidden mt-2 bg-white shadow-lg rounded-md w-48 group-hover:block">
                <Link href="/directory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Optics Unified</Link>
                <span className="block px-4 py-2 text-gray-400 cursor-default">Coming soon...</span>
              </div>
            </div>
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
            <Link href="/countdown" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Countdown</Link>
            
            {/* Mobile dropdown */}
            <div>
              <button 
                onClick={toggleDropdown}
                className="flex justify-between items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span>Personal Projects</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link 
                    href="/directory" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Optics Unified
                  </Link>
                  <span className="block px-3 py-2 text-gray-400">Coming soon...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
