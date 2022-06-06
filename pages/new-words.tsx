import Page from "../components/Page"
import styles from "../styles/NewWords.module.scss"
import { useEffect, useRef, useState } from "react"
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs, CollectionReference, setDoc, doc } from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, browserSessionPersistence} from 'firebase/auth';
import {Spinner} from 'react-bootstrap'

import Button from "../components/Button"

export default function NewWords() {

  const [pageInitialized, setPageInitStatus] = useState(false)
  const [dbInstance, setDbInstance] = useState(collection(database, "german-word-meanings"));
  const username = useRef(null);
  const password = useRef(null);
  const word = useRef(null);
  const meaning = useRef(null);
  const addWordResponse = useRef(null);

  const [userSignedIn, setUserSigninStatus] = useState(false);
  

  useEffect(() => {

    // Init firebase and constantly check for authentication state change
    const auth = getAuth();
    auth.setPersistence(browserSessionPersistence)
    onAuthStateChanged(auth, (user) => {
      if(user){
        //User is logged in
        console.log("User is logged in")
        setUserSigninStatus(true)
      }
      else{
        //User logged out
        console.log("User is not logged in")
      }

      // Initializes the page DOM elements for user to login or enter words (if already logged in.)
      setPageInitStatus(true)


    });

  },[userSignedIn]);

  // Authenticate the user on Firebase
  const authenticateUser = (e:any) => {
    e.preventDefault();
    const auth = getAuth()
    signInWithEmailAndPassword(auth, username.current.value, password.current.value)
      .then((userCredential) => {
        setUserSigninStatus(true)
      })
      .catch((error) => {
        console.log(error.code, error.message)
      });
  };

  // Add the entered word and its meaning to the firestore database
  const  addWordToList = (event:any) => {
    event.preventDefault();
    addDoc(dbInstance, {
      word: word.current.value.toLowerCase(),
      meaning: meaning.current.value.toLowerCase()
    })
      .then(()=> {

      })
      .catch(error => {
        console.log("ERROR: ", error.code, error.message)
      });

  };


    return (

              <Page style={{marginTop: "5rem"}}>
                {!pageInitialized
                ?
                  <div style={{display: "flex", justifyContent: "center"}}>
                    <Spinner style={{justifyContent: "center"}} animation="border" size="sm" />
                  </div>
                :
                  <>
                    { userSignedIn 
                    ?
                    <>
                      <p className={styles.headline}>Enter the word and its meaning</p>
                      <div className={styles.form_content}>
                        <div className={styles.word_wrapper}>
                          <input ref={word} key={"word"} type="text" name="word" required={true} placeholder="Word" autoComplete="off"/>
                        </div>
                        <div className={styles.meaning_wrapper}>
                          <input ref={meaning} key={"meaning"}  type="text" name="meaning" required={true} placeholder="Meaning" autoComplete="off"/>
                        </div>
                        <Button onClick={addWordToList}>Submit</Button>
                        <p ref={addWordResponse}></p>
                      </div>
                    </>
                    : 
                    <>
                      <p className={styles.headline}>Enter your credentials</p>
                      <div className={styles.form_content}>
                        <div className={styles.username_wrapper}>
                          <input ref={username} key={"username"}  type="text" name="username" required={true} placeholder="Username"/>
                        </div>
                        <div className={styles.password_wrapper}>
                          <input ref={password} key={"password"}  type="password" name="password" required={true} placeholder="Password"/>
                        </div>
                        <Button onClick={authenticateUser}>Submit</Button> 
                      </div>
                    </>
                    }
                  
                  </>
                }
                
              </Page>
    );
};
