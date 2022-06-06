import Page from "../components/Page"
import List from "../components/List"
import TextArea from "../components/TextArea"
import styles from "../styles/index.module.scss"
import { useEffect, useState } from "react"
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs, CollectionReference } from 'firebase/firestore';
import { Carousel } from "react-bootstrap"

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
      <>
      <Page>
        <p className={styles.tag_line}>Guten Tag! Los geht's!</p>
        <div className={styles.page_content}>
          <Carousel  className={styles.corousal} interval={null}>
          {wordList.map(item => {
                    return(
                      <Carousel.Item key={item["word"]} className={styles.corousal_item}>
                          <h3 className={styles.word_text}>{item["word"]}</h3>
                          <Carousel.Caption>
                            <p className={styles.meaning_text}>{item["meaning"]}</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                    )
          })}
            
          </Carousel>
        </div> 
      </Page>
      </>
    );
};
