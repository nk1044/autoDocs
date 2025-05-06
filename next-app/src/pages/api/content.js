// pages/api/read-file.js
import fs from 'fs';
import path from 'path';

function getFileData(dirPath) {
    const data = fs.readFileSync(dirPath, 'utf-8');
    return data;
}
// http://localhost:3000/api/content?fileName=test.md
export default function handler(req, res) {
    const baseDir = path.resolve('src/data');
    const fullPath = req.query.fullPath;
  
    if (!fullPath) {
      return res.status(400).json({ error: 'Missing fullPath query parameter' });
    }
  
    const filePath = path.join(baseDir, fullPath);
  
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.status(200).json({ content: data });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read file' });
    }
  }
