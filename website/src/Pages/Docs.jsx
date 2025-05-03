import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
// import {data} from '../../docsData.js';
import {Content} from '../../data/content.js';
import Preview from '../Components/Preview.jsx';


const AsideBar = (markdownContent, path) => {
    return markdownContent
      .split('\n') 
      .filter(line => line.trim().startsWith('#'))
      .map(line => {
        return {
            Title: line.replace(/^#+\s*/, '').trim(),
            ID: path+'-'+line.replace(/^#+\s*/, '').trim()
        }
      });
  };
  


function Docs() {
    // const { path } = useParams();
    const location = useLocation();
    const path = location.pathname.split('/docs/')[1];
    console.log(path);
    
    const currentDoc = Content.find(doc => doc.path === path);
    const asideItems = AsideBar(currentDoc.content, path) || [];
    console.log(asideItems);
    return (
        <div className='grid grid-cols-6 gap-1 w-full h-full'>

            <div className='col-span-5 h-full bg-neutral-900 px-4 py-2'>
                <div className='w-full'>
                    <h1 className='text-center font-semibold text-4xl pb-2 pt-1'>{currentDoc?.title}</h1>
                </div>
                <div className='mt-4'>
                    {/* {currentDoc?.Data.map((item, index) => (
                        <div key={index} className='mb-4 border-b border-neutral-700 pb-2'
                            id={item?.ID ? item.ID : item?.Heading}>
                            <h2 className='text-2xl font-semibold text-neutral-200'>{item.Heading}</h2>
                            <Preview Content={item?.Children || null}/>
                        </div>
                    ))} */}
                    {currentDoc.content}
                </div>
            </div>

            <div className='col-span-1 pt-7 text-md overflow-auto h-full bg-neutral-900 border rounded-l-2xl p-3 border-neutral-700'>
                {asideItems.map((item, index) => (
                    <div key={index} className='text-neutral-400 mb-1 hover:text-neutral-200 cursor-pointer'
                    onClick={() => {
                        const element = document.getElementById(item?.ID ? item.ID : item?.Title);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                    }>
                        <a href={'#' + (item?.ID ? item.ID : item?.Title)} className='text-neutral-400 hover:text-neutral-200'>
                        • {item?.Title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Docs
