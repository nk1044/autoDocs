import React, {useState} from 'react';
import Preview from '@/utils/components/Preview';


const AsideBar = (data) => {
  const headings = data.filter((item)=> item.type === 'Heading');
  return headings || [];
};

function Docs({content}) {
  // console.log('Docs content:', content);
  const [showSidebar, setShowSidebar] = useState(false);
  const asideItems = content ? AsideBar(content) : [];
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
        <Preview Content={content} />
      </div>

      {/* Sidebar outline */}
      <div
        className={`${
          showSidebar ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 flex-none overflow-y-auto pt-4 text-sm h-full bg-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 px-4`}
      >
        <h2 className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Outline</h2>
        {asideItems.map((item, index) => (
          <div
            key={index}
            className="mb-2 text-neutral-400 hover:text-orange-400 cursor-pointer transition"
            onClick={() => {
              const targetId = item.id || item.content;
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.replaceState(null, '', `#${targetId}`);
              }
            }}
          >
            <a href={`#${item.id}`} className="block">
              • {item.content}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Docs