import React from 'react';

function Heading({ Text, Level }) {
  const Tag = `h${Math.min(Level, 6)}`;
  return <Tag className={`text-2xl font-bold mt-2 border-b border-neutral-700`}>{Text}</Tag>;
}

export default Heading;
