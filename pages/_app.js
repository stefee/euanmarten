import { Fragment } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import 'tachyons';
import './nprogress.css';
import './fonts.css';
import './styles.css';
import NProgress from 'nprogress';
import Nav from '../components/Nav';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
      <span className="white">
        <a href="#start-of-content" className="SkipToContent bg-dark-blue no-underline pa3 ma0 overflow-hidden absolute">
          Skip to content
        </a>
      </span>
      <div className="pa4">
        <Nav />
      </div>
      <Component {...pageProps} />
    </div>
  </Fragment>
);

export default App;
