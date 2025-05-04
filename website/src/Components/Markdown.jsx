import React, { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm'; // ⬅️ Add this
import { visit } from 'unist-util-visit';
import Preview from './Preview';

function Markdown({ content, FullPath }) {
  const [parsedContent, setParsedContent] = useState([]);

  useEffect(() => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm); // ⬅️ Add GFM support

    const tree = processor.parse(content);
    const blocks = [];

    visit(tree, node => {
      if (node.type === 'paragraph') {
        const text = node.children.map(child => child.value || '').join('');
        if (text.trim()) {
          blocks.push({ Type: 'Paragraph', Text: text });
        }
      }

      else if (node.type === 'code') {
        blocks.push({
          Type: 'Codeblock',
          Code: node.value,
          Language: node.lang || 'plaintext'
        });
      }

      else if (node.type === 'list') {
        const items = node.children.map(item => {
          return item.children[0]?.children?.map(child => child.value).join('') || '';
        });
        blocks.push({
          Type: 'List',
          Text: '',
          Items: items
        });
      }

      else if (node.type === 'table') {
        const headers = node.children[0].children.map(cell => 
          cell.children.map(child => child.value).join('')
        );
        const rows = node.children.slice(1).map(row =>
          row.children.map(cell =>
            cell.children.map(child => child.value || '').join('')
          )
        );
        blocks.push({
          Type: 'Table',
          Title: '',
          Headers: headers,
          Rows: rows
        });
      }

      else if (node.type === 'heading') {
        const headingText = node.children.map(child => child.value || '').join('').trim();
        blocks.push({
          Type: 'Heading',
          Text: headingText,
          Level: node.depth,
          ID: `${FullPath}-${headingText.replace(/\s+/g, '-')}`
        });
      }      
    });

    setParsedContent(blocks);
  }, [content, FullPath]);

  return <Preview Content={parsedContent} />;
}

export default Markdown;
