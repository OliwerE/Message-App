import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard"

import GlobalCsrfTokenStateContext from './contexts/GlobalCsrfTokenStateContext'

import { getCsrfToken, isAuthorized } from './api/auth'

function App() {
  const [auth, setAuth] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false) // Add loading screen?
  const [csrfToken, setCsrfToken] = useState('')

  const updateCsrfToken = () => {
    getCsrfToken().then((json) => {
      setCsrfToken(json.csrfToken)
      console.log(json.csrfToken)
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
    isAuthorized().then(json => {
      console.log(json)
      setAuth(json.isAuth)
      updateCsrfToken()
      setHasLoaded(true)
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