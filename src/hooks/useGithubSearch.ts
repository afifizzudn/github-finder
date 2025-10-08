import { useEffect, useMemo, useState } from 'react'
import { githubApi } from '../services/github'
import type { GithubRepo, GithubUser } from '../types/github'

interface GithubSearchState {
  user: GithubUser | null
  repos: GithubRepo[]
  loading: boolean
  error: string | null
}

const initialState: GithubSearchState = {
  user: null,
  repos: [],
  loading: false,
  error: null,
}

export function useGithubSearch(username: string | null) {
  const [state, setState] = useState(initialState)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!username) {
      setState(initialState)
      return
    }

    let active = true
    const currentUsername = username

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const [user, repos] = await Promise.all([
          githubApi.getUser(currentUsername),
          githubApi.getUserRepos(currentUsername),
        ])

        const topRepos = repos
          .slice()
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 10)

        if (!active) return
        setState({
          user,
          repos: topRepos,
          loading: false,
          error: null,
        })
      } catch (error) {
        if (!active) return

        const message =
          error instanceof Error ? error.message : 'Unexpected error occurred'

        setState({
          user: null,
          repos: [],
          loading: false,
          error: message,
        })
      }
    }

    load()

    return () => {
      active = false
    }
  }, [username, reloadKey])

  return useMemo(
    () => ({
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      error: state.error,
      hasResults: Boolean(state.user) || state.repos.length > 0,
      reload: () => setReloadKey((key) => key + 1),
    }),
    [state],
  )
}
