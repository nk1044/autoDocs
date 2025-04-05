import React from 'react'
import Paragraph from './Tools/Paragraph'


function Preview({Content}) {

    if (!Content) {
        return <h1>Page Data Not Available</h1>
    }
  return (
    <div className='flex flex-col mt-2'>
        {Content.map((item, index) => {
            if (item.Type === "Paragraph") {
                return <Paragraph key={index} Text={item.Text} />
            } 
            else if (item.Type === "Codeblock") {
                return (
                    <pre key={index} className='bg-neutral-800 p-2 rounded-md mb-2'>
                        <code className='text-neutral-200'>{item.Code}</code>
                    </pre>
                )
            }
        }
        )}
    </div>
  )
}

export default Preview