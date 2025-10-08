import type { GithubUser } from '../../types/github'
import styles from './UserProfileCard.module.css'

interface UserProfileCardProps {
  user: GithubUser
}

function UserProfileCard({ user }: UserProfileCardProps) {
  const blog = user.blog?.trim()
  const blogUrl = blog
    ? blog.startsWith('http://') || blog.startsWith('https://')
      ? blog
      : `https://${blog}`
    : null

  return (
    <section className={styles.container}>
      <img
        src={user.avatar_url}
        alt={user.name ?? user.login}
        className={styles.avatar}
        loading="lazy"
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{user.name ?? user.login}</h2>
          {user.name && <span className={styles.username}>@{user.login}</span>}
        </div>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
        <div className={styles.meta}>
          {user.location && <span>{user.location}</span>}
          {user.company && <span>{user.company}</span>}
          {blogUrl && (
            <a href={blogUrl} target="_blank" rel="noreferrer">
              Website
            </a>
          )}
        </div>
        <dl className={styles.stats}>
          <div className={styles.statsGroup}>
            <dt className={styles.statsLabel}>Followers</dt>
            <dd className={styles.statsValue}>{user.followers}</dd>
          </div>
          <div className={styles.statsGroup}>
            <dt className={styles.statsLabel}>Following</dt>
            <dd className={styles.statsValue}>{user.following}</dd>
          </div>
          <div className={styles.statsGroup}>
            <dt className={styles.statsLabel}>Repositories</dt>
            <dd className={styles.statsValue}>{user.public_repos}</dd>
          </div>
        </dl>
        <a
          className={styles.cta}
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </div>
    </section>
  )
}

export default UserProfileCard
