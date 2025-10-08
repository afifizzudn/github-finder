export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  html_url: string
  followers: number
  following: number
  public_repos: number
  location: string | null
  company: string | null
  blog: string
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
  }
  topics?: string[]
  updated_at: string
}

export interface GithubRepoDetail extends GithubRepo {
  subscribers_count: number
  open_issues_count: number
  watchers_count: number
}
