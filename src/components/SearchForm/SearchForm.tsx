import type { FormEvent } from 'react'
import styles from './SearchForm.module.css'

interface SearchFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  loading?: boolean
}

function SearchForm({ value, onChange, onSubmit, loading }: SearchFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="username" className={styles.label}>
          GitHub Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="off"
          className={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search developers, e.g. afifizzudn"
          disabled={loading}
        />
      </div>
      <button
        className={styles.submit}
        type="submit"
        disabled={loading || !value.trim()}
      >
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  )
}

export default SearchForm

