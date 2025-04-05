import InlineBlock from "./InlineBlock";
import ExternalLink from "./ExternalLink";

export const formatText = (raw) => {
    const result = [];
    let current = '';
    let i = 0;
    let key = 0;

    while (i < raw.length) {
        if (raw.substring(i, i + 6) === '[code]') {
            if (current) {
                result.push(<span key={`text-${key++}`}>{current}</span>);
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
                result.push(<span key={`text-${key++}`}>{current}</span>);
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
                result.push(<span key={`text-${key++}`}>{current}</span>);
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
        result.push(<span key={`text-end`}>{current}</span>);
    }

    return result;
};
