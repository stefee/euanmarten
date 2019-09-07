import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import 'tachyons';
import '../style.css';
import Nav from '../components/Nav';

const getProcessEnv = () => process.env;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const env = getProcessEnv();

    return (
      <Container>
        <Head>
          <title>Euan Marten Portfolio</title>
          <meta name="description" content="Euan Marten is an illustrator & designer with a BA in Illustration from Norwich University of the Arts." />
        </Head>

        <div className="sans-serif">
          <div className="pa4">
            <Nav />
          </div>
          <Component {...pageProps} env={env} />
        </div>
      </Container>
    );
  }
}

export default MyApp;
