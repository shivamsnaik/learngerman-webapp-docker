import Navbar from './Navbar'
import styles from '../styles/Page.module.scss'
import { ClassAttributes, ComponentProps, HTMLAttributes, ReactElement } from 'react';
import { PropTypes } from '@mui/material';


type PageProps = {
  children: any,
  style?: any
  classes?: string,
}; 

const Page = ({children, style, classes}: PageProps) => {
  
  return(
      <div className={`flex flex-grow flex-col w-full bg-white`}>
        <div className={`relative flex flex-1`}>
          <div className='w-full mt-[70px] sm:mt-[120px]'>
            <div className={`w-full h-full flex max-w-4xl mx-auto px-3 ${classes}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;

