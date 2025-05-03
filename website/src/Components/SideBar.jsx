import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Folder, FolderOpen, File } from 'lucide-react';

function SideBarItem({ item, level = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
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
            hover:bg-orange-900 hover:text-orange-400
            ${isExpanded ? 'bg-orange-950 text-orange-400' : 'text-neutral-300'}
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
        <NavLink
          to={`/${item.path}`}
          className={({ isActive }) =>
            `flex items-center px-3 py-1.5 rounded-sm transition-all ${
              isActive
                ? 'bg-orange-950 text-orange-400'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-orange-400'
            }`
          }
          style={{ paddingLeft }}
        >
          <File size={iconSize} className="mr-2" />
          <span>{item.title}</span>
        </NavLink>
      )}
      {isExpanded && hasChildren && (
        <div className="flex flex-col">
          {item.children.map((child, index) => (
            <SideBarItem key={child.path + index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function SideBar({ data }) {
  return (
    <div className="flex flex-col h-full w-64 bg-neutral-900 border-r border-neutral-700 text-white overflow-auto p-2">
      <div className="text-sm font-semibold text-neutral-400 px-3 mb-2">SIDEBAR</div>
      {data.map((item, index) => (
        <SideBarItem key={item.path + index} item={item} />
      ))}
    </div>
  );
}

export default SideBar;
