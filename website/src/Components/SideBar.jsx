import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {data} from '../../docsData.js';

function SideBar() {

  const [docs, setDocs] = useState(data.SideBar || []);
  const [active, setActive] = useState('')

  return (
      <div className='flex flex-col h-screen'>
        <div className='p-4 text-2xl font-bold'>Docs</div>
        <div className='flex flex-col'>
          {docs.map((doc, index) => (
            <Link to={`/docs/${doc}`} key={index} className={`p-4 hover:bg-gray-700 ${active === doc ? 'bg-gray-700' : ''}`} onClick={() => setActive(doc)}>
              {doc}
            </Link>
          ))}
        </div>
      </div>
  )
}

export default SideBar