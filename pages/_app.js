import '../styles/globals.scss'
import Head from 'next/head'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Deutsch Lernen</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>  
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"/> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  
  );
}

export default MyApp
