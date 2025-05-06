import React, { useState, useEffect } from 'react';
// import Markdown from '@/utils/components/Markdown';
import { generateHeadingId } from '@/utils/GenerateId';


function DocsPage({ fullPath }) {
  console.log(`fullPath: ${fullPath}`);
  const [content, setContent] = useState('');
  
  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch(`http://localhost:3000/api/content?fileName=${fullPath}`);
      const content = await res.text();
      console.log(`content: ${content}`);
      setContent(content);
    };
    fetchContent();
  }, []);
  
  return (
     <div>
      {content}
     </div>
  );
}

// export async function getServerSideProps(context) {
//   const fullPath = context.params.fullPath?.join('/') || '';
//   console.log(`fullPath: ${fullPath}`);
  
//   const contentRes = await fetch(`http://localhost:3000/api/content?fileName=${fullPath}`);
//   const content = await contentRes.text();
//   console.log(`content: ${content}`);
  


//   return {
//     props: {
//       fullPath,
//       content,
//     },
//   };
// }

export default DocsPage;
