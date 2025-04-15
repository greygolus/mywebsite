import CountdownTimer from '@/components/ui/countdown-timer';
import { Link } from 'wouter';
import { Calculator, BookOpen, Zap } from 'lucide-react';

const Home = () => {
  const targetDate = new Date('April 28, 2025 11:50:00');
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">greygolus.com</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 text-lg mb-8">
                greygolus.com is a personal and academic site created by me, Grey Golus, focused on my personal projecs and my optics education. The Optics Unified section offers interactive calculators, visual references, and learning resources designed for optical engineering students and enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Countdown Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <CountdownTimer targetDate={targetDate} className="max-w-3xl mx-auto" />
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Optics Unified</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4">
                <Calculator className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Calculators</h3>
              <p className="text-gray-600">
                Convert between wavelength, energy, and frequency. Calculate critical angles, lens formulas, and more.
              </p>
              <div className="mt-4">
                <Link href="/directory#calculators" className="text-blue-500 hover:text-blue-700 font-medium">Explore calculators →</Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reference Materials</h3>
              <p className="text-gray-600">
                Comprehensive tables of symbols, constants, and formulas for optical engineering.
              </p>
              <div className="mt-4">
                <Link href="/reference" className="text-blue-500 hover:text-blue-700 font-medium">View references →</Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Educational Tools</h3>
              <p className="text-gray-600">
                Tools and guides built to help students explore and understand challenging optical principles through hands-on interaction.
              </p>
              <div className="mt-4">
                <Link href="/directory" className="text-blue-500 hover:text-blue-700 font-medium">Browse all tools →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
