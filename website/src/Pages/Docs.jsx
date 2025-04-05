import React from 'react'
import { useParams } from 'react-router-dom'
import {data} from '../../docsData.js';

function Docs() {
    const { path } = useParams();
    const currentDoc = data[path];
    const asideItems = currentDoc?.ASideBar || [];
    return (
        <div className='grid grid-cols-6 gap-1 w-full h-full'>

            <div className='col-span-5 h-full bg-neutral-900 border rounded-2xl p-4 border-neutral-700'>
                {currentDoc.Title}
            </div>

            <div className='col-span-1 text-md overflow-auto h-full bg-neutral-900 border rounded-l-2xl p-3 border-neutral-700'>
                {asideItems.map((item, index) => (
                    <div key={index} className='text-neutral-400 mb-1 hover:text-neutral-200 cursor-pointer'>
                        • {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Docs
