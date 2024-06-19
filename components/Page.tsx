import Navbar from './Navbar'
import styles from '../styles/Page.module.scss'
import { HTMLAttributes, ReactElement } from 'react';


type PageProps = {
  children: any,
  style?: any
}; 

const Page = ({children, style}: PageProps) => {

  const navbar_list = [
    ["About","/about"],
    ["Add Words","/new-words"],
  ]
  
  return(
      <div className={`${styles.container} flex w-full`}>
        <div className={`relative flex flex-1`}>
          <Navbar title={"German Learning App"} navbar_list = {navbar_list}/>
          <div className='w-full mt-[70px] sm:mt-[120px]'>
            <div className='w-full flex justify-center items-center max-w-4xl mx-auto'>
              {children}
            </div>
          </div>
        </div>
        <footer className={`relative flex mt-2 py-3 border-t-2`}>
            <div className='flex justify-center items-center w-full max-w-4xl mx-auto'>
              <p className='flex flex-row items-center'>mit &ensp;<span>
              <img src="/heart_india.svg" alt="Vercel Logo" className={`${styles.logo}`} /></span>&ensp;in Deutschland gemacht</p>
            </div>

        </footer>
      </div>
  );
};

export default Page;

