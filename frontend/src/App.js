import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard"

import GlobalCsrfTokenStateContext from './contexts/GlobalCsrfTokenStateContext'

function App() {
  const [auth, setAuth] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false) // Add loading screen?
  const [csrfToken, setCsrfToken] = useState('')

  const updateCsrfToken = () => {

    fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/csurf`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store'
      }
    }).then((res) => {
      return res.json()
    }).then((json) => {
      setCsrfToken(json.csrfToken)
      console.log(json.csrfToken)
    }).catch(err => {
      console.error(err)
    })
  }

  const isAuthRoutes = (
    <>
      <Routes>
        <Route path="/" element={<Dashboard auth={auth} setAuth={setAuth} updateCsrfToken={updateCsrfToken} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )

  const unauthRoutes = (
    <>
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} updateCsrfToken={updateCsrfToken} />} />
        <Route path="/register" element={<Register updateCsrfToken={updateCsrfToken} />} />
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
    updateCsrfToken()

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
      <GlobalCsrfTokenStateContext.Provider value={{ csrfToken, updateCsrfToken }}>
        {authStateSwitch}
      </GlobalCsrfTokenStateContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App;