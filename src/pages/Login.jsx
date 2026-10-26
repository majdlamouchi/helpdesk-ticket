import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth, homeForRole } from '../auth.jsx'

const MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to={homeForRole(user.role)} replace />

  async function submit(e, forcedEmail) {
    e?.preventDefault()
    setError('')
    setLoading(true)
    try {
      const u = await login(forcedEmail || email, password || 'mock')
      navigate(homeForRole(u.role))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-card card">
      <h1>Helpdesk de l’école</h1>
      <p className="muted">Connectez-vous pour suivre vos incidents informatiques.</p>
      <form onSubmit={submit}>
        <label>Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required={!MOCK} />
        </label>
        <label>Mot de passe
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!MOCK} />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn" disabled={loading}>{loading ? 'Connexion…' : 'Se connecter'}</button>
      </form>

      {MOCK && (
        <div className="mock-box">
          <p className="muted">Mode démo (données fictives) : connexion rapide</p>
          <div className="row">
            <button className="btn btn-ghost" onClick={(e) => submit(e, 'user@ecole.tn')}>Utilisateur</button>
            <button className="btn btn-ghost" onClick={(e) => submit(e, 'tech@ecole.tn')}>Technicien</button>
            <button className="btn btn-ghost" onClick={(e) => submit(e, 'admin@ecole.tn')}>Admin</button>
          </div>
        </div>
      )}
    </div>
  )
}
