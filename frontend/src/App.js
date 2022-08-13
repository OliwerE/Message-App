import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard"

function App() {
  const [auth] = useState(true)
  const [hasLoaded] = useState(true) // Add loading screen?

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
        <Route path="/" element={<Login />} />
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

  return (
    <>
    <BrowserRouter>
      {authStateSwitch}
    </BrowserRouter>
    </>
  )
}

export default App;