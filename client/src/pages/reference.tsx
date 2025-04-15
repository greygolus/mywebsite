import { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import DataTable from '@/components/ui/data-table';
import { SYMBOLS, CONSTANTS, FORMULAS } from '@/lib/constants';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Reference = () => {
  const [, setLocation] = useLocation();
  const [useApproxValues, setUseApproxValues] = useState(false);

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
    setLocation(`/reference#${hash}`);
    
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Updated columns for symbols table
  const symbolColumns = [
    { header: 'Symbol', accessorKey: 'symbol' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Description', accessorKey: 'description' },
    { header: 'Units', accessorKey: 'units' },
    { header: 'SI Base Units', accessorKey: 'siBaseUnits' },
  ];

  // Updated columns for constants table
  const constantColumns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Symbol', accessorKey: 'symbol' },
    { 
      header: 'Value', 
      accessorKey: useApproxValues ? 'approxValue' : 'exactValue',
      cell: (value: string) => (
        <span className="font-mono whitespace-nowrap">{value}</span>
      )
    },
    { header: 'Units', accessorKey: 'units' },
    { header: 'SI Base Units', accessorKey: 'siBaseUnits' },
  ];

  // Updated columns for formulas table
  const formulaColumns = [
    { 
      header: 'Formula', 
      accessorKey: 'formula',
      cell: (value: string) => <span className="font-mono">{value}</span>
    },
    { header: 'What It Describes', accessorKey: 'description' },
    { header: 'Variables', accessorKey: 'variables' },
  ];

  // Extract unique categories
  const uniqueCategories = FORMULAS.reduce<string[]>((acc, formula) => {
    if (formula.category && !acc.includes(formula.category)) {
      acc.push(formula.category);
    }
    return acc;
  }, []);
  const formulaCategories = uniqueCategories;
  
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 gradient-text animate-fade-in">
          Optical Reference
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up">
          <button 
            onClick={(e) => { e.preventDefault(); handleHashClick('symbols'); }}
            className="gradient-border px-6 py-3 text-white rounded-full hover:scale-105 transition-all duration-300"
          >
            Symbols
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); handleHashClick('constants'); }}
            className="gradient-border px-6 py-3 text-white rounded-full hover:scale-105 transition-all duration-300"
          >
            Constants
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); handleHashClick('formulas'); }}
            className="gradient-border px-6 py-3 text-white rounded-full hover:scale-105 transition-all duration-300"
          >
            Formulas
          </button>
        </div>
        
        {/* Symbols Section */}
        <div id="symbols" className="mb-16 bg-dark-card p-8 rounded-xl shadow-xl border border-dark-border animate-fade-in-up" style={{animationDelay: '100ms'}}>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Optical Symbols</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Variables commonly used in optics and photonics formulas.
          </p>
          <div className="overflow-hidden rounded-xl border border-dark-border">
            <DataTable 
              columns={symbolColumns} 
              data={SYMBOLS} 
              className="rounded-xl" 
            />
          </div>
        </div>
        
        {/* Constants Section */}
        <div id="constants" className="mb-16 bg-dark-card p-8 rounded-xl shadow-xl border border-dark-border animate-fade-in-up" style={{animationDelay: '200ms'}}>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Physical Constants</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Fundamental constants used in optical physics and calculations.
          </p>
          
          <div className="flex items-center space-x-4 mb-6 bg-dark-hover p-4 rounded-lg inline-block">
            <Switch 
              id="approximate-values" 
              checked={useApproxValues}
              onCheckedChange={setUseApproxValues}
              className="data-[state=checked]:bg-glow-blue"
            />
            <Label htmlFor="approximate-values" className="text-white cursor-pointer">
              Use Approximate Values
            </Label>
          </div>
          
          <div className="overflow-hidden rounded-xl border border-dark-border">
            <DataTable 
              columns={constantColumns} 
              data={CONSTANTS.TABLE} 
              className="rounded-xl" 
            />
          </div>
        </div>
        
        {/* Formulas Section */}
        <div id="formulas" className="bg-dark-card p-8 rounded-xl shadow-xl border border-dark-border animate-fade-in-up" style={{animationDelay: '300ms'}}>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Optical Formulas</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Key equations used in optical engineering and physics, organized by category.
          </p>
          
          {formulaCategories.map((category, index) => {
            // Map categories to their respective calculator pages
            const calculatorLinkMap: Record<string, string> = {
              'Wave / Energy / Frequency': '/calculators/wavelength-energy-frequency',
              'Angles': '/calculators/angle-calculator',
              'Lenses & Mirrors': '/calculators/lenses-mirrors',
              'Diffraction / Interference': '/calculators/diffraction',
              'Efficiency / Power / Visibility': '/calculators/power'
            };
            
            const calculatorLink = calculatorLinkMap[category] || '';
            const animationDelay = 400 + (index * 100);
            
            return (
              <div 
                key={category} 
                className="mb-12 animate-fade-in-up" 
                style={{animationDelay: `${animationDelay}ms`}}
              >
                <h3 className="text-2xl font-semibold mb-5 p-0.5">
                  {calculatorLink ? (
                    <Link 
                      href={calculatorLink} 
                      className="gradient-text flex items-center gap-2 hover:underline transition-all duration-300"
                    >
                      {category}
                      <span className="text-white text-base bg-glow-blue rounded-full h-6 w-6 flex items-center justify-center">→</span>
                    </Link>
                  ) : (
                    <span className="gradient-text">{category}</span>
                  )}
                </h3>
                <div className="overflow-hidden rounded-xl border border-dark-border">
                  <DataTable 
                    columns={formulaColumns} 
                    data={FORMULAS.filter(f => f.category === category)}
                    className="rounded-xl" 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reference;
