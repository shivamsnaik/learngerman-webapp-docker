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
    ["Add New Words","/new-words"],
  ]
  
  return(
      <div className={styles.container}>
        <div className={styles.sub_container}>
          <Navbar title={"German Learning App"} navbar_list = {navbar_list}/>
          <div className={styles.content_wrapper}>
            <div className={styles.page_content} style={style}>
              {children}
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
            <p>mit</p>
            <img src="/heart.svg" alt="Vercel Logo" className={styles.logo} />&ensp; <p>in Deutschland gemacht</p>

        </footer>
      </div>
  );
};

export default Page;

