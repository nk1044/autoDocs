import React, { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm'; 
import { visit } from 'unist-util-visit';
import Preview from './Preview';
import { generateHeadingId } from '../utils/GenerateId.js';

function Markdown({ content, FullPath }) {
  const [parsedContent, setParsedContent] = useState([]);

  useEffect(() => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm);

    const tree = processor.parse(content);
    const blocks = [];

    // First pass to identify code blocks for later reference
    const codeBlockPositions = [];
    visit(tree, 'code', (node) => {
      codeBlockPositions.push({
        start: node.position.start.offset,
        end: node.position.end.offset
      });
    });

    // Helper function to check if a position is within any code block
    const isInCodeBlock = (position) => {
      return codeBlockPositions.some(block => 
        position >= block.start && position <= block.end
      );
    };

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
          Items: items,
          Ordered: node.ordered || false
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
        // Process all heading levels
        const headingText = node.children.map(child => child.value || '').join('').trim();
        
        // Verify this heading isn't inside a code block before adding it
        if (!isInCodeBlock(node.position.start.offset)) {
          blocks.push({
            Type: 'Heading',
            Text: headingText,
            Level: node.depth,
            ID: generateHeadingId(headingText, FullPath)
          });
        }
      }

      else if (node.type === 'thematicBreak') {
        blocks.push({
          Type: 'ThematicBreak'
        });
      }

      else if (node.type === 'blockquote') {
        const text = node.children
          .map(child => {
            if (child.type === 'paragraph') {
              return child.children.map(c => c.value || '').join('');
            }
            return '';
          })
          .join('\n\n');
        
        blocks.push({
          Type: 'Blockquote',
          Text: text
        });
      }
    });

    setParsedContent(blocks);
  }, [content, FullPath]);

  return <Preview Content={parsedContent} />;
}

export default Markdown;