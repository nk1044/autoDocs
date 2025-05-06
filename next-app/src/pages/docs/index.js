import Layout from "@/utils/components/Layout";

export default function DocsPage({ sidebarData }) {
  return (
    <Layout sidebarData={sidebarData}>
      <div className="text-white p-4">Welcome to the Docs Page</div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/sidebarData");
  const sidebarData = await res.json();

  return {
    props: {
      sidebarData,
    },
  };
}
