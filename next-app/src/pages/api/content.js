// pages/api/read-file.js
import fs from 'fs';
import path from 'path';

function FormatData(data, fullPath = "doc") {
    const FormattedData = [];
    const lines = data.split('\n');
  
    let i = 0;
    let codeBlock = null;
    let tableLines = [];
    let listLines = [];
  
    while (i < lines.length) {
      const line = lines[i].trim();
  
      // --- Code block ---
      if (line.startsWith("```")) {
        if (codeBlock === null) {
          codeBlock = {
            type: "CodeBlock",
            content: "",
            language: line.slice(3).trim() || undefined,
          };
        } else {
          FormattedData.push({ ...codeBlock });
          codeBlock = null;
        }
        i++;
        continue;
      }
      if (codeBlock) {
        codeBlock.content += line + "\n";
        i++;
        continue;
      }
  
      // --- Heading ---
      if (line.startsWith("#")) {
        const headingLevel = line.match(/^#+/)[0].length;
        const headingText = line.slice(headingLevel).trim();
        const id = `${fullPath}-heading-${FormattedData.length + 1}`;
  
        FormattedData.push({
          type: headingLevel === 1 ? "Heading" : "SubHeading",
          content: headingText,
          ...(headingLevel === 1 ? { id } : {}),
        });
  
        i++;
        continue;
      }
  
      // --- Table ---
      if (line.includes('|') && lines[i + 1]?.includes('|') && lines[i + 1].includes('---')) {
        tableLines.push(lines[i]);
        tableLines.push(lines[i + 1]);
        i += 2;
        while (i < lines.length && lines[i].includes('|')) {
          tableLines.push(lines[i]);
          i++;
        }
  
        const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
        const rows = tableLines.slice(2).map(row =>
          row.split('|').map(cell => cell.trim()).filter(Boolean)
        );
  
        FormattedData.push({
          type: "TableBlock",
          tablecontent: {
            title: "Table",
            headers,
            rows,
          },
        });
  
        tableLines = [];
        continue;
      }
  
      // --- List ---
      if (/^[-*+]\s+/.test(line)) {
        while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
          listLines.push(lines[i].trim().replace(/^[-*+]\s+/, ""));
          i++;
        }
  
        FormattedData.push({
          type: "ListBlock",
          content: listLines,
        });
  
        listLines = [];
        continue;
      }
  
      // --- Paragraph ---
      if (line.length > 0) {
        FormattedData.push({
          type: "Paragraph",
          content: line,
        });
      }
  
      i++;
    }
  
    return FormattedData;
  }

  
// http://localhost:3000/api/content?fullPath=test.md
export default function handler(req, res) {
    const baseDir = path.resolve('src/data');
    const fullPath = req.query.fullPath;
    console.log("Full path:", fullPath);
    
  
    if (!fullPath) {
      return res.status(400).json({ error: 'Missing fullPath query parameter' });
    }
  
    const filePath = path.join(baseDir, fullPath);
  
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
    const formattedData = FormatData(data, fullPath);
      res.status(200).json({ content: formattedData });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read file' });
    }
  }
