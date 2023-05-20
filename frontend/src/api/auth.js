/**
 * Get new csrf token.
 *
 * @returns {JSON} - Response data.
 */
export async function getCsrfToken(data) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/csurf`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store'
      }
    })
  return await res.json()
}

/**
 * Check if user is logged in.
 *
 * @returns {JSON} - Response data.
 */
export async function isAuthorized(data) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store'
      }
    })
  return await res.json()
}