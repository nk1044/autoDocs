import React from 'react';

function Heading({ Text, ID }) {

  return (
    <div
      id={ID}
      className='text-3xl font-bold mt-6 mb-4 border-b border-neutral-700 pb-2 text-white'
    >
      {Text}
    </div>
  );
}

export default Heading;