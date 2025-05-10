import React from 'react';
import { formatText } from '@/utils/Tools/Formtter';

function Paragraph({ Text }) {
  // Use the enhanced formatText function which now handles Markdown formatting
  const formattedText = formatText(Text);

  return (
    <p className="text-lg dark:text-neutral-300 text-neutral-700">
      {formattedText}
    </p>
  );
}

export default Paragraph;