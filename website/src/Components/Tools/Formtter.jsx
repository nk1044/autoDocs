import React from 'react';
import InlineBlock from "./InlineBlock";
import ExternalLink from "./ExternalLink";

export const formatText = (raw) => {
    if (!raw) return '';

    if (typeof raw !== 'string') {
        return raw.toString();
    }

    const result = [];
    let currentText = '';
    let i = 0;
    let key = 0;

    while (i < raw.length) {
        if (raw.substring(i, i + 6) === '[code]') {
            if (currentText) {
                result.push(<span key={`text-${key++}`}>{formatMarkdown(currentText)}</span>);
                currentText = '';
            }
            const codeStart = i + 6;
            const codeEnd = raw.indexOf('[/code]', codeStart);
            if (codeEnd === -1) {
                currentText += raw.substring(i);
                break;
            }
            const codeContent = raw.substring(codeStart, codeEnd);
            result.push(<InlineBlock key={`code-${key++}`} text={codeContent} />);
            i = codeEnd + 7;
        } else if (raw.substring(i, i + 6) === '[link]') {
            if (currentText) {
                result.push(<span key={`text-${key++}`}>{formatMarkdown(currentText)}</span>);
                currentText = '';
            }
            const linkStart = i + 6;
            const linkEnd = raw.indexOf('[/link]', linkStart);
            if (linkEnd === -1) {
                currentText += raw.substring(i);
                break;
            }

            const linkContent = raw.substring(linkStart, linkEnd);
            const trimmedLinkContent = linkContent.trim();
const match = trimmedLinkContent.match(/^(.*?)\s*\(\s*(.*?)\s*\)\s*$/);



            if (!match) {
                // If invalid link syntax, treat as formatted markdown text
                result.push(<span key={`text-${key++}`}>{formatMarkdown(linkContent)}</span>);
                i = linkEnd + 7;
                continue;
            }
            

            const linkTitle = match[1].trim();
            const linkUrl = match[2].trim();

            result.push(<ExternalLink key={`link-${key++}`} title={linkTitle} link={linkUrl} />);
            i = linkEnd + 7;
        } else if (raw.substring(i, i + 6) === '[bold]') {
            if (currentText) {
                result.push(<span key={`text-${key++}`}>{formatMarkdown(currentText)}</span>);
                currentText = '';
            }
            const boldStart = i + 6;
            const boldEnd = raw.indexOf('[/bold]', boldStart);
            if (boldEnd === -1) {
                currentText += raw.substring(i);
                break;
            }
            const boldContent = raw.substring(boldStart, boldEnd);
            result.push(<strong key={`bold-${key++}`} className="font-bold">{boldContent}</strong>);
            i = boldEnd + 7;
        } else {
            currentText += raw[i];
            i++;
        }
    }

    if (currentText) {
        result.push(<span key={`text-${key++}`}>{formatMarkdown(currentText)}</span>);
    }

    return result.length > 0 ? result : '';
};

// Helper function to format standard Markdown syntax
const formatMarkdown = (text) => {
    if (!text) return text;

    return processBold(text);
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

    if (lastIndex < text.length) {
        elements.push(
            <React.Fragment key={`plain-${elementKey++}`}>
                {text.substring(lastIndex)}
            </React.Fragment>
        );
    }

    return elements.length > 0 ? elements : text;
};
