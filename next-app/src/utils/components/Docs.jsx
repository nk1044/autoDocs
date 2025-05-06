import React, { useState, useEffect } from 'react';


const AsideBar = (markdownContent, path) => {
    const lines = markdownContent.split('\n');
    let inCodeBlock = false;
    const headings = [];
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
  
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
  
      if (!inCodeBlock && /^#{1}\s+/.test(line)) {
        const headingText = line.replace(/^#{1}\s+/, '').trim();
        const id = generateHeadingId(headingText, path);
        headings.push({ Title: headingText, ID: id });
      }
    }
  
    return headings;
  };

function Docs({fullPath}) {
  console.log('fullPath', fullPath);
  
  const [FullPath, setFullPath] = useState(fullPath);
  const [showSidebar, setShowSidebar] = useState(false);


  return (
    <div className="flex flex-col lg:flex-row h-full bg-black text-neutral-200">
      {/* Mobile toggle button */}
      <div className="lg:hidden p-2 bg-neutral-900 border-b border-neutral-800">
        <button
          className="text-sm text-neutral-200 bg-neutral-800 px-3 py-1 rounded hover:bg-neutral-700"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Hide Outline' : 'Show Outline'}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto px-4 py-4 bg-black">
        <div className="w-full">
          <h1 className="text-center border-b border-neutral-800 font-semibold text-3xl sm:text-4xl pb-2 pt-1 text-neutral-400">
            {/* {currentDoc.title} */}
          </h1>
        </div>
        <div className="mt-6">
          {/* <Markdown content={currentDoc.content.trim()} FullPath={FullPath} /> */}
        </div>
      </div>

      {/* Sidebar outline */}
      <div
        className={`${
          showSidebar ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 flex-none overflow-y-auto pt-4 text-sm h-full bg-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 px-4`}
      >
        <h2 className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Outline</h2>
        {/* {asideItems.map((item, index) => (
          <div
            key={index}
            className="mb-2 text-neutral-400 hover:text-orange-400 cursor-pointer transition"
            onClick={() => {
              const targetId = item.ID || item.Title;
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.replaceState(null, '', `#${targetId}`);
              }
            }}
          >
            <a href={`#${item.ID}`} className="block">
              • {item.Title}
            </a>
          </div>
        ))} */}
      </div>
    </div>
  );
}
export default Docs;