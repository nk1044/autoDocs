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
    <div className="flex flex-col lg:flex-row h-full bg-[#f5eee6] text-[#4e3b2b] dark:bg-neutral-800 dark:text-neutral-200">
  {/* Mobile toggle button */}
  <div className="lg:hidden p-2 bg-[#fdfaf7] border-b border-[#d4c2b2] dark:bg-neutral-900 dark:border-neutral-800">
    <button
      className="text-sm text-[#4e3b2b] bg-[#e4d2c1] px-3 py-1 rounded hover:bg-[#d4bba7] dark:text-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      onClick={() => setShowSidebar(!showSidebar)}
    >
      {showSidebar ? 'Hide Outline' : 'Show Outline'}
    </button>
  </div>

  {/* Main content */}
  <div className="flex-1 overflow-auto px-4 py-4 bg-[#f0e7df] dark:bg-black">
    <Preview Content={content} />
  </div>

  {/* Sidebar outline */}
  <div
    className={`${
      showSidebar ? 'block' : 'hidden'
    } lg:block w-full lg:w-64 flex-none overflow-y-auto pt-4 text-sm h-full bg-[#fdfaf7] border-t border-[#d4c2b2] lg:border-t-0 lg:border-l lg:border-[#d4c2b2] px-4 dark:bg-neutral-950 dark:border-neutral-800`}
  >
    <h2 className="text-[#a58a72] text-xs uppercase tracking-wider mb-3 dark:text-neutral-500">
      Outline
    </h2>
    {asideItems.map((item, index) => (
      <div
        key={index}
        className="mb-2 text-[#6d4e3c] hover:text-[#b25c2a] cursor-pointer transition dark:text-neutral-400 dark:hover:text-orange-400"
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