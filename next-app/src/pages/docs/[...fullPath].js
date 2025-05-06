import Layout from "@/utils/components/Layout";
import Docs from "@/utils/components/Docs";

export default function DocsPage({ sidebarData, content }) {
  return (
    <Layout sidebarData={sidebarData}>
      <Docs content={content} />
    </Layout>
    
  );
}

export async function getStaticProps(context) {
  const { fullPath } = context.params;
  const fullPathStr = fullPath.join("/");
  // console.log("Full path str:", fullPathStr);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const resSidebar = await fetch(`${baseUrl}/api/sidebarData`);
  const sidebarData = await resSidebar.json();

  const resContent = await fetch(`${baseUrl}/api/content?fullPath=${encodeURIComponent(fullPathStr)}`);
  const content = await resContent.json();
  
  
  return {
    props: {
      sidebarData,
      content: content.content ,
    },
  };
}

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/allpaths`);
  const pathsArray = await res.json();
  // console.log("Paths array:", pathsArray);
  

  const paths = pathsArray.map((fullPath) => ({
    params: {
      fullPath: fullPath.split('/'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
