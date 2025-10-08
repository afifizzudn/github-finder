import type { GithubRepo } from '../../types/github'
import RepoCard from '../RepoCard'
import styles from './RepoList.module.css'

interface RepoListProps {
  repos: GithubRepo[]
}

function RepoList({ repos }: RepoListProps) {
  if (repos.length === 0) {
    return (
      <section className={styles.empty}>
        <p>No repositories found for this user.</p>
      </section>
    )
  }

  return (
    <section className={styles.list}>
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>Top Repositories</h3>
        <span>Sorted by stars</span>
      </header>
      <div className={styles.grid}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  )
}

export default RepoList
