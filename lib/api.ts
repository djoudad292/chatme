const API_URL = 'https://chatbot-temp.onrender.com'

export async function apiFetch(path: string, options?: RequestInit) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || error.error || 'Request failed')
  }
  return res.json()
}

export function getSocketUrl() {
  return 'https://chatbot-temp.onrender.com'
}
