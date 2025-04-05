import React from 'react'
import { useParams } from 'react-router-dom'

function Docs() {
    const { path } = useParams();

    return (
        <div className='grid grid-cols-6 gap-1 w-full h-full'>

            <div className='col-span-5 h-full bg-neutral-900 border rounded-2xl p-4 border-neutral-700'>
                {path}
            </div>

            <div className='col-span-1 overflow-auto h-full bg-neutral-900 border rounded-l-2xl p-4 border-neutral-700'>
                hello {path}
            </div>
        </div>
    )
}

export default Docs
