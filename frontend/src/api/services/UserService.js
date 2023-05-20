/**
 * Module represents User API.
 */

/**
 * Create a new user.
 *
 * @param {Object} data - data sent to API.
 * @returns {JSON} - Response data.
 */
export async function createUser(data) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store',
        'CSRF-Token': data.csrfToken
      },
        body: JSON.stringify({ username: data.username, password: data.password })
    })
  return await res.status
}

/**
 * Login user.
 *
 * @param {Object} data - data sent to API.
 * @returns {JSON} - Response data.
 */
export async function loginUser(data) {
  console.log(data)
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store',
        'CSRF-Token': data.csrfToken
      },
        body: JSON.stringify({ username: data.username, password: data.password })
    })
  return await res.status
}

/**
 * Get username from API.
 *
 * @param {Object} data - data sent to API.
 * @returns {JSON} - Response data.
 */
export async function getUsername(data) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/username`, {
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
 * Logout user.
 *
 * @param {Object} data - data sent to API.
 * @returns {JSON} - Response data.
 */
export async function logoutUser(data) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'No-Store',
          'CSRF-Token': data.csrfToken
        },
          body: JSON.stringify({})
      })
  return await res.status
}