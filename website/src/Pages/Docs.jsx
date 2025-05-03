import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Content } from '../../data/content.js';
import Preview from '../Components/Preview.jsx';
import Markdown from '../Components/Markdown.jsx';

const AsideBar = (markdownContent, path) => {
  return markdownContent
    .split('\n')
    .filter(line => line.trim().startsWith('#'))
    .map(line => {
      const headingText = line.replace(/^#+\s*/, '').trim();
      return {
        Title: headingText.replaceAll('#', ''),
        ID: `${path}-${headingText.replace(/\s+/g, '-').toLowerCase()}`
      };
    });
};

function Docs() {
  const location = useLocation();
  const path = location.pathname.split('/docs/')[1];
  const [FullPath, setFullPath] = useState(path);

  const currentDoc = Content.find(doc => doc.path === path);
  const asideItems = currentDoc ? AsideBar(currentDoc.content, path) : [];

  if (!currentDoc) {
    return <div className="p-6">Document not found</div>;
  }

  return (
    <div className="flex h-full">
      {/* Main content area - scrollable */}
      <div className="flex-1 overflow-auto bg-neutral-900 px-4 py-2">
        <div className="w-full">
          <h1 className="text-center font-semibold text-4xl pb-2 pt-1">{currentDoc?.title}</h1>
        </div>
        <div className="mt-4">
          <Markdown content={currentDoc.content.trim()} FullPath={FullPath} />
        </div>
      </div>

      {/* Right sidebar - independently scrollable */}
      <div className="w-64 flex-none overflow-y-auto pt-7 text-md h-full bg-neutral-900 border-l p-3 border-neutral-800">
        {asideItems.map((item, index) => (
          <div
            key={index}
            className="text-neutral-400 mb-1 hover:text-neutral-200 cursor-pointer"
            onClick={() => {
              const element = document.getElementById(item?.ID ? item.ID : item?.Title);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <a href={'#' + (item?.ID ? item.ID : item?.Title)} className="text-neutral-400 hover:text-orange-400">
              • {item?.Title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Docs;