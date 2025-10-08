import { useEffect, useState } from 'react'
import { githubApi } from '../services/github'
import type { GithubRepoDetail } from '../types/github'

interface RepoDetailState {
  repo: GithubRepoDetail | null
  loading: boolean
  error: string | null
}

const initialState: RepoDetailState = {
  repo: null,
  loading: false,
  error: null,
}

export function useRepoDetail(
  owner: string | null,
  repoName: string | null,
) {
  const [state, setState] = useState(initialState)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!owner || !repoName) {
      setState(initialState)
      return
    }
    let active = true
    const currentOwner = owner
    const currentRepo = repoName

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const repo = await githubApi.getRepoDetail(currentOwner, currentRepo)

        if (!active) return

        setState({
          repo,
          loading: false,
          error: null,
        })
      } catch (error) {
        if (!active) return

        const message =
          error instanceof Error ? error.message : 'Unexpected error occurred'

        setState({
          repo: null,
          loading: false,
          error: message,
        })
      }
    }

    load()

    return () => {
      active = false
    }
  }, [owner, repoName, reloadKey])

  return {
    repo: state.repo,
    loading: state.loading,
    error: state.error,
    reload: () => setReloadKey((key) => key + 1),
  }
}
