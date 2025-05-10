import Header from "@/utils/components/Header";
import Sidebar from "@/utils/components/Sidebar";
import { useState } from "react";

export default function Layout({ children, sidebarData }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen dark:bg-neutral-950 bg-[#f8f5f1] dark:text-white text-[#4a2d12]">
      <div className="flex-none z-10">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`
            fixed lg:static top-0 left-0 h-full w-64 z-40 transition-transform duration-300
            dark:bg-neutral-950 bg-[#f6f1eb]
            dark:border-neutral-800 border-[#d6c8b9]
            border-r overflow-y-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0
          `}
        >
          <Sidebar sidebarData={sidebarData} />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 overflow-auto dark:bg-neutral-900 bg-[#fcf8f5]">
          {children}
        </div>
      </div>
    </div>
  );
}
