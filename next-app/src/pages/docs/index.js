import Layout from "@/utils/components/Layout";
import Home from "@/utils/components/Home";

export default function DocsPage({ sidebarData }) {
  return (
    <Layout sidebarData={sidebarData}>
      <Home />
    </Layout>
   
  );
}

export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/sidebarData`);
  const sidebarData = await res.json();

  return {
    props: {
      sidebarData,
    },
  };
}
