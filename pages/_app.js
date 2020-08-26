import { Fragment } from 'react';
import Head from 'next/head';
import 'tachyons';
import './fonts.css';
import './styles.css';
import Nav from '../components/Nav';

const App = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>Euan Marten Portfolio</title>
      <meta
        name="description"
        content="Euan Marten is an illustrator & designer with a BA in Illustration from Norwich University of the Arts."
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQjUwkQ.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>

    <div className="sans-serif">
      <a tabIndex={1} href="#start-of-content" className="show-on-focus">Skip to content</a>
      <div className="pa4">
        <Nav />
      </div>
      <Component {...pageProps} />
    </div>
  </Fragment>
);

export default App;
