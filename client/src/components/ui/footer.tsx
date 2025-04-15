import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">greygolus.com</h3>
            <p className="text-gray-300 text-sm">
              A personal and academic site focused on optics education and tools.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/directory" className="text-gray-300 hover:text-white">Directory</Link></li>
              <li><Link href="/reference" className="text-gray-300 hover:text-white">Reference</Link></li>
              <li><Link href="/calculators/wavelength-energy-frequency" className="text-gray-300 hover:text-white">Calculators</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/greygolus/greygolus" className="text-gray-300 hover:text-white">GitHub Repository</a></li>
              <li><Link href="/reference#formulas" className="text-gray-300 hover:text-white">Optical Formulas</Link></li>
              <li><Link href="/reference#constants" className="text-gray-300 hover:text-white">Physical Constants</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Grey Golus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
