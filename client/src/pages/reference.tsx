import { useEffect } from 'react';
import { useLocation } from 'wouter';
import DataTable from '@/components/ui/data-table';
import { SYMBOLS, CONSTANTS, FORMULAS } from '@/lib/constants';

const Reference = () => {
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
    setLocation(`/reference#${hash}`);
    
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const symbolColumns = [
    { header: 'Symbol', accessorKey: 'symbol' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Description', accessorKey: 'description' },
  ];

  const constantColumns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Symbol', accessorKey: 'symbol' },
    { 
      header: 'Value', 
      accessorKey: 'value',
      cell: (value: number) => (
        <span className="font-mono">
          {typeof value === 'number' ? value.toExponential(8) : value}
          {value.toString().includes('10') && <sup>{value.toString().split('10')[1]}</sup>}
        </span>
      )
    },
    { header: 'Units', accessorKey: 'units' },
  ];

  const formulaColumns = [
    { 
      header: 'Formula', 
      accessorKey: 'formula',
      cell: (value: string) => <span className="font-mono">{value}</span>
    },
    { header: 'What It Describes', accessorKey: 'description' },
    { 
      header: 'Variables', 
      accessorKey: 'variables',
      cell: (variables: Array<{ symbol: string, name: string }>) => (
        <div>
          {variables.map((variable, index) => (
            <span key={index}>
              <span className="font-mono">{variable.symbol}</span>: {variable.name}
              {index < variables.length - 1 && ', '}
            </span>
          ))}
        </div>
      )
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Optical Reference</h1>
        
        {/* Symbols Section */}
        <div id="symbols" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Optical Symbols</h2>
          <DataTable columns={symbolColumns} data={SYMBOLS} />
        </div>
        
        {/* Constants Section */}
        <div id="constants" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Physical Constants</h2>
          <DataTable columns={constantColumns} data={CONSTANTS.TABLE} />
        </div>
        
        {/* Formulas Section */}
        <div id="formulas">
          <h2 className="text-2xl font-semibold mb-4">Optical Formulas</h2>
          <DataTable columns={formulaColumns} data={FORMULAS} />
        </div>
      </div>
    </section>
  );
};

export default Reference;
