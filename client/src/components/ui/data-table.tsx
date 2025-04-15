import { useState, useEffect } from 'react';

interface Column {
  header: string;
  accessorKey: string;
  cell?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
}

const DataTable = ({ columns, data, className = '' }: DataTableProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`bg-dark-card rounded-xl shadow-xl overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-black bg-opacity-40">
            <tr>
              {columns.map((column, index) => {
                const isFirst = index === 0;
                const isLast = index === columns.length - 1;
                
                return (
                  <th 
                    key={index} 
                    className={`px-6 py-4 text-left font-medium text-white opacity-90 text-sm tracking-wider border-b border-dark-border ${
                      isFirst ? 'rounded-tl-xl' : ''
                    } ${
                      isLast ? 'rounded-tr-xl' : ''
                    }`}
                  >
                    <span className="gradient-text">{column.header}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="hover:bg-dark-hover transition-colors duration-150"
              >
                {columns.map((column, colIndex) => {
                  const isFirst = colIndex === 0;
                  const isLast = colIndex === columns.length - 1;
                  const isLastRow = rowIndex === data.length - 1;
                  
                  return (
                    <td 
                      key={colIndex} 
                      className={`px-6 py-4 whitespace-nowrap text-white ${
                        isFirst && isLastRow ? 'rounded-bl-xl' : ''
                      } ${
                        isLast && isLastRow ? 'rounded-br-xl' : ''
                      }`}
                    >
                      <div className={column.accessorKey === 'symbol' || column.accessorKey === 'formula' ? 'font-mono' : ''}>
                        {column.cell 
                          ? column.cell(row[column.accessorKey]) 
                          : row[column.accessorKey]
                        }
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
