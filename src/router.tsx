import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import HomePage from './pages/Home'
import RepoDetailPage from './pages/RepoDetail'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'repo/:owner/:repo',
        element: <RepoDetailPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
