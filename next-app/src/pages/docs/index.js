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
  const res = await fetch("http://localhost:3000/api/sidebarData");
  const sidebarData = await res.json();

  return {
    props: {
      sidebarData,
    },
  };
}
