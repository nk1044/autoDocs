import React from 'react';
import { NavLink } from 'react-router-dom';
import { data } from '../../docsData.js';

function SideBar() {
  const docs = data.SideBar || [];

  return (
    <div className='flex flex-col h-full bg-neutral-900 border rounded-r-2xl border-neutral-700'>
      <div className='flex flex-col'>
        {docs.map((doc, index) => (
          <NavLink
            to={`/docs/${doc}`}
            key={index}
            className={({ isActive }) =>
              `px-4 py-1 text-xl cursor-pointer transform hover:scale-105 transition-transform duration-200  ${
                isActive ? 'text-orange-600' : ''
              }`
            }
          >
            <div className='border-b px-1 border-neutral-700'>
                {doc}
              </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
