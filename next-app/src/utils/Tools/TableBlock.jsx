import React from 'react';
import { formatText } from '@/utils/Tools/Formtter';
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
    <div className="relative dark:bg-black bg-[#f8f5f1] border dark:border-neutral-800 border-[#d6c8b9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:border-neutral-700 hover:border-[#c2b3a2]">
      {/* Header with gradient accent */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 dark:bg-gradient-to-r dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-gradient-to-r from-[#dfd4c7] via-[#d3c7b8] to-[#dfd4c7]" />
        <div className="flex items-center px-5 py-3 dark:bg-neutral-900/90 bg-[#f6f1eb] border-b dark:border-neutral-800 border-[#e0d8cd] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Table size={18} className="dark:text-neutral-400 text-[#7b3f00]" />
            {title && (
              <h3 className="text-lg font-medium dark:text-neutral-200 text-[#4a2d12] tracking-wide">
                {title}
              </h3>
            )}
          </div>
        </div>
      </div>

      {/* Table content */}
      <div className="px-4 py-4 dark:bg-black bg-[#f8f5f1]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {headers?.map((header, index) => (
                  <th 
                    key={index} 
                    className="py-3 px-4 text-left text-sm font-medium dark:text-neutral-300 text-[#5a4634] dark:border-b-2 dark:border-neutral-800 border-b-2 border-[#e1d7cc]"
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
                  className="dark:border-b dark:border-neutral-800/60 border-b border-[#e7ddd1] hover:dark:bg-neutral-900/40 hover:bg-[#ede6dd] transition-colors duration-150"
                >
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className={`py-3 px-4 text-sm dark:text-neutral-300 text-[#4a3b2c] ${
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
      <div className="flex justify-end items-center py-2 px-4 dark:bg-neutral-900/70 bg-[#f6f1eb] border-t dark:border-neutral-800 border-[#e0d8cd] text-xs dark:text-neutral-500 text-[#7b3f00]">
        <span className="opacity-60 tracking-wide">Table Data</span>
      </div>
    </div>
  );
}

export default TableBlock;
