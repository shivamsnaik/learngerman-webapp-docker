import Navbar from './Navbar'
import styles from '../styles/Page.module.scss'
import { HTMLAttributes, ReactElement } from 'react';


type PageProps = {
  children: any,
  style?: any
}; 

const Page = ({children, style}: PageProps) => {
  
  return(
      <div className={`${styles.container} flex w-full`}>
        <div className={`relative flex flex-1`}>
          <div className='w-full mt-[70px] sm:mt-[120px]'>
            <div className='w-full flex items-center max-w-4xl mx-auto px-3'>
              {children}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;

