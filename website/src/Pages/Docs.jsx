import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Content } from '../../data/content.js';
import Markdown from '../Components/Markdown.jsx';
import { generateHeadingId } from '../utils/GenerateId.js';

const AsideBar = (markdownContent, path) => {
  // First, let's identify code blocks to exclude them
  const lines = markdownContent.split('\n');
  let inCodeBlock = false;
  const headings = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we're entering or leaving a code block
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    
    // Only process headings if we're not in a code block
    if (!inCodeBlock && /^#{1}\s+/.test(line)) {
      const headingText = line.replace(/^#{1}\s+/, '').trim();
      const id = generateHeadingId(headingText, path);
      headings.push({
        Title: headingText,
        ID: id
      });
    }
  }
  
  return headings;
};

function Docs() {
  const location = useLocation();
  const path = location.pathname.split('/docs/')[1];
  const [FullPath, setFullPath] = useState(path);
  const [showSidebar, setShowSidebar] = useState(false);

  const currentDoc = Content.find(doc => doc.path === path);
  const asideItems = currentDoc ? AsideBar(currentDoc.content, path) : [];

  if (!currentDoc) {
    return <div className="p-6">Document not found</div>;
  }

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [currentDoc]);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Toggle button for mobile sidebar */}
      <div className="lg:hidden p-2 bg-neutral-800 border-b border-neutral-700">
        <button
          className="text-sm text-neutral-200 bg-neutral-700 px-3 py-1 rounded hover:bg-neutral-600"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Hide Outline' : 'Show Outline'}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-neutral-900 px-4 py-2">
        <div className="w-full">
          <h1 className="text-center border-b border-neutral-800 font-semibold text-3xl sm:text-4xl pb-2 pt-1">
            {currentDoc?.title}
          </h1>
        </div>
        <div className="mt-4">
          <Markdown content={currentDoc.content.trim()} FullPath={FullPath} />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 flex-none overflow-y-auto pt-4 text-md h-full bg-neutral-900 border-t lg:border-t-0 lg:border-l p-3 border-neutral-800`}
      >
        {asideItems.map((item, index) => (
          <div
            key={index}
            className="text-neutral-400 mb-1 hover:text-neutral-200 cursor-pointer"
            onClick={() => {
              const targetId = item.ID || item.Title;
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.replaceState(null, '', `#${targetId}`);
              }
            }}
          >
            <a
              href={`#${item?.ID || item?.Title}`}
              className="text-neutral-400 hover:text-orange-400"
            >
              • {item?.Title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Docs;