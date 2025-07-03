import { elasticClient } from '@/lib/elastic';

const INDEX_NAME = 'docs_content';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    q: query, 
    limit = 10, 
    offset = 0, 
    type, 
    tags 
  } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    const searchBody = {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query,
                fields: [
                  'content^3',      // Boost general content
                  'headings^5',     // Boost headings higher
                  'fileName^4',     // Boost file names
                  'rawContent^2',   // Boost raw content
                  'codeBlocks^1'    // Code blocks with normal weight
                ],
                type: 'best_fields',
                fuzziness: 'AUTO'
              }
            }
          ],
          filter: []
        }
      },
      highlight: {
        fields: {
          content: {
            fragment_size: 150,
            number_of_fragments: 3,
            pre_tags: ['<mark>'],
            post_tags: ['</mark>']
          },
          headings: {
            fragment_size: 100,
            number_of_fragments: 2,
            pre_tags: ['<mark>'],
            post_tags: ['</mark>']
          },
          rawContent: {
            fragment_size: 200,
            number_of_fragments: 2,
            pre_tags: ['<mark>'],
            post_tags: ['</mark>']
          }
        }
      },
      from: parseInt(offset),
      size: parseInt(limit),
      sort: [
        '_score',
        { lastModified: { order: 'desc' } }
      ]
    };

    // Add file type filter if specified
    if (type) {
      searchBody.query.bool.filter.push({
        term: { fileType: type }
      });
    }

    // Add tags filter if specified
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      searchBody.query.bool.filter.push({
        terms: { tags: tagArray }
      });
    }

    const response = await elasticClient.search({
      index: INDEX_NAME,
      body: searchBody
    });

    // Debug logging to understand the response structure
    console.log('🔍 Elasticsearch response structure:', {
      hasBody: !!response.body,
      hasHits: !!response.hits,
      responseKeys: Object.keys(response),
      bodyKeys: response.body ? Object.keys(response.body) : 'no body'
    });

    // Handle different response structures
    let searchResults;
    if (response.body && response.body.hits) {
      // Older client version with .body
      searchResults = response.body;
    } else if (response.hits) {
      // Newer client version without .body
      searchResults = response;
    } else {
      throw new Error('Unexpected Elasticsearch response structure');
    }

    if (!searchResults.hits || !searchResults.hits.hits) {
      throw new Error('No hits found in Elasticsearch response');
    }

    const results = searchResults.hits.hits.map(hit => ({
      id: hit._id,
      score: hit._score,
      fullPath: hit._source?.fullPath || 'Unknown path',
      fileName: hit._source?.fileName || 'Unknown file',
      fileType: hit._source?.fileType || 'Unknown type',
      lastModified: hit._source?.lastModified || null,
      tags: hit._source?.tags || [],
      highlights: hit.highlight || {},
      // Include a snippet of the content for preview
      contentPreview: hit._source?.content ? 
        hit._source.content.substring(0, 200) + '...' : 
        'No content preview available'
    }));

    res.status(200).json({
      query,
      total: searchResults.hits.total?.value || searchResults.hits.total || 0,
      results,
      took: searchResults.took || 0,
      maxScore: searchResults.hits.max_score || 0
    });

  } catch (error) {
    console.error('❌ Search error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    res.status(500).json({ 
      error: 'Search failed', 
      details: error.message 
    });
  }
}