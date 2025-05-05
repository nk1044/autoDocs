import React from 'react';
import InlineBlock from "./InlineBlock";
import ExternalLink from "./ExternalLink";

export const formatText = (raw) => {
    if (!raw) return [];
    
    const result = [];
    let current = '';
    let i = 0;
    let key = 0;

    while (i < raw.length) {
        // Handle custom tags first
        if (raw.substring(i, i + 6) === '[code]') {
            if (current) {
                result.push(<span key={`text-${key++}`}>{formatMarkdown(current)}</span>);
                current = '';
            }
            const end = raw.indexOf('[/code]', i);
            if (end === -1) break;
            const content = raw.substring(i + 6, end);
            result.push(<InlineBlock key={`code-${key++}`} text={content} />);
            i = end + 7;
        } 
        else if (raw.substring(i, i + 6) === '[bold]') {
            if (current) {
                result.push(<span key={`text-${key++}`}>{formatMarkdown(current)}</span>);
                current = '';
            }
            const end = raw.indexOf('[/bold]', i);
            if (end === -1) break;
            const content = raw.substring(i + 6, end);
            result.push(<strong className="text-white font-extrabold" key={`bold-${key++}`}>{content}</strong>);
            i = end + 7;
        } 
        else if (raw.substring(i, i + 6) === '[link]') {
            if (current) {
                result.push(<span key={`text-${key++}`}>{formatMarkdown(current)}</span>);
                current = '';
            }
            const linkStart = i + 6;
            const linkEnd = raw.indexOf('[/link]', linkStart);
            if (linkEnd === -1) {
                current += raw.substring(i);
                break;
            }
            const linkContent = raw.substring(linkStart, linkEnd);
            const openParenIndex = linkContent.indexOf('(');
            const closeParenIndex = linkContent.indexOf(')', openParenIndex);

            if (openParenIndex === -1 || closeParenIndex === -1) {
                current += raw.substring(i, linkEnd + 7);
                i = linkEnd + 7;
                continue;
            }

            const linkTitle = linkContent.substring(0, openParenIndex).trim();
            const linkUrl = linkContent.substring(openParenIndex + 1, closeParenIndex).trim();
            result.push(<ExternalLink key={`link-${key++}`} title={linkTitle} link={linkUrl} />);
            i = linkEnd + 7;
        } 
        else {
            current += raw[i];
            i++;
        }
    }

    if (current) {
        result.push(<span key={`text-end`}>{formatMarkdown(current)}</span>);
    }

    return result;
};

// Helper function to format standard Markdown syntax
const formatMarkdown = (text) => {
    if (!text) return text;
    
    // Process bold first
    const boldElements = processBold(text);
    return boldElements;
};

// Process bold text with ** or __
const processBold = (text) => {
    const elements = [];
    let elementKey = 0;
    
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    let match;
    let lastIndex = 0;
    
    while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            elements.push(
                <React.Fragment key={`plain-${elementKey++}`}>
                    {processItalics(text.substring(lastIndex, match.index))}
                </React.Fragment>
            );
        }
        
        elements.push(
            <strong key={`bold-${elementKey++}`} className="text-white font-bold">
                {processItalics(match[2])}
            </strong>
        );
        
        lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
        elements.push(
            <React.Fragment key={`plain-${elementKey++}`}>
                {processItalics(text.substring(lastIndex))}
            </React.Fragment>
        );
    }
    
    return elements.length > 0 ? elements : text;
};

// Process italic text with * or _
const processItalics = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const elements = [];
    let elementKey = 0;
    
    const italicRegex = /(\*|_)([^\*_]+)\1/g;
    let match;
    let lastIndex = 0;
    
    while ((match = italicRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            elements.push(
                <React.Fragment key={`plain-${elementKey++}`}>
                    {processInlineCode(text.substring(lastIndex, match.index))}
                </React.Fragment>
            );
        }
        
        elements.push(
            <em key={`italic-${elementKey++}`} className="italic">
                {processInlineCode(match[2])}
            </em>
        );
        
        lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
        elements.push(
            <React.Fragment key={`plain-${elementKey++}`}>
                {processInlineCode(text.substring(lastIndex))}
            </React.Fragment>
        );
    }
    
    return elements.length > 0 ? elements : text;
};

// Process inline code with `
const processInlineCode = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const elements = [];
    let elementKey = 0;
    
    const codeRegex = /`([^`]+)`/g;
    let match;
    let lastIndex = 0;
    
    while ((match = codeRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            elements.push(
                <React.Fragment key={`plain-${elementKey++}`}>
                    {text.substring(lastIndex, match.index)}
                </React.Fragment>
            );
        }
        
        elements.push(
            <code key={`code-${elementKey++}`} className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-200 font-mono text-sm">
                {match[1]}
            </code>
        );
        
        lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
        elements.push(
            <React.Fragment key={`plain-${elementKey++}`}>
                {text.substring(lastIndex)}
            </React.Fragment>
        );
    }
    
    return elements.length > 0 ? elements : text;
};