import React, { useState, useEffect } from 'react';
import { Copy, Check, Code } from 'lucide-react';

// Import syntax highlighter with dynamic loading to avoid hydration issues
const CodeBlock = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState(null);
  const [codeStyle, setCodeStyle] = useState(null);

  // Only load the syntax highlighter on the client side
  useEffect(() => {
    const loadHighlighter = async () => {
      const SyntaxHighlighterModule = await import('react-syntax-highlighter');
      const isDark = document.documentElement.classList.contains('dark');

      const styleModule = isDark
        ? await import('react-syntax-highlighter/dist/esm/styles/prism/one-dark')
        : await import('react-syntax-highlighter/dist/esm/styles/prism/one-light');
      
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
    <div className="relative dark:bg-neutral-950 bg-[#f8f5f1] border dark:border-gray-800 border-[#d6c8b9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:border-gray-700 hover:border-[#c2b3a2]">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 dark:bg-gradient-to-r dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 bg-gradient-to-r from-[#dfd4c7] via-[#d3c7b8] to-[#dfd4c7]" />
        <div className="flex justify-between items-center px-5 py-3 dark:bg-neutral-950 bg-[#f6f1eb] border-b dark:border-neutral-800 border-[#e0d8cd] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Code size={18} className="dark:text-gray-400 text-[#7b3f00]" />
            <span className="text-sm dark:text-orange-400 text-[#4a2d12] font-medium capitalize tracking-wide">
              {language}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
              copied
                ? "bg-green-500/20 text-green-600 border border-green-500/30"
                : "dark:bg-gray-800 bg-[#e9e1d7] dark:text-gray-300 text-[#4a2d12] dark:border-gray-700 border-[#d1c3b3] hover:dark:bg-gray-700 hover:bg-[#e0d8cd] hover:dark:border-gray-600 hover:border-[#c2b3a2]"
            }`}
            aria-label="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy code"}</span>
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="p-6 font-mono text-sm dark:text-gray-300 text-[#3b3028] overflow-x-auto">
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
      <div className="flex justify-end items-center py-2 px-4 dark:bg-neutral-950 bg-[#f6f1eb] border-t dark:border-neutral-800 border-[#e0d8cd] text-xs tdark:text-gray-500 text-[#7b3f00]">
        <span className="opacity-60 tracking-wide">Code Snippet</span>
      </div>
    </div>
  );
};

export default CodeBlock;