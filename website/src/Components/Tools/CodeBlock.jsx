import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({ code, language = "javascript" }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-2 text-md shadow-md">
            <div className="flex justify-between items-center mb-3">
                <span className="text-neutral-400 bg-transparent font-medium capitalize">
                    {language} code
                </span>
                <button
                    onClick={copyToClipboard}
                    className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 px-3 py-1 rounded-md text-xs transition-all duration-200"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{ borderRadius: '0.5rem', margin: 0, padding: '1rem' }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeBlock;
