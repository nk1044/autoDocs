import React from 'react'
import Paragraph from '@/utils/Tools/Paragraph';
import CodeBlock from '@/utils/Tools/CodeBlock';
import ListBlock from '@/utils/Tools/ListBlock';
import TableBlock from '@/utils/Tools/TableBlock';
import Heading from '@/utils/Tools/Heading';

function Preview({Content}) {
    if (!Content) {
        return <h1>Page Data Not Available</h1>
    }
    console.log("Preview Content:", Content);
    
    return (
        <div className='flex flex-col mt-2 gap-2'>
            {Content.map((item, index) => {
                if (item.type === "Paragraph") {
                    return <Paragraph key={index} Text={item.content} />
                } 
                else if (item.type === "Heading") {
                    return <Heading key={index} Text={item.content} ID={item.id} />
                }              
                else if (item.type === "CodeBlock") {
                    return <CodeBlock key={index} code={item.content} language={item.language} />
                }
                else if (item.type === "ListBlock") {
                    return <ListBlock key={index} items={item?.content} />
                }
                else if (item.type === "TableBlock") {
                    return <TableBlock key={index} title={item.tablecontent?.title} headers={item.tablecontent?.headers} rows={item.tablecontent?.rows} />
                }
                
                return null;
            })}
        </div>
    )
}

export default Preview