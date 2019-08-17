import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Euan Marten Portfolio</title>
          <meta name="description" content="Euan Marten is an illustrator & designer with a BA in Illustration from Norwich University of the Arts." />
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
