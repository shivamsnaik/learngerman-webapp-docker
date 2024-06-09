import Page from "../components/Page"
import List from "../components/List"
import TextArea from "../components/TextArea"
import styles from "../styles/index.module.scss"
import { useEffect, useState } from "react"
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs, CollectionReference } from 'firebase/firestore';
import { Carousel } from "react-bootstrap"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'word', headerName: 'Nouns', flex: 1},
  { field: 'meaning', headerName: 'Meaning',flex:1.5,},
];

const capitalizeWords = (words:string) => {
  return words
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Home() {

  const [dbInstance, setDbInstance] = useState(collection(database, "german-word-meanings"));
  const [wordList, setWordList] = useState([])
  const [wordMeaning, setWordMeaning] = useState("");
  const getWords = () => {
    getDocs(dbInstance)
      .then(data => {
        const listItems = [];
        data.docs.map((item) => {
          const word = item.data()["word"];
          const meaning = item.data()["meaning"];
          listItems.push({"word": capitalizeWords(word), "meaning": capitalizeWords(meaning)})
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
        <div className={styles.page_content}>
          <div className={styles.table}>
            <DataGrid
              autoPageSize
              rows={wordList}
              columns={columns}
              getRowId={(row) => row.word}
              sx={{
                overflowX: "scroll",
                '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '10px' },
              }}
              initialState={{
                sorting: {
                  sortModel: [{field: "word", sort: "asc"}]
                },
                pagination: {
                  paginationModel: { page: 0},
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection
              getRowHeight={() => "auto"}
            />
          </div>
        </div>
      </Page>
      </>
    );
};

