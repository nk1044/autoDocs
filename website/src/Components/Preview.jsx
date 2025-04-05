import React from 'react'
import Paragraph from './Tools/Paragraph';
import CodeBlock from './Tools/CodeBlock';
import ListBlock from './Tools/ListBlock';
import TableBlock from './Tools/TableBlock';

function Preview({Content}) {

    if (!Content) {
        return <h1>Page Data Not Available</h1>
    }
  return (
    <div className='flex flex-col mt-2 gap-2'>
        {Content.map((item, index) => {
            if (item.Type === "Paragraph") {
                return <Paragraph key={index} Text={item.Text} />
            } 
            else if (item.Type === "Codeblock") {
                return <CodeBlock key={index} code={item.Code} language={item.Language} />
            }
            else if (item.Type === "List") {
                return <ListBlock key={index} text={item?.Text} items={item?.Items} />
            }
            else if (item.Type === "Table") {
                return <TableBlock key={index} title={item?.Title} headers={item?.Headers} rows={item?.Rows} />
            }
        }
        )}
    </div>
  )
}

export default Preview