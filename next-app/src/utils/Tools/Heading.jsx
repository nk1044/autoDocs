import React from 'react';
import { generateHeadingId } from '../GenerateId.js';
import { formatText } from './Formtter.jsx' // Import the formatter

function Heading({ Text, Level }) {
  const Tag = `h${Math.min(Level, 6)}`;
  const path = window.location.pathname.replace('/docs/', '');
  const id = generateHeadingId(Text, path);

  // Choose the appropriate styling based on heading level
  const getHeadingStyle = () => {
    switch (Level) {
      case 1:
        return "text-3xl font-bold mt-6 mb-4 border-b border-neutral-700 pb-2 text-white";
      case 2:
        return "text-2xl font-bold mt-5 mb-3 text-neutral-200";
      case 3:
        return "text-xl font-semibold mt-4 mb-2 text-neutral-300";
      case 4:
        return "text-lg font-semibold mt-3 mb-2 text-neutral-400";
      case 5:
        return "text-base font-medium mt-2 mb-1 text-neutral-400";
      case 6:
        return "text-sm font-medium mt-2 mb-1 text-neutral-500";
      default:
        return "text-2xl font-bold mt-2 border-b border-neutral-700 text-white";
    }
  };

  // Format text for any inline formatting
  const formattedText = formatText(Text);

  return (
    <Tag
      id={id}
      className={getHeadingStyle()}
    >
      {formattedText}
    </Tag>
  );
}

export default Heading;