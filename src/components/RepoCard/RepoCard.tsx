import { Link } from 'react-router-dom'
import type { GithubRepo } from '../../types/github'
import styles from './RepoCard.module.css'

interface RepoCardProps {
  repo: GithubRepo
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <Link
          to={`/repo/${repo.owner.login}/${repo.name}`}
          className={styles.title}
        >
          {repo.name}
        </Link>
        <a
          className={styles.external}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${repo.name} on GitHub`}
        >
          ↗
        </a>
      </div>
      {repo.description && (
        <p className={styles.description}>{repo.description}</p>
      )}
      <dl className={styles.stats}>
        <div className={styles.statsItem}>
          <dt className={styles.statsLabel}>Stars</dt>
          <dd className={styles.statsValue}>{repo.stargazers_count}</dd>
        </div>
        <div className={styles.statsItem}>
          <dt className={styles.statsLabel}>Forks</dt>
          <dd className={styles.statsValue}>{repo.forks_count}</dd>
        </div>
        {repo.language && (
          <div className={styles.statsItem}>
            <dt className={styles.statsLabel}>Language</dt>
            <dd className={styles.statsValue}>{repo.language}</dd>
          </div>
        )}
      </dl>
      <p className={styles.updated}>
        Updated {new Date(repo.updated_at).toLocaleDateString()}
      </p>
    </article>
  )
}

export default RepoCard
