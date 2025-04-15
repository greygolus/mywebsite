import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-70 text-white py-16 border-t border-dark-border mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="gradient-text text-xl font-semibold mb-4">greygolus.com</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A personal and academic site focused on optics education and tools.
            </p>
          </div>
          
          <div>
            <h3 className="gradient-text text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="/reference" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Reference
                </Link>
              </li>
              <li>
                <Link href="/calculators/wavelength-energy-frequency" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="gradient-text text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://github.com/greygolus/greygolus" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link href="/reference#formulas" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Optical Formulas
                </Link>
              </li>
              <li>
                <Link href="/reference#constants" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Physical Constants
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-dark-border text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Grey Golus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
