import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'

function Layout() {
  return (
    <div className='flex flex-col gap-2 h-screen bg-neutral-900'>
      <Header />
      <div className='grid grid-cols-6 gap-1 h-full'>
      <div className='col-span-1 '>
        <SideBar />
      </div>
      <div className='col-span-5 '>
        <Outlet />
      </div>
    </div>
    </div>
  )
}

export default Layout