import axios, { type AxiosRequestConfig } from 'axios'
import type { GithubRepo, GithubRepoDetail, GithubUser } from '../types/github'

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  },
})

async function getFromGithub<T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await githubClient.get<T>(endpoint, config)
    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error
    }

    let message = 'Failed to load data from GitHub'

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        message = 'Data not found'
      } else if (error.message) {
        message = error.message
      }
    }

    throw new Error(message)
  }
}

export const githubApi = {
  getUser: (username: string, config?: AxiosRequestConfig) =>
    getFromGithub<GithubUser>(`/users/${encodeURIComponent(username)}`, config),
  getUserRepos: (username: string, config?: AxiosRequestConfig) =>
    getFromGithub<GithubRepo[]>(
      `/users/${encodeURIComponent(username)}/repos`,
      config,
    ),
  getRepoDetail: (owner: string, repo: string, config?: AxiosRequestConfig) =>
    getFromGithub<GithubRepoDetail>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
      config,
    ),
}
