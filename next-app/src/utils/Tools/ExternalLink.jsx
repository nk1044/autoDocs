import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

function ExternalLink({ title = 'Link', link = '#' }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-500 hover:underline"
    >
      <span>{title}</span>
      <ExternalLinkIcon className="w-4 h-4" />
    </a>
  );
}

export default ExternalLink;
