import React from 'react';
import Image from 'next/image';

function ImageBlock({ imgsrc, alt = 'Image', width = 600, height = 400 }) {
  return (
    <div className="relative w-full max-w-[600px] mx-auto my-4 rounded-lg overflow-hidden shadow-lg">
      <Image
        src={imgsrc}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-contain"
        layout="responsive"
      />
    </div>
  );
}

export default ImageBlock;
