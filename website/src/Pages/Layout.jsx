import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { sidebarData } from '../../data/sidebarData.js';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex-none z-10">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main layout area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:static top-0 left-0 h-full w-64 z-40 transition-transform duration-300
            bg-neutral-950 border-r border-neutral-800 overflow-y-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0
          `}
        >
          <SideBar sidebarData={sidebarData} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto bg-neutral-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
