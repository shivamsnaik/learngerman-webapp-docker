import '../styles/globals.scss'
import Head from 'next/head'
import React from 'react'
import styles from '../styles/Page.module.scss'
import Navbar from '../components/Navbar'

const navbar_list:{"title":string, "id":string}[]= [
  {
    "title": "Add Word",
    "id": "new-words"
  },
  {
    "title": "Der Die Das",
    "id": "der-die-das-lookup"
  },
  {
    "title": "About",
    "id": "about"
  },
]

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Deutsch Lernen</title>
      </Head>
      <div className='h-screen flex flex-col'>
        <Navbar title={"German Learning App"} navbar_list = {navbar_list}/>
        <Component {...pageProps} />
        <footer className={`flex-1 max-h-[50px] relative flex mt-2 py-3 border-t-2 drop-shadow-xl bg-footer_color border-primary_color`}>
          <div className='flex justify-center items-center w-full max-w-4xl mx-auto text-black'>
            <p className='flex flex-row items-center'>mit &ensp;<span>
            <img src="/heart_india.svg" alt="Vercel Logo" className={`${styles.logo}`} /></span>&ensp;in Deutschland gemacht</p>
          </div>
        </footer>
        </div>
    </>
  
  );
}

export default MyApp
