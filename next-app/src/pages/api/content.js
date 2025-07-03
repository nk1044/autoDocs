import fs from 'fs';
import path from 'path';
import { FormatData } from '@/lib/page-formatter';
import { elasticClient } from '@/lib/elastic';

const INDEX_NAME = 'docs_content';

// Initialize Elasticsearch index
async function initializeIndex() {
  try {
    const indexExists = await elasticClient.indices.exists({
      index: INDEX_NAME
    });

    if (!indexExists) {
      await elasticClient.indices.create({
        index: INDEX_NAME,
        body: {
          mappings: {
            properties: {
              fullPath: { type: 'keyword' },
              fileName: { type: 'text' },
              content: { type: 'text' },
              rawContent: { type: 'text' },
              formattedBlocks: { type: 'object' },
              lastModified: { type: 'date' },
              fileType: { type: 'keyword' },
              headings: { type: 'text' },
              codeBlocks: { type: 'text' },
              tags: { type: 'keyword' }
            }
          }
        }
      });
      console.log(`✅ Created Elasticsearch index: ${INDEX_NAME}`);
    }
  } catch (error) {
    console.error('❌ Error initializing Elasticsearch index:', error);
  }
}

// Index document content
async function indexDocument(fullPath, rawContent, formattedData) {
  try {
    const fileName = path.basename(fullPath);
    const fileStats = fs.statSync(path.join(path.resolve('src/data'), fullPath));
    
    // Extract different content types for better searchability
    const headings = formattedData
      .filter(block => block.type === 'Heading' || block.type === 'SubHeading')
      .map(block => block.content)
      .join(' ');
    
    const codeBlocks = formattedData
      .filter(block => block.type === 'CodeBlock')
      .map(block => block.content)
      .join(' ');
    
    const paragraphs = formattedData
      .filter(block => block.type === 'Paragraph')
      .map(block => block.content)
      .join(' ');
    
    const lists = formattedData
      .filter(block => block.type === 'ListBlock')
      .map(block => block.content.join(' '))
      .join(' ');
    
    // Combine all text content
    const allContent = `${headings} ${paragraphs} ${lists} ${codeBlocks}`.trim();
    
    // Extract tags from content (looking for #tag patterns)
    const tags = (rawContent.match(/#\w+/g) || []).map(tag => tag.substring(1));
    
    const document = {
      fullPath,
      fileName,
      content: allContent,
      rawContent,
      formattedBlocks: formattedData,
      lastModified: fileStats.mtime,
      fileType: path.extname(fullPath).substring(1) || 'md',
      headings,
      codeBlocks,
      tags
    };

    await elasticClient.index({
      index: INDEX_NAME,
      id: fullPath,
      body: document
    });

    console.log(`✅ Indexed document: ${fullPath}`);
  } catch (error) {
    console.error(`❌ Error indexing document ${fullPath}:`, error);
  }
}

// Check if document needs reindexing
async function shouldReindex(fullPath, fileStats) {
  try {
    const response = await elasticClient.get({
      index: INDEX_NAME,
      id: fullPath
    });
    
    const indexedDate = new Date(response.body._source.lastModified);
    const fileDate = fileStats.mtime;
    
    return fileDate > indexedDate;
  } catch (error) {
    // Document doesn't exist, so we should index it
    return true;
  }
}

// http://localhost:3000/api/content?fullPath=test.md
export default async function handler(req, res) {
  const baseDir = path.resolve('src/data');
  const fullPath = req.query.fullPath;

  if (!fullPath) {
    return res.status(400).json({ error: 'Missing fullPath query parameter' });
  }

  const filePath = path.join(baseDir, fullPath);

  try {
    // Initialize index if needed
    await initializeIndex();
    
    const data = fs.readFileSync(filePath, 'utf-8');
    const formattedData = FormatData(data, fullPath);
    
    // Check if we need to reindex this document
    const fileStats = fs.statSync(filePath);
    const needsReindexing = await shouldReindex(fullPath, fileStats);
    
    if (needsReindexing) {
      await indexDocument(fullPath, data, formattedData);
    }
    
    res.status(200).json({ content: formattedData });
  } catch (error) {
    console.error("❌ Error processing file:", error.message);
    res.status(500).json({ error: 'Failed to read or index file' });
  }
}