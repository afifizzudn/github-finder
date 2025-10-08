import styles from './LoadingIndicator.module.css'

interface LoadingIndicatorProps {
  label?: string
  fullscreen?: boolean
}

function LoadingIndicator({
  label = 'Loading…',
  fullscreen = false,
}: LoadingIndicatorProps) {
  const containerClass = fullscreen
    ? `${styles.container} ${styles.fullscreen}`
    : styles.container

  return (
    <div className={containerClass}>
      <span className={styles.spinner} aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export default LoadingIndicator

