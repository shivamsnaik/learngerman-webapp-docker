import Page from "../components/Page"
import Navbar from '../components/Navbar'

export default function Home() {
    return (
          <Page>
            <p style={{fontSize: "2.5rem", fontWeight: "bold"}}>Guten Tag! Los geht's!</p>
            <div style={{marginTop: "100px", display: "flex", flexDirection:"row", justifyContent:"space-evenly"}}>
              <input style={{maxWidth: "20rem", margin: "0 10px 0 10px"}} name="words" placeholder="Enter a word"/>
              <button style={{maxWidth: "10rem", margin: "0 10px 0 10px"}}> Enter word </button>
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
