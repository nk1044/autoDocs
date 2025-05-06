// pages/api/read-file.js
import fs from 'fs';
import path from 'path';

function getFileTree(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  let allPaths = [];

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      const subDirPaths = getFileTree(fullPath);
      allPaths = allPaths.concat(subDirPaths);
    } else {
      allPaths.push(fullPath.split('data/')[1]);
    }
  });

  return allPaths;
}

export default function handler(req, res) {
  const baseDir = path.resolve('src/data');

  try {
    const allPaths = getFileTree(baseDir);
    res.status(200).json(allPaths);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch all file paths' });
  }
}
