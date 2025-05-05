import React from 'react';
import { formatText } from './Formtter';
import { Table } from 'lucide-react';

function TableBlock({ headers, rows, title }) {
  const isNumericColumn = (colIndex) => {
    return rows.some(row => {
      const cell = row[colIndex];
      return !isNaN(Number(cell)) && cell !== '' && cell !== null && cell !== undefined;
    });
  };

  const numericColumns = headers?.map((_, index) => isNumericColumn(index));

  return (
    <div className="relative bg-black border border-neutral-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Header with gradient accent */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
        <div className="flex items-center px-5 py-3 bg-neutral-900/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Table size={18} className="text-neutral-400" />
            {title && (
              <h3 className="text-lg font-medium text-neutral-200 tracking-wide">
                {title}
              </h3>
            )}
          </div>
        </div>
      </div>

      {/* Table content */}
      <div className="px-4 py-4 bg-black">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {headers?.map((header, index) => (
                  <th 
                    key={index} 
                    className="py-3 px-4 text-left text-sm font-medium text-neutral-300 border-b-2 border-neutral-800"
                  >
                    {formatText(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors duration-150"
                >
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className={`py-3 px-4 text-sm text-neutral-300 ${
                        numericColumns[cellIndex] ? 'text-right tabular-nums' : ''
                      }`}
                    >
                      {formatText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer with subtle branding */}
      <div className="flex justify-end items-center py-2 px-4 bg-neutral-900/70 text-xs text-neutral-500">
        <span className="opacity-60 tracking-wide">Table Data</span>
      </div>
    </div>
  );
}

export default TableBlock;
