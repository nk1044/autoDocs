import React from 'react'

function Docs({content}) {
  console.log('Docs content:', content);
  
  return (
    <div>Docs
      {content}
    </div>
  )
}

export default Docs