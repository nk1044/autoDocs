import React from 'react';
import { formatText } from '@/utils/Tools/Formtter' 

function Heading({ Text, ID }) {

  const formattedText = formatText(Text);

  return (
    <div
      id={ID}
      className='text-3xl font-bold mt-6 mb-4 border-b border-neutral-700 pb-2 text-white'
    >
      {formattedText}
    </div>
  );
}

export default Heading;