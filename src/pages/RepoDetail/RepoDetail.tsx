import { useNavigate, useParams } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage"
import LoadingIndicator from "../../components/LoadingIndicator"
import { useRepoDetail } from "../../hooks/useRepoDetail"
import styles from "./RepoDetail.module.css"

function RepoDetailPage() {
  const navigate = useNavigate()
  const { owner, repo } = useParams<{ owner: string; repo: string }>()
  const { repo: repoDetail, loading, error, reload } = useRepoDetail(owner ?? null, repo ?? null)
  const handleRetry = () => reload()

  if (!owner || !repo) {
    return (
      <div className={styles.page}>
        <ErrorMessage message='Repository not found.' />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <button type='button' className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {loading && <LoadingIndicator label='Loading repository…' />}

      {error && !loading && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && repoDetail && (
        <article className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.headerTitle}>{repoDetail.name}</h1>
            <p className={styles.headerDescription}>{repoDetail.description ?? "No description provided."}</p>
          </header>
          <section className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Stars</span>
              <span className={styles.statValue}>{repoDetail.stargazers_count}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Forks</span>
              <span className={styles.statValue}>{repoDetail.forks_count}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Watchers</span>
              <span className={styles.statValue}>{repoDetail.watchers_count}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Open Issues</span>
              <span className={styles.statValue}>{repoDetail.open_issues_count}</span>
            </div>
          </section>
          <section className={styles.owner}>
            <img
              src={repoDetail.owner.avatar_url}
              alt={repoDetail.owner.login}
              className={styles.ownerAvatar}
              loading='lazy'
            />
            <div className={styles.ownerMeta}>
              <span>Owner</span>
              <strong>{repoDetail.owner.login}</strong>
            </div>
          </section>
          <section className={styles.links}>
            <a href={repoDetail.html_url} target='_blank' rel='noreferrer' className={styles.primaryLink}>
              View on GitHub ↗
            </a>
            <button type='button' className={styles.refresh} onClick={handleRetry}>
              Refresh data
            </button>
          </section>
        </article>
      )}
    </div>
  )
}

export default RepoDetailPage
