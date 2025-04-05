import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {data} from '../../docsData.js';

function SideBar() {

  const [docs, setDocs] = useState(data.SideBar || []);
  const [active, setActive] = useState('')

  return (
      <div className='flex flex-col h-full bg-neutral-900 border rounded-r-2xl border-neutral-700'>
        <div className='flex flex-col'>
          {docs.map((doc, index) => (
            <Link to={`/docs/${doc}`} key={index} className={`px-4 py-1 text-lg  cursor-pointer transform hover:scale-105 transition-transform duration-200 ${active === doc ? 'bg-neutral-700' : ''}`} onClick={() => setActive(doc)}>
              <div className='border-b border-neutral-700'>
                {doc}
              </div>
            </Link>
          ))}
        </div>
      </div>
  )
}

export default SideBar