import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { sidebarData } from '../../data/sidebarData.js';

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <div className="flex-none">
        <Header />
      </div>
      
      {/* Main Content Area with fixed sidebar and scrollable content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="flex-none w-64 overflow-y-auto bg-neutral-950 border-r border-neutral-800">
          <SideBar sidebarData={sidebarData} />
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;