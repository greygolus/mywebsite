import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeDropdownTimer = useRef<NodeJS.Timeout | null>(null);

  // Add scroll listener to make navbar more transparent at the top
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const openDropdown = () => {
    if (closeDropdownTimer.current) {
      clearTimeout(closeDropdownTimer.current);
      closeDropdownTimer.current = null;
    }
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    // Delay closing to prevent accidental closure when moving diagonally
    closeDropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
      scrolled ? 'bg-black bg-opacity-80 shadow-lg' : 'bg-black bg-opacity-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold gradient-text">Grey Golus</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className={`px-3 py-2 transition-all duration-300 ${
              location === '/' 
                ? 'gradient-text font-medium' 
                : 'text-white hover:text-opacity-80'
            }`}>
              Home
            </Link>
            
            <Link href="/countdown" className={`px-3 py-2 transition-all duration-300 ${
              location === '/countdown' 
                ? 'gradient-text font-medium' 
                : 'text-white hover:text-opacity-80'
            }`}>
              Countdown
            </Link>
            
            <div className="relative group">
              <button 
                className={`relative px-3 py-2 transition-all duration-300 focus:outline-none flex items-center space-x-1 ${
                  location.startsWith('/directory') || location.startsWith('/reference')
                    ? 'gradient-text font-medium' 
                    : 'text-white hover:text-opacity-80'
                }`}
                style={{
                  zIndex: isDropdownOpen ? 50 : 'auto'
                }}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <span>Personal Projects</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`absolute bg-black/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg w-48 transition-all duration-300 ease-in-out overflow-hidden ${
                  isDropdownOpen ? 'opacity-100 translate-y-0 block' : 'opacity-0 -translate-y-1 hidden'
                }`}
                style={{ 
                  top: 'calc(100% + 0.5rem)',  // Position at the bottom of the navbar with a small gap
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link 
                  href="/unified-optics" 
                  className="block px-4 py-2 text-white hover:bg-white/20 transition-all duration-300 ease-in-out rounded-md m-1"
                >
                  Optics Unified
                </Link>
                <span className="block px-4 py-2 text-gray-300 cursor-default m-1">Coming soon...</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-glow-purple focus:outline-none transition-colors duration-300"
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
        <div className="md:hidden bg-black/5 backdrop-blur-xl border-t border-white/10 shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${
                location === '/' 
                  ? 'gradient-text font-medium' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Home
            </Link>
            
            <Link 
              href="/countdown" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${
                location === '/countdown' 
                  ? 'gradient-text font-medium' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Countdown
            </Link>
            
            {/* Mobile dropdown */}
            <div>
              <button 
                onClick={toggleDropdown}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${
                  location.startsWith('/directory') || location.startsWith('/reference')
                    ? 'gradient-text font-medium' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span>Personal Projects</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1 animate-fade-in bg-black/5 backdrop-blur-xl rounded-md mx-2 border border-white/10 shadow-inner">
                  <Link 
                    href="/unified-optics" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-white hover:bg-white/20 rounded-md transition-all duration-300 ease-in-out"
                  >
                    Optics Unified
                  </Link>
                  <span className="block px-3 py-2 text-gray-300">Coming soon...</span>
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
