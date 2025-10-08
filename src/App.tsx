import styles from './App.module.css'
import { Outlet, ScrollRestoration } from 'react-router-dom'

function App() {
  return (
    <div className={styles.appShell}>
      <ScrollRestoration />
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>🔍</span>
          <div>
            <p className={styles.title}>GitHub Finder</p>
            <p className={styles.subtitle}>Discover developers and their work</p>
          </div>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className={styles.externalLink}
        >
          Open GitHub
        </a>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Built with ♥ @afifizzudn</p>
      </footer>
    </div>
  )
}

export default App
