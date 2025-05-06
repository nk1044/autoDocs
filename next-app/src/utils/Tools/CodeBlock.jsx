import React, { useState, useEffect } from 'react';
import { Copy, Check, Code } from 'lucide-react';

// Import syntax highlighter with dynamic loading to avoid hydration issues
const CodeBlock = ({ code, language = "javascript" }) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState(null);
  const [codeStyle, setCodeStyle] = useState(null);

  // Only load the syntax highlighter on the client side
  useEffect(() => {
    const loadHighlighter = async () => {
      const SyntaxHighlighterModule = await import('react-syntax-highlighter');
      const styleModule = await import('react-syntax-highlighter/dist/esm/styles/prism/one-dark');
      
      setSyntaxHighlighter(() => SyntaxHighlighterModule.Prism);
      setCodeStyle(styleModule.default);
      setMounted(true);
    };
    
    loadHighlighter();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-neutral-950 border border-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-700">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700" />
        <div className="flex justify-between items-center px-5 py-3 bg-neutral-950 border-b border-neutral-800 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-gray-400" />
            <span className="text-sm text-gray-300 font-medium capitalize tracking-wide">
              {language}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
              copied 
                ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:border-gray-600"
            }`}
            aria-label="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy code"}</span>
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="p-6 font-mono text-sm text-gray-300 overflow-x-auto">
        {mounted && SyntaxHighlighter ? (
          <SyntaxHighlighter
            language={language}
            style={codeStyle}
            customStyle={{ 
              margin: 0, 
              padding: '0', 
              background: 'transparent',
              fontSize: '0.9rem',
              lineHeight: '1.5',
            }}
            codeTagProps={{ className: 'font-mono' }}
            showLineNumbers={true}
            lineNumberStyle={{ opacity: 0.4, minWidth: '2.5em', paddingRight: '1em', userSelect: 'none' }}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          // Fallback display when component is rendering on the server or loading on client
          <pre className="whitespace-pre-wrap break-words">
            <code>{code}</code>
          </pre>
        )}
      </div>

      {/* Footer with subtle branding */}
      <div className="flex justify-end items-center py-2 px-4 bg-neutral-950 border-t border-neutral-800 text-xs text-gray-500">
        <span className="opacity-60 tracking-wide">Code Snippet</span>
      </div>
    </div>
  );
};

export default CodeBlock;