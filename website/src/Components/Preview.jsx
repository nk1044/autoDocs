import React from 'react'
import Paragraph from './Tools/Paragraph';
import CodeBlock from './Tools/CodeBlock';


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
                return <CodeBlock key={index} code={item.Code} language={item.Language} />
            }
        }
        )}
    </div>
  )
}

export default Preview