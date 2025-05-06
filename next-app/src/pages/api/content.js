// pages/api/read-file.js
import fs from 'fs';
import path from 'path';

function getFileData(dirPath) {
    const data = fs.readFileSync(dirPath, 'utf-8');
    return data;
}

export default function handler(req, res) {
    const baseDir = path.resolve('src/data');
    console.log(baseDir);
    const fileName = req.query.fileName;
    const filePath = path.join(baseDir, fileName);

    try {
        const data = getFileData(filePath);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read File' });
    }
}
