import Page from "../components/Page"
import styles from "../styles/NewWords.module.scss"
import { useEffect, useRef, useState } from "react"
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs, CollectionReference, setDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, browserSessionPersistence } from 'firebase/auth';
import { Spinner } from 'react-bootstrap'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const wordTypes = [
  {
    value: "noun",
    label: "Noun"
  },
  {
    value: "verb",
    label: "Verb"
  },
  {
    value: "adjective",
    label: "Adjective"
  }
];

export default function NewWords() {

  const [pageInitialized, setPageInitStatus] = useState(false);
  const [isPasswordCorrect, setPasswordCorrect] = useState(true);
  const username = useRef(null);
  const password = useRef(null);
  const [word, setWord] = useState(null)
  const [meaning, setMeaning] = useState(null)
  const [wordType, setWordType] = useState(null)

  const addWordResponse = useRef(null);

  const [userSignedIn, setUserSigninStatus] = useState(false);


  useEffect(() => {

    // Init firebase and constantly check for authentication state change
    const auth = getAuth();
    auth.setPersistence(browserSessionPersistence)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //User is logged in
        console.log("User is logged in")
        setUserSigninStatus(true)
      }
      else {
        //User logged out
        console.log("User is not logged in")
      }

      // Initializes the page DOM elements for user to login or enter words (if already logged in.)
      setPageInitStatus(true)


    });

  }, [userSignedIn]);

  // Authenticate the user on Firebase
  const authenticateUser = (e: any) => {
    e.preventDefault();
    const auth = getAuth()
    signInWithEmailAndPassword(auth, username.current.value, password.current.value)
      .then((userCredential) => {
        setUserSigninStatus(true)
        // hides the wrong password if it is being displayed 
        !isPasswordCorrect && setPasswordCorrect(true)
      })
      .catch((error) => {
        console.log(error.code, error.message)
        setPasswordCorrect(false)
      });
  };

  // Add the entered word and its meaning to the firestore database
  const addWordToList = (event: any) => {
    event.preventDefault();

    let collectionName = null;
    if(wordType === "noun") {collectionName = "german-words-nouns"}
    else if(wordType === "verb") {collectionName = "german-words-verbs"}
    else {collectionName = "german-words-adjectives"}
    
    addDoc(collection(database, collectionName), {
      word: word,
      meaning: meaning
    })
      .then(() => {

      })
      .catch(error => {
        console.log("ERROR: ", error.code, error.message)
      });
  };


  return (

    <Page style={{ marginTop: "5rem" }}>
      {!pageInitialized
        ?
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner style={{ justifyContent: "center" }} animation="border" size="sm" />
        </div>
        :
        <>
          {userSignedIn
            ?
            <div className={styles.pageWrapper}>
              <p className={styles.headline}>Enter the word and its meaning</p>
              <div className={styles.form_content}>
                <TextField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setWord(event.target.value);
                  }}
                  required id="word-description" label="Word" variant="outlined" />
                <TextField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMeaning(event.target.value);
                  }}
                  required id="word-meaning" label="Meaning" variant="outlined" />
                <TextField
                  value={wordType}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setWordType(event.target.value);
                  }}
                  required
                  id="filled-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select the word type"
                  variant="filled"
                  
                >
                  {wordTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button variant="contained" onClick={addWordToList}>Submit</Button>
                <p ref={addWordResponse}></p>
              </div>
            </div>
            :
            <>
              <p className={styles.headline}>Enter your credentials</p>
              <div className={styles.form_content}>
                <div className={styles.username_wrapper}>
                  <input ref={username} key={"username"} type="text" name="username" required={true} placeholder="Username" />
                </div>
                <div className={styles.password_wrapper}>
                  <input ref={password} key={"password"} type="password" name="password" required={true} placeholder="Password" />
                </div>
                {!isPasswordCorrect && <div className={styles.wrong_password_wrapper}>
                  <p>Wrong Username/Password</p>
                </div>
                }
                <Button onClick={authenticateUser}>Submit</Button>
              </div>
            </>
          }

        </>
      }

    </Page>
  );
};
