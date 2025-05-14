import React from 'react'

function SubHeading({Text}) {
  return (
    <div
      className='text-xl font-semibold mt-2 dark:text-white text-black'
    >
      {Text}
    </div>
  )
}

export default SubHeading