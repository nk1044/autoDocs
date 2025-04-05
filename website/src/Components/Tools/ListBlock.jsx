import React from 'react';
import InlineBlock from './InlineBlock';
import { formatText } from './Formtter.jsx';

function ListBlock({
    text = 'List',
    items = ['Item 1'],
    ordered = false
}) {


    return (
        <div className='border border-neutral-700 rounded-lg px-4 py-2'>
            {text && <h3 className='text-lg font-bold text-neutral-300 mb-2'>{text}</h3>}
            {ordered ? (
                <ol className='list-decimal list-inside text-neutral-400 space-y-1'>
                    {items.map((item, index) => (
                        <li key={index}>{formatText(item)}</li>
                    ))}
                </ol>
            ) : (
                <ul className='list-disc list-inside text-neutral-400 space-y-1'>
                    {items.map((item, index) => (
                        <li key={index}>{formatText(item)}</li>
                    ))}
                </ul>
            )}
        </div>

    );
}

export default ListBlock;
