// pages/api/search.js

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { keyword } = req.body;
  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid keyword' });
  }

  const baseDir = path.resolve('src/data');
  const results = [];

  try {
    const files = await getAllMarkdownFiles(baseDir);

    for (const filePath of files) {
      const content = await fs.readFile(filePath, 'utf-8');
      const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/'); // Windows-safe
      
      // Generate IDs that match the FormatData function
      const formattedData = formatDataHeaders(content, relativePath);
      
      // Find headings that match the keyword
      formattedData.forEach((item, index) => {
        if ((item.type === "Heading" || item.type === "SubHeading") && 
            item.content.toLowerCase().includes(keyword.toLowerCase())) {
          
          // For H1 headings - use the ID from FormatData
          if (item.id) {
            results.push({
              id: `${relativePath}#${item.id}`,
              name: item.content,
              uniqueKey: `${relativePath}#${item.id}`
            });
          } else {
            // For other headings, create a unique key by adding the index
            results.push({
              id: relativePath,
              name: item.content,
              uniqueKey: `${relativePath}-subheading-${index}`
            });
          }
        }
      });
    }

    res.status(200).json({ matches: results });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search files', message: err.message });
  }
}

// Helper: Recursively get all .md files
async function getAllMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllMarkdownFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        return fullPath;
      } else {
        return null;
      }
    })
  );
  return files.flat().filter(Boolean);
}

// Extract only the heading information from content similar to FormatData
function formatDataHeaders(data, fullPath) {
  const formattedHeaders = [];
  const lines = data.split('\n');
  
  let codeBlock = false;
  let headingCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip code blocks
    if (line.startsWith('```')) {
      codeBlock = !codeBlock;
      continue;
    }
    
    if (codeBlock) continue;
    
    // Process headings
    if (line.startsWith('#')) {
      const headingLevel = line.match(/^#+/)[0].length;
      const headingText = line.slice(headingLevel).trim();
      headingCount++;
      
      // Only generate IDs for Heading (H1) elements
      const id = headingLevel === 1 ? `${fullPath}-heading-${headingCount}` : undefined;
      
      formattedHeaders.push({
        type: headingLevel === 1 ? "Heading" : "SubHeading",
        content: headingText,
        ...(id ? { id } : {}),
      });
    }
  }
  
  return formattedHeaders;
}