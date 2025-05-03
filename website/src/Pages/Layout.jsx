import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import {sidebarData} from '../../data/sidebarData.js';

function Layout() {
  return (
    <div className='flex flex-col gap-2 h-screen'>
      <Header />
      <div className='grid grid-cols-6 h-full border-t border-neutral-800'>
      <div className='col-span-1 border-r border-neutral-800'>
        <SideBar data={sidebarData} />
      </div>
      <div className='col-span-5 border-l border-neutral-800 '>
        <Outlet />
      </div>
    </div>
    </div>
  )
}

export default Layout