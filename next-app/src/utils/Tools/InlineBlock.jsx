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
        className="bg-neutral-900 text-emerald-400 px-2 py-0.5 rounded font-mono text-sm cursor-pointer hover:bg-neutral-800 transition"
      >
        {text}
      </code>

      {copied && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-neutral-200 text-xs px-2 py-1 rounded shadow-md border border-neutral-700">
          Copied!
        </span>
      )}
    </span>
  );
}

export default InlineBlock;
