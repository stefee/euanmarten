import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

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
        <Component {...pageProps} env={env} />
      </Container>
    );
  }
}

export default MyApp;
