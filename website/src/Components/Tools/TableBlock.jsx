import React from 'react';
import { formatText } from './Formtter';

function TableBlock({ headers, rows, title }) {
  return (
    <div className='border border-neutral-700 rounded-lg p-4'>
    {title && <h3 className='text-xl font-bold text-neutral-300 mb-2'>{title}</h3>}
    <table className='w-full border border-neutral-700 text-neutral-300'>
        <thead>
            <tr className='bg-neutral-800'>
                {headers?.map((header, index) => (
                    <th key={index} className='border border-neutral-700 p-2'>{formatText(header)}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className='border border-neutral-700 p-2'>{formatText(cell)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default TableBlock