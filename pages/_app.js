import { Fragment } from 'react';
import Head from 'next/head';
import 'tachyons';
import './styles.css';
import Nav from '../components/Nav';

const App = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>Euan Marten Portfolio</title>
      <meta name="description" content="Euan Marten is an illustrator & designer with a BA in Illustration from Norwich University of the Arts." />
    </Head>

    <div className="sans-serif">
      <div className="pa4">
        <Nav />
      </div>
      <Component {...pageProps} />
    </div>
  </Fragment>
);

export default App;
