import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {data} from '../../docsData.js';

function SideBar() {

  const [docs, setDocs] = useState(data.SideBar || []);
  const [active, setActive] = useState('')

  return (
      <div className='flex flex-col h-full bg-neutral-800 border rounded-r-2xl border-neutral-700'>
        <div className='p-4 text-2xl font-bold'>Docs</div>
        <div className='flex flex-col'>
          {docs.map((doc, index) => (
            <Link to={`/docs/${doc}`} key={index} className={`p-4 hover:bg-neutral-700 ${active === doc ? 'bg-neutral-700' : ''}`} onClick={() => setActive(doc)}>
              {doc}
            </Link>
          ))}
        </div>
      </div>
  )
}

export default SideBar