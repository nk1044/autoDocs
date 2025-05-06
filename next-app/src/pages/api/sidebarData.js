// pages/api/read-file.js
import fs from 'fs';
import path from 'path';

function getFileTree(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  return items.map((item) => {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      return {
        name: item.name,
        type: 'Folder',
        children: getFileTree(fullPath),
      };
    } else {
      return {
        name: item.name,
        type: 'File',
      };
    }
  });
}

export default function handler(req, res) {
  const baseDir = path.join(process.cwd(), 'data');

  try {
    const tree = getFileTree(baseDir);
    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory' });
  }
}
