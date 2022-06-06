import Page from "../components/Page"
import List from "../components/List"
import TextArea from "../components/TextArea"
import styles from "../styles/index.module.scss"
import { useEffect, useState } from "react"
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs, CollectionReference } from 'firebase/firestore';

export default function Home() {

  const [dbInstance, setDbInstance] = useState(collection(database, "german-word-meanings"));
  const [wordList, setWordList] = useState([])
  const [wordMeaning, setWordMeaning] = useState("");
  const getWords = () => {
    getDocs(dbInstance)
      .then(data => {
        const listItems = [];
        data.docs.map((item) => {
          listItems.push({...item.data()})
        });
        setWordList(listItems);
        console.log(listItems)
    });
  };

  useEffect(() => {
    getWords()
  },[]);

  const displayMeaning = (e:any) => {
    e.preventDefault();
    setWordMeaning(e.currentTarget.getAttribute("id"))
  }

    return (
          <Page style={{height: "100%"}}>
            <p className={styles.tag_line}>Guten Tag! Los geht's!</p>
            <div className={styles.page_content}>
              <div className={styles.list_wrapper}>
                <h3 style={{margin: "0", display:"flex", justifyContent: "center", textDecoration: "underline"}}>List of words</h3>
                <List style={{marginTop: "20px", maxHeight: "15rem"}}>
                  {wordList.map(item => {
                    return(<p id={item["meaning"]} onClick={displayMeaning}>{item["word"]}</p>)
                  })}
                </List>
              </div>
              <hr className={styles.solid_separator}/>
              <div className={styles.textarea_wrapper}>
                <h3 style={{flex:1, margin: "0", display:"flex", justifyContent: "center", alignItems: "center", 
                  maxHeight: "50px"}}>Meaning</h3>
                <TextArea style={{ flex: 10, maxHeight: "15rem"}}>
                  <p placeholder="Word meaning will appear here">{wordMeaning}</p>
                </TextArea>
              </div>

              
            </div>
          </Page>
    );
};
