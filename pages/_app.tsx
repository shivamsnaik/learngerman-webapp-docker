import '../styles/globals.scss'
import Head from 'next/head'
import React from 'react'
import styles from '../styles/Page.module.scss'
import Navbar from '../components/Navbar'

const navbar_list:{"title":string, "id":string}[]= [
  {
    "title": "About",
    "id": "about"
  },
  {
    "title": "Add Word",
    "id": "new-words"
  }
]

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Deutsch Lernen</title>
      </Head>
      <Navbar title={"German Learning App"} navbar_list = {navbar_list}/>
      <Component {...pageProps} />
      <footer className={`relative flex mt-2 py-3 border-t-2 bg-footer_color border-primary_color`}>
            <div className='flex justify-center items-center w-full max-w-4xl mx-auto text-black'>
              <p className='flex flex-row items-center'>mit &ensp;<span>
              <img src="/heart_india.svg" alt="Vercel Logo" className={`${styles.logo}`} /></span>&ensp;in Deutschland gemacht</p>
            </div>

        </footer>
    </>
  
  );
}

export default MyApp
