import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard"

function App() {
  const [auth, setAuth] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false) // Add loading screen?

  const isAuthRoutes = (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )

  const unauthRoutes = (
    <>
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )

  const authStateSwitch = (
    <>
      {hasLoaded && (auth === true ? isAuthRoutes : unauthRoutes)}
    </>
  )

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store'
      }
    }).then(res => {
      return res.json()
    }).then(json => {
      console.log(json)
      setAuth(json.isAuth)
      setHasLoaded(true)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <>
    <BrowserRouter>
      {authStateSwitch}
    </BrowserRouter>
    </>
  )
}

export default App;