import Navbar from './Navbar'
import styles from '../styles/Page.module.scss'

const Page = ({children}) => {

  const navbar_list = [
    ["About","/about"],
  ]
  
  return(
      <div style={{ backgroundColor: "white"}} className={styles.container}>
        <div style={{flex: "1"}}>
          <Navbar title={"German Learning App"} navbar_list = {navbar_list}/>
          <div className={styles.page_content} style={{}}>
            {children}
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

