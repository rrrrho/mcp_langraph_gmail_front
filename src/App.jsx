import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from './pages/Chat.tsx'

function App() {
  // App states to track different processes and store values
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [serverStatus, setServerStatus] = useState(false)
  const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    // check if server is even running
    const checkServerStatus = async () => {
      try {
        // get health endpoint of the server
        const response = await fetch(`${BASE_URL}/health`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
          // if server is running, set the server status
          const data = await response.json()
          setServerStatus(data.status === 'ok')
        } else {
          // else set server status to false
          setServerStatus(false)
        }
      } catch (error) {
        console.log('Server not available: ', error)
        setServerStatus(false)
      }
    }

    // check if server is authenticated
    const checkAuth = async () => {
      try {
        // get authentication status of the server
        const response = await fetch(`${BASE_URL}/status`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
          // if server is authenticated, set the authentication status and user email
          const data = await response.json()
          setIsAuthenticated(data.authenticated)
          setUserEmail(data.userEmail)
        } else {
          // else set the authentication status and user email to false and empty
          setIsAuthenticated(false)
          setUserEmail('')
        }
      } catch (error) {
        console.log('Server not authenticated: ', error)
        setIsAuthenticated(false)
        setUserEmail('')
      }
    }

    // check if server is running and authenticated
    checkServerStatus()
    checkAuth()
  }, [BASE_URL, serverStatus])

    // handle logout request
  const handleGoogleLogout = async () => {
    try {
      // send logout request to the server
      await fetch(`${BASE_URL}/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
      })
    } catch (error) {
      console.log('Logout request failed: ', error)
    }

    // set the authentication status and user email to false and empty
    setIsAuthenticated(false)
    setUserEmail('')
  }

  return (
    <Routes>
      <Route path="/" element={<Chat isAuthenticated={isAuthenticated} userEmail={userEmail}/>}/>
    </Routes>
  )
}

export default App
