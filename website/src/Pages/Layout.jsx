import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'

function Layout() {
  return (
    <div className='flex flex-row h-screen'>
      <div className='w-1/4 '>
        <SideBar />
      </div>
      <div className='w-3/4 '>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout