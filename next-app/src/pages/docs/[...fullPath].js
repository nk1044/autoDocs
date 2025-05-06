import Layout from "@/utils/components/Layout";
import Docs from "@/utils/components/Docs";

export default function DocsPage({ sidebarData, fullPath }) {
  return (
    <Layout sidebarData={sidebarData}>
      <Docs fullPath={fullPath} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { fullPath = [] } = context.params;
  const res = await fetch("http://localhost:3000/api/sidebarData");
  const sidebarData = await res.json();

  return {
    props: {
      sidebarData,
      fullPath: fullPath.join('/'),
    },
  };
}
