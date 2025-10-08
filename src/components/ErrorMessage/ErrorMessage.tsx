import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.container} role="alert">
      <strong className={styles.title}>Something went wrong.</strong>
      <p className={styles.description}>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className={styles.retry}>
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage

