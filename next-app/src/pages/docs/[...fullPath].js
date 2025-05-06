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
  

  const resSidebar = await fetch("http://localhost:3000/api/sidebarData");
  const sidebarData = await resSidebar.json();

  const resContent = await fetch(`http://localhost:3000/api/content?fullPath=${encodeURIComponent(fullPathStr)}`);
  const contentJson = await resContent.json();
  const content = contentJson.content;

  // console.log("Content:", content);
  
  return {
    props: {
      sidebarData,
      content,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/allpaths");
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
