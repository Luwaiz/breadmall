const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function submitOrder(orderPayload) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unable to submit order.' }))
    throw new Error(error.message || 'Unable to submit order.')
  }

  return response.json()
}

// Fetch all orders (Requires Admin authorization)
export async function getOrders() {
  const token = localStorage.getItem('breadmall_admin_token')

  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unable to fetch orders.' }))
    throw new Error(error.message || 'Unable to fetch orders.')
  }

  return response.json()
}

// Fetch specific orders (Public lookups for customer history)
export async function getUserOrders(ids) {
  if (!ids || ids.length === 0) return []

  const response = await fetch(`${API_BASE_URL}/orders/user?ids=${ids.join(',')}`)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unable to retrieve order history.' }))
    throw new Error(error.message || 'Unable to retrieve order history.')
  }

  return response.json()
}

// Fetch all products (public, used by the storefront)
export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unable to fetch products.' }))
    throw new Error(error.message || 'Unable to fetch products.')
  }

  return response.json()
}

// Add a new product (Requires Admin authorization)
export async function createProduct(productPayload) {
  const token = localStorage.getItem('breadmall_admin_token')

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(productPayload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unable to add product.' }))
    throw new Error(error.message || 'Unable to add product.')
  }

  return response.json()
}

// Authenticate Admin credentials
export async function loginAdmin(username, password) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Authentication failed.' }))
    throw new Error(error.message || 'Invalid username or password.')
  }

  return response.json() // returns { token }
}
