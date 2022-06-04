import Page from "../components/Page"
import Navbar from '../components/Navbar'
import Textbox from "../components/Textbox";

export default function Home() {

  const displayMeaning = (e) => {
    e.preventDefault();
    console.log("Click triggered by")
  }

    return (
          <Page>
            <p style={{fontSize: "2.5rem", fontWeight: "bold"}}>Guten Tag! Los geht's!</p>
            <div style={{marginTop: "100px", display: "flex", flexDirection: "row"}}>
              <Textbox style={{marginTop: "30px", maxHeight: "15rem"}}>
                <p key={1} onClick={displayMeaning}>Ausdrücken</p>
                <p key={2} onClick={displayMeaning}>Ausdrücken</p>
                <p key={3} onClick={displayMeaning}>Ausdrücken</p>
              </Textbox>
              <Textbox style={{marginTop: "30px", maxHeight: "15rem"}}>
                <p>Helloworld</p>
              </Textbox>
            </div>
                      
          </Page>
    );
          
            {/* <main className={styles.main}>
        <p className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> on Docker!
        </p>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
 */}
};
