import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
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

  // Group formulas by category
  const formulaCategories = [...new Set(FORMULAS.map(f => f.category))];
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Optical Reference</h1>
        
        <div className="flex space-x-4 mb-8">
          <a 
            href="#symbols" 
            onClick={(e) => { e.preventDefault(); handleHashClick('symbols'); }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Symbols
          </a>
          <a 
            href="#constants" 
            onClick={(e) => { e.preventDefault(); handleHashClick('constants'); }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Constants
          </a>
          <a 
            href="#formulas" 
            onClick={(e) => { e.preventDefault(); handleHashClick('formulas'); }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Formulas
          </a>
        </div>
        
        {/* Symbols Section */}
        <div id="symbols" className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Optical Symbols</h2>
          <p className="text-gray-600 mb-4">
            Variables commonly used in optics and photonics formulas.
          </p>
          <DataTable columns={symbolColumns} data={SYMBOLS} className="rounded-lg border" />
        </div>
        
        {/* Constants Section */}
        <div id="constants" className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Physical Constants</h2>
          <p className="text-gray-600 mb-4">
            Fundamental constants used in optical physics and calculations.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <Switch 
              id="approximate-values" 
              checked={useApproxValues}
              onCheckedChange={setUseApproxValues}
            />
            <Label htmlFor="approximate-values">Use Approximate Values</Label>
          </div>
          
          <DataTable columns={constantColumns} data={CONSTANTS.TABLE} className="rounded-lg border" />
        </div>
        
        {/* Formulas Section */}
        <div id="formulas" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Optical Formulas</h2>
          <p className="text-gray-600 mb-4">
            Key equations used in optical engineering and physics, organized by category.
          </p>
          
          {formulaCategories.map((category) => {
            // Convert category name to URL-friendly format
            const calculatorPath = category.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
            
            return (
              <div key={category} className="mb-8">
                <Link 
                  href={`/calculators/${calculatorPath}`}
                  className="inline-block hover:text-blue-700 transition-colors"
                >
                  <h3 className="text-xl font-medium mb-3 text-blue-600">{category}</h3>
                </Link>
                <DataTable 
                  columns={formulaColumns} 
                  data={FORMULAS.filter(f => f.category === category)}
                  className="rounded-lg border mb-6" 
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reference;
