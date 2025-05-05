import React from 'react';
import { formatText } from './Formtter.jsx';
import { List as ListIcon } from 'lucide-react';

function ListBlock({
  text = 'List',
  items = ['Item 1'],
  ordered = false
}) {
  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Gradient top bar */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
        <div className="flex items-center px-5 py-3 bg-neutral-900 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <ListIcon size={18} className="text-neutral-400" />
            {text && (
              <h3 className="text-lg font-medium text-orange-400 tracking-wide">
                {text}
              </h3>
            )}
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="px-6 py-4 bg-black text-sm text-neutral-300">
        {ordered ? (
          <ol className="list-decimal list-inside space-y-1 marker:text-neutral-500">
            {items.map((item, index) => (
              <li key={index}>{formatText(item)}</li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc list-inside space-y-1 marker:text-neutral-500">
            {items.map((item, index) => (
              <li key={index}>{formatText(item)}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Branding */}
      <div className="flex justify-end items-center py-2 px-4 bg-neutral-900 text-xs text-neutral-500">
        <span className="opacity-60 tracking-wide">List Data</span>
      </div>
    </div>
  );
}

export default ListBlock;
