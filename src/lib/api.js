const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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
