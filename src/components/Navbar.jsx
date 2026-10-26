import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'

const LINKS = {
  user: [{ to: '/tickets', label: 'Mes tickets' }],
  technician: [{ to: '/kanban', label: 'Tableau Kanban' }],
  admin: [{ to: '/stats', label: 'Statistiques' }],
}
const ROLE_LABEL = { user: 'Utilisateur', technician: 'Technicien', admin: 'Administrateur' }

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <span className="brand">Helpdesk</span>
      <nav>
        {(LINKS[user.role] || []).map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="navbar-user">
        <span>{user.name} <small>({ROLE_LABEL[user.role]})</small></span>
        <button className="btn btn-ghost" onClick={handleLogout}>Se déconnecter</button>
      </div>
    </header>
  )
}
