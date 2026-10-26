import { mockUsers, mockTickets } from './mockData.js'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const BASE_URL = '/api'
const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// ---------- Helper générique : ajoute le token JWT à chaque requête ----------
async function request(path, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('token')
  const res = await fetch(BASE_URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    // 401 = token expiré -> retour au login
    if (res.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    // Messages de validation du serveur : { error: "..." } ou { errors: ["...", "..."] }
    const msg = Array.isArray(data.errors) ? data.errors.join(' • ') : data.error
    throw new Error(msg || `Erreur ${res.status}`)
  }
  return data
}

// ---------- Fonctions exposées aux pages ----------
export const api = {
  // POST /auth/login -> { token, user: {id, name, email, role} }
  async login(email, password) {
    if (USE_MOCK) {
      await wait()
      const user = mockUsers.find((u) => u.email === email)
      if (!user) throw new Error('Email ou mot de passe incorrect')
      return { token: 'mock-token', user }
    }
    return request('/auth/login', { method: 'POST', body: { email, password } })
  },

  // GET /tickets/mine -> tickets de l'utilisateur connecté (avec technician_name)
  async getMyTickets() {
    if (USE_MOCK) {
      await wait()
      return mockTickets.filter((t) => t.user_id === 1)
    }
    return request('/tickets/mine')
  },

  // GET /tickets?status=&priority=&technician=  (Sprint 3 - Kanban)
  async getTickets(filters = {}) {
    if (USE_MOCK) {
      await wait()
      return mockTickets
    }
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v))
    const qs = params.toString()
    return request('/tickets' + (qs ? `?${qs}` : ''))
  },
}
