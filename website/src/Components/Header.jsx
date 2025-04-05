import React from 'react'

function Header() {
  return (
    <div className='flex flex-row justify-between items-center bg-neutral-800 p-3 border-b border-neutral-700'>
        <div className='text-xl font-bold'>
            <h1>autoDocs</h1>
        </div>
        <div className='flex flex-row items-center'>
            <input 
            type="text"
            className='bg-neutral-700 text-white p-2 rounded-lg'
            placeholder='Search...'
            />
        </div>
        <div className='flex flex-row items-center'>
            <button
            className='bg-neutral-700 text-white p-2 rounded-lg mr-4'
            >Settings</button>
        </div>
    </div>
  )
}

export default Header