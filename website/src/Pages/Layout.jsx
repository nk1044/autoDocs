import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'

function Layout() {
  return (
    <div className='flex flex-col gap-1 h-screen bg-neutral-900'>
      <Header />
      <div className='flex flex-row flex-grow h-full'>
      <div className='w-1/4 '>
        <SideBar />
      </div>
      <div className='w-3/4 '>
        <Outlet />
      </div>
    </div>
    </div>
  )
}

export default Layout