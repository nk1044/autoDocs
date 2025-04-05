import React from 'react'
import {formatText} from './Formtter.jsx'

function Paragraph({
    Text
}) {
  return (
    <p className="text-lg text-neutral-300">{formatText(Text)}</p>
  )
}

export default Paragraph