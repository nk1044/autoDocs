import React, { useState } from 'react';

function InlineBlock({ text }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span className="relative inline-block">
      <code
        onClick={copyToClipboard}
        className="cursor-pointer font-mono text-sm px-2 py-0.5 rounded transition
                   dark:bg-neutral-900 bg-[#f0e9df]
                   dark:hover:bg-neutral-800 hover:bg-[#e6ded2]
                   dark:text-emerald-400 text-[#005f56] border
                   dark:border-neutral-800 border-[#d6c8b9]"
      >
        {text}
      </code>

      {copied && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                         px-2 py-1 text-xs rounded shadow-md border
                         dark:bg-black bg-[#f6f1eb]
                         dark:text-neutral-200 text-[#4a2d12]
                         dark:border-neutral-700 border-[#e0d8cd]">
          Copied!
        </span>
      )}
    </span>
  );
}

export default InlineBlock;
