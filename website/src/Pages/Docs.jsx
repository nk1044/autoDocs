import React from 'react'
import { useParams } from 'react-router-dom'
import {data} from '../../docsData.js';
import Preview from '../Components/Preview.jsx';

function Docs() {
    const { path } = useParams();
    const currentDoc = data[path];
    const asideItems = currentDoc?.ASideBar || [];
    return (
        <div className='grid grid-cols-6 gap-1 w-full h-full'>

            <div className='col-span-5 h-full bg-neutral-900 border rounded-2xl px-4 py-2 border-neutral-700'>
                <div className='w-full border-b border-neutral-700 '>
                    <h1 className='text-center font-semibold text-4xl pb-1'>{currentDoc?.Title}</h1>
                </div>

                <div className='mt-4'>
                    {currentDoc?.Data.map((item, index) => (
                        <div key={index} className='mb-4 border-b border-neutral-700 pb-2'
                            id={item?.ID ? item.ID : item?.Heading}>
                            <h2 className='text-2xl font-semibold text-neutral-200'>{item.Heading}</h2>
                            <Preview Content={item?.Children || null}/>
                        </div>
                    ))}
                </div>
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
