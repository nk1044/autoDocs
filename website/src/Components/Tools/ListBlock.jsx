import React from 'react';
import InlineBlock from './InlineBlock';

function ListBlock({
    text = 'List',
    items = ['Item 1'],
    ordered = false
}) {
    const formatText = (raw) => {
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
                result.push(<strong key={`bold-${key++}`}>{content}</strong>);
                i = end + 7;
            }
            else if (raw.substring(i, i + 6) === '[link]') {
                if (current) {
                    result.push(<span key={`text-${key++}`}>{current}</span>);
                    current = '';
                }
                const end = raw.indexOf('[/link]', i);
                if (end === -1) break;
                const content = raw.substring(i + 6, end);
                const open = content.indexOf('(');
                const close = content.indexOf(')');
                if (open !== -1 && close !== -1) {
                    const label = content.substring(0, open).trim();
                    const url = content.substring(open + 1, close).trim();
                    result.push(
                        <a
                            key={`link-${key++}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            {label}
                        </a>
                    );
                } else {
                    result.push(<span key={`bad-link-${key++}`}>{content}</span>);
                }
                i = end + 7;
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

    return (
        <div className='border border-neutral-700 rounded-lg px-4 py-2'>
      {text && <h3 className='text-lg font-bold text-neutral-300 mb-2'>{text}</h3>}
      {ordered ? (
        <ol className='list-decimal list-inside text-neutral-400 space-y-1'>
          {items.map((item, index) => (
            <li key={index}>{formatText(item)}</li>
          ))}
        </ol>
      ) : (
        <ul className='list-disc list-inside text-neutral-400 space-y-1'>
          {items.map((item, index) => (
            <li key={index}>{formatText(item)}</li>
          ))}
        </ul>
      )}
    </div>

    );
}

export default ListBlock;
