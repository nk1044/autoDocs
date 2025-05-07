import Head from 'next/head';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>docsWrite | all notes in one place</title>
        <link rel="icon" href="https://img.icons8.com/?size=100&id=SPJrDfRcvJLu&format=png&color=000000" />
      </Head>
      <Component {...pageProps} />
      
    </>
  );
}

export default App;
