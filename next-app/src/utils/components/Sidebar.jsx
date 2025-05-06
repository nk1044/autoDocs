// components/SideBar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Folder, FolderOpen, File } from 'lucide-react';

function SideBarItem({ item, level = 0, activePath }) {
  const isInActivePath = (item, currentPath) => {
    if (item.path === currentPath) return true;
    if (item.children) {
      return item.children.some(child => isInActivePath(child, currentPath));
    }
    return false;
  };

  const [isExpanded, setIsExpanded] = useState(() => {
    const hasActiveChild = item.children && isInActivePath(item, activePath);
    return hasActiveChild;
  });

  useEffect(() => {
    if (item.children && isInActivePath(item, activePath)) {
      setIsExpanded(true);
    }
  }, [activePath, item]);

  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = `${level * 16}px`;
  const iconSize = 16;

  const toggleFolder = () => {
    if (hasChildren) setIsExpanded(prev => !prev);
  };

  return (
    <div className="flex flex-col font-mono">
      {hasChildren ? (
        <div
          onClick={toggleFolder}
          className={`flex items-center cursor-pointer px-3 py-1.5 rounded-sm transition-all 
            hover:bg-neutral-800 hover:text-orange-400
            ${isExpanded ? 'text-orange-400' : 'text-neutral-300'}
          `}
          style={{ paddingLeft }}
        >
          {isExpanded ? (
            <FolderOpen size={iconSize} className="mr-2" />
          ) : (
            <Folder size={iconSize} className="mr-2" />
          )}
          <span>{item.title}</span>
        </div>
      ) : (
        <Link href={`/docs/${item.path}`} passHref legacyBehavior>
          <a
            className={`
              flex items-center px-3 py-1.5 rounded-sm transition-all
              ${activePath === item.path
                ? 'bg-orange-950 text-orange-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-orange-400'
              }`}
            style={{ paddingLeft }}
          >
            <File size={iconSize} className="mr-2" />
            <span>{item.title}</span>
          </a>
        </Link>
      )}
      {isExpanded && hasChildren && (
        <div className="flex flex-col">
          {item.children.map((child, index) => (
            <SideBarItem 
              key={child.path + index} 
              item={child} 
              level={level + 1} 
              activePath={activePath} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SideBar({ sidebarData }) {
  const router = useRouter();
  const activePath = router.asPath.split('/docs/')[1] || '';

  return (
    <div className="flex flex-col h-full w-64 bg-black border-r border-neutral-800 text-white overflow-auto p-2">
      <div className="text-sm font-semibold text-neutral-500 px-3 mb-2 tracking-wide uppercase">
        Sidebar
      </div>
      {sidebarData && sidebarData.map((item, index) => (
        <SideBarItem 
          key={item.path + index} 
          item={item} 
          activePath={activePath} 
        />
      ))}
    </div>
  );
}

