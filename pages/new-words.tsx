import Page from "../components/Page"
import styles from "../styles/NewWords.module.scss"
import { useEffect, useRef, useState } from "react"
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs, CollectionReference, setDoc, doc } from 'firebase/firestore';
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged, browserSessionPersistence } from 'firebase/auth';
import { Spinner } from 'react-bootstrap'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { FormControl } from '@mui/material';

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
  const [isUsernameCorrect, setUsernameCorrect] = useState(true);
  const [isPasswordCorrect, setPasswordCorrect] = useState(true);
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [word, setWord] = useState(null)
  const [meaning, setMeaning] = useState(null)
  const [wordType, setWordType] = useState(null)
  const [isWordFormFilled, setWordFormFilled] = useState(true)
  const [wordSubmitted, setWordSubmitted] = useState(false)
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

    // Unset the "error" prop for inputs before checking the authentication
    setUsernameCorrect(true)
    setPasswordCorrect(true)

    const auth = getAuth()
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        setUserSigninStatus(true)
        // hides the wrong password if it is being displayed 
        !isPasswordCorrect && setPasswordCorrect(true)
      })
      .catch((error) => {
        if(error.code == "auth/missing-email")
          setUsernameCorrect(false)
        else if(error.code == "auth/missing-password")
          setPasswordCorrect(false)
        console.log(error.code, error.message)
        
      });
  };

  // Add the entered word and its meaning to the firestore database
  const addWordToList = (event: any) => {
    event.preventDefault();
    
    // Disable error prop from all inputs before processing the inputs
    setWordFormFilled(true)

    // If any of the inputs are empty, throw an error
    if(!word || !meaning || !wordType){
      setWordFormFilled(false)
      return;
    }
    let collectionName = null;
    if (wordType === "noun") { collectionName = "german-words-nouns" }
    else if (wordType === "verb") { collectionName = "german-words-verbs" }
    else { collectionName = "german-words-adjectives" }
    
    addDoc(collection(database, collectionName), {
      word: word,
      meaning: meaning
    })
      .then((res) => {
        // Set prop to show submitted icon if word was successfully submitted
        setWordSubmitted(true)

        // Disable submitted icon after 3 seconds
        setTimeout(() => {
          setWordSubmitted(false)
        }, 3000);
      })
      .catch(error => {
        console.log("ERROR: ", error.code, error.message)
      });
  };


  return (

    <Page classes="pt-48 sm:pt-32 justify-center">
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
              <Box
                id="new-word-form"
                component="form"
                noValidate
                autoComplete="off"
                className={styles.form_content}>
                <TextField
                  error={isWordFormFilled?false:true}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setWord(event.target.value);
                  }}
                  required id="word-description" label="Word" variant="outlined" />
                <TextField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMeaning(event.target.value);
                  }}
                  error={isWordFormFilled?false:true}
                  required id="word-meaning" label="Meaning" variant="outlined" />
                <TextField
                  error={isWordFormFilled?false:true}
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
                <Button variant="contained" onClick={addWordToList}>
                  <span style={{display: "flex"}}>
                    Submit
                    {wordSubmitted && <CheckCircleIcon/>}
                  </span>
                </Button>
                <p ref={addWordResponse}></p>
              </Box>
            </div>
            :
            <div className={styles.pageWrapper}>
              <p className={styles.headline}>Enter your credentials</p>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                className={styles.form_content}>
                
                <TextField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
                  error={!isUsernameCorrect?true:false}
                  required id="username" label="Username" variant="outlined" />
                <TextField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                  }}
                  error={!isPasswordCorrect?true:false}
                  type="password"
                  required id="password" label="password" variant="outlined" />
                {true && <Button type="submit" className={styles.button} variant="contained" onClick={authenticateUser}>Submit</Button>}
              </Box>
            </div>
          }

        </>
      }

    </Page>
  );
};
