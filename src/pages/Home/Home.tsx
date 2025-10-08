import { useCallback, useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import LoadingIndicator from '../../components/LoadingIndicator'
import RepoList from '../../components/RepoList'
import SearchForm from '../../components/SearchForm'
import UserProfileCard from '../../components/UserProfileCard'
import { useGithubSearch } from '../../hooks/useGithubSearch'
import styles from './Home.module.css'

function HomePage() {
  const [query, setQuery] = useState('')
  const [username, setUsername] = useState<string | null>(null)
  const { user, repos, loading, error, hasResults, reload } = useGithubSearch(
    username,
  )

  const handleSubmit = useCallback(() => {
    const trimmed = query.trim()
    if (!trimmed) return
    setUsername(trimmed)
    reload()
  }, [query])

  const handlePreset = (value: string) => {
    setQuery(value)
    setUsername(value)
    reload()
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Find GitHub profiles in seconds</h1>
        <p className={styles.heroDescription}>
          Explore developer profiles and their standout repositories. Type a username
          to get started.
        </p>
        <SearchForm
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div className={styles.tips}>
          <span className={styles.tipsLabel}>Try searching for:</span>
          <button
            type="button"
            className={styles.tipButton}
            onClick={() => handlePreset('afifizzudn')}
          >
            afifizzudn
          </button>
        </div>
      </section>

      {loading && <LoadingIndicator label="Fetching GitHub data…" />}

      {error && !loading && <ErrorMessage message={error} onRetry={reload} />}

      {!loading && hasResults && user && <UserProfileCard user={user} />}

      {!loading && hasResults && repos.length > 0 && <RepoList repos={repos} />}
    </div>
  )
}

export default HomePage

