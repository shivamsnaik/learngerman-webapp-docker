import Page from "../components/Page"
import styles from "../styles/index.module.scss"
import { useEffect, useState } from "react"
import { database } from '../firebaseConfig';
import { CollectionReference, DocumentData, collection, getDocs } from 'firebase/firestore';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

// Defines the DataGrid header properties
const columns: GridColDef[] = [
  { field: 'word', headerName: 'Word', flex: 1 },
  { field: 'meaning', headerName: 'Meaning', flex: 1, },
];

// Capitalizes the words fetched from the server (for UI)
const capitalizeWords = (words: string) => {
  return words
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Home() {

  // Props
  const [nounsCollection, setNounsCollection] = useState(collection(database, "german-words-nouns"));
  const [VerbsCollection, setVerbsCollection] = useState(collection(database, "german-words-verbs"));
  const [AdjectivesCollection, setAdjectivesCollection] = useState(collection(database, "german-words-adjectives"));
  const [nounsList, setNounList] = useState([])
  const [verbsList, setVerbList] = useState([])
  const [adjectiveList, setAdjectiveList] = useState([])

  const [wordMeaning, setWordMeaning] = useState("");

  // Used by Tabs to choose the default tab
  const [value, setValue] = useState("nouns");

  // Fetches the data from provided collections and sets the props
  const fetchWordsFromCollection = (collection, setList) => {
    const wordsList = []
    getDocs(collection)
      .then(data => {
        data.docs.map((item) => {
          const word = item.data()["word"];
          const meaning = item.data()["meaning"];
          wordsList.push({ "word": capitalizeWords(word), "meaning": capitalizeWords(meaning) })

          setList(wordsList)
        });
      });
  };

  const getWords = () => {
    fetchWordsFromCollection(nounsCollection, setNounList)
    fetchWordsFromCollection(VerbsCollection, setVerbList)
    fetchWordsFromCollection(AdjectivesCollection, setAdjectiveList)
  };

  useEffect(() => {
    getWords()
  }, []);

  const displayMeaning = (e: any) => {
    e.preventDefault();
    setWordMeaning(e.currentTarget.getAttribute("id"))
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Page>
        <div className={styles.page_content}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} charia-label="lab API tabs example">
                <Tab label="Nouns" value="nouns" />
                <Tab label="Verbs" value="verbs" />
                <Tab label="Adjectives" value="adjectives" />
              </TabList>
            </Box>
            <TabPanel value="nouns" className={styles.nouns_container}>
              <div className={styles.table}>
                <DataGrid
                  autoPageSize
                  rows={nounsList}
                  columns={columns}
                  getRowId={(row) => row.word}
                  sx={{
                    overflowX: "scroll",
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '10px' },
                  }}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "word", sort: "asc" }]
                    },
                    pagination: {
                      paginationModel: { page: 0 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  getRowHeight={() => "auto"}
                />
              </div>
            </TabPanel>
            <TabPanel value="verbs" className={styles.verbs_container}>
              <div className={styles.table}>
                <DataGrid
                  autoPageSize
                  rows={verbsList}
                  columns={columns}
                  getRowId={(row) => row.word}
                  sx={{
                    overflowX: "scroll",
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '10px'},
                  }}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "word", sort: "asc" }]
                    },
                    pagination: {
                      paginationModel: { page: 0 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  getRowHeight={() => "auto"}
                />
              </div>
            </TabPanel>
            <TabPanel value="adjectives" className={styles.adjectives_container}>
              <div className={styles.table}>
                <DataGrid
                  autoPageSize
                  rows={adjectiveList}
                  columns={columns}
                  getRowId={(row) => row.word}
                  sx={{
                    overflowX: "scroll",
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '10px' },
                  }}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "word", sort: "asc" }]
                    },
                    pagination: {
                      paginationModel: { page: 0 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  getRowHeight={() => "auto"}
                />
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </Page>
    </>
  );
};

