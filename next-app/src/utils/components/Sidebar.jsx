import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Folder, FolderOpen, File } from 'lucide-react';

function SideBarItem({ item, level = 0, activePath, parentPath = '' }) {
  const iconSize = 16;

  // Normalize currentPath
  const currentPath = [parentPath, item.name].filter(Boolean).join('/');
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = `${level * 16}px`;

  // Determine if item is in active path
  const isInActivePath = (item, path) => {
    if (path === activePath) return true;
    if (item.children) {
      return item.children.some(child =>
        isInActivePath(child, [path, child.name].filter(Boolean).join('/'))
      );
    }
    return false;
  };

  const [isExpanded, setIsExpanded] = useState(() =>
    isInActivePath(item, currentPath)
  );

  useEffect(() => {
    setIsExpanded(isInActivePath(item, currentPath));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFolder = () => {
    if (hasChildren) setIsExpanded(prev => !prev);
  };

  return (
    <div className="flex flex-col font-mono">
      {hasChildren ? (
        <div
          onClick={toggleFolder}
          className={`
            flex items-center cursor-pointer px-3 py-1.5 rounded-sm transition-all
            dark:hover:bg-neutral-800 hover:bg-[#e6dbcf]
            dark:hover:text-orange-400 hover:text-[#7b3f00]
            dark:text-neutral-300 text-neutral-700
          `}
          style={{ paddingLeft }}
        >
          {isExpanded ? (
            <FolderOpen size={iconSize} className="mr-2" />
          ) : (
            <Folder size={iconSize} className="mr-2" />
          )}
          <span>{item.name}</span>
        </div>
      ) : (
        <Link
          href={`/docs/${currentPath}`}
          className={`
            flex items-center px-3 py-1.5 rounded-sm transition-all
            ${activePath === currentPath
              ? 'dark:text-orange-400 text-[#7b3f00]'
              : 'dark:text-neutral-300 text-neutral-700 dark:hover:bg-neutral-800 hover:bg-[#e6dbcf] dark:hover:text-orange-400 hover:text-[#7b3f00]'
            }`}
          style={{ paddingLeft }}
        >
          <File size={iconSize} className="mr-2" />
          <span>{item.name.replace(/\.md$/, '')}</span>
        </Link>
      )}

      {isExpanded && hasChildren && (
        <div className="flex flex-col">
          {item.children.map((child, index) => (
            <SideBarItem
              key={`${child.name}-${index}`}
              item={child}
              level={level + 1}
              activePath={activePath}
              parentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SideBar({ sidebarData }) {
  const router = useRouter();

  // Normalize activePath
  const activePath = decodeURIComponent(
    (router.asPath.split('/docs/')[1] || '').replace(/\/$/, '')
  );

  return (
    <div className="flex flex-col h-full w-64 dark:bg-black bg-[#f6f1eb] dark:border-neutral-800 border-[#d6c8b9] dark:text-white text-neutral-800 overflow-auto p-2">
      <div className="text-sm font-semibold dark:text-neutral-500 text-neutral-500 px-3 mb-2 tracking-wide uppercase">
        Sidebar
      </div>
      {sidebarData && sidebarData.map((item, index) => (
        <SideBarItem
          key={`${item.name}-${index}`}
          item={item}
          activePath={activePath}
          parentPath=""
        />
      ))}
    </div>
  );
}
