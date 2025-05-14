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

      const lines = content.split('\n');
      let headingIndex = 0;

      for (const line of lines) {
        if (line.trim().startsWith('#')) {
          const headingLevel = line.match(/^#+/)[0].length;
          const headingText = line.slice(headingLevel).trim();

          headingIndex += 1;

          if (headingText.toLowerCase().includes(keyword.toLowerCase())) {
            results.push({
              id: `${relativePath}#${relativePath}-heading-${headingIndex}`,
              name: headingText,
            });
          }
        }
      }
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
