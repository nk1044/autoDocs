import React from 'react';
import { formatText } from '@/utils/Tools/Formtter';
import { List as ListIcon } from 'lucide-react';

function ListBlock({
  text = 'List',
  items = ['Item 1'],
  ordered = false
}) {
  return (
    <div className="relative dark:bg-neutral-900 bg-[#f8f5f1] border dark:border-neutral-800 border-[#d6c8b9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:border-neutral-700 hover:border-[#c2b3a2]">
      {/* Gradient top bar */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 dark:bg-gradient-to-r dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-gradient-to-r from-[#dfd4c7] via-[#d3c7b8] to-[#dfd4c7]" />
        <div className="flex items-center px-3 py-2 dark:bg-neutral-900 bg-[#f6f1eb] border-b dark:border-neutral-800 border-[#e0d8cd] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <ListIcon size={15} className="dark:text-neutral-400 text-[#7b3f00]" />
            {text && (
              <h3 className="text-md font-medium dark:text-orange-400 text-[#4a2d12] tracking-wide">
                {text}
              </h3>
            )}
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="px-6 py-4 dark:bg-black bg-[#f8f5f1] text-md dark:text-neutral-300 text-[#4a3b2c]">
        {ordered ? (
          <ol className="list-decimal list-inside space-y-1 marker:dark:text-neutral-500 marker:text-[#a08c74]">
            {items.map((item, index) => (
              <li key={index}>{formatText(item)}</li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc list-inside space-y-1 marker:dark:text-neutral-500 marker:text-[#a08c74]">
            {items.map((item, index) => (
              <li key={index}>{formatText(item)}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Branding */}
      <div className="flex justify-end items-center py-2 px-4 dark:bg-neutral-900 bg-[#f6f1eb] border-t dark:border-neutral-800 border-[#e0d8cd] text-xs dark:text-neutral-500 text-[#7b3f00]">
        <span className="opacity-60 tracking-wide">List Data</span>
      </div>
    </div>
  );
}

export default ListBlock;
