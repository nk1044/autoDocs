import React from 'react';

function Heading({ Text, ID }) {

  return (
    <div
      id={ID}
      className='text-3xl font-bold mt-6 mb-4 border-b dark:border-neutral-700 pb-2 dark:text-white text-black'
    >
      {Text}
    </div>
  );
}

export default Heading;