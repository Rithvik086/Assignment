import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import App from './App.jsx'
import Login from './Login.jsx'
import TaskPage from './TaskPage.jsx'
import Protected from './Protected.jsx'
import Logs from './Logs.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, Component: App },
      { path: "/login", Component: Login },

    ]
  },
  {
    path: '/tasks',
    Component: Protected,
    children: [{ index: true, Component: TaskPage }]
  },
  {
    path:'/logs',
    Component: Protected,
    children: [{index:true,Component:Logs}]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
