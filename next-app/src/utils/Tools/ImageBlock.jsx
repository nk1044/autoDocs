import React from 'react';
import Image from 'next/image';

function ImageBlock({ imgsrc, alt = 'Image'}) {
  return (
      <img 
      src={imgsrc} 
      alt={alt}
      className='w-full h-auto rounded-lg shadow-md'
      />
  );
}

export default ImageBlock;
