import Head from 'next/head';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>autoDocs | all notes in one place</title>
        <link rel="icon" href="https://img.icons8.com/?size=100&id=57221&format=png&color=000000" />
      </Head>
      {/* <Component {...pageProps} /> */}
      <h1 className="text-3xl font-bold text-center mt-10">
        autoDocs
      </h1>
    </>
  );
}

export default App;
