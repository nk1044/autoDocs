import React from 'react'

function ExternalLink({ title = 'Link', link = '#' }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:underline hover:text-blue-300 transition"
    >
      {title}
    </a>
  )
}

export default ExternalLink

