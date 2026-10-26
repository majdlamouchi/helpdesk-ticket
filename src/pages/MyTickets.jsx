import { useEffect, useState } from 'react'
import { api } from '../api.js'
import StatusBadge from '../components/StatusBadge.jsx'

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

export default function MyTickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getMyTickets()
      .then(setTickets)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="muted">Chargement de vos tickets…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <div className="page-head">
        <h1>Mes tickets</h1>
        <span className="muted">{tickets.length} ticket{tickets.length > 1 ? 's' : ''}</span>
      </div>

      {tickets.length === 0 ? (
        <div className="card empty">Vous n’avez encore ouvert aucun ticket.</div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>Titre</th><th>Catégorie</th><th>Priorité</th>
                <th>Statut</th><th>Technicien</th><th>Créé le</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t._id ?? t.id}>
                  <td>{t.title}</td>
                  <td className="cap">{t.category}</td>
                  <td><span className={`prio prio-${t.priority}`}>{t.priority}</span></td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>{t.technician?.name ?? t.technician_name ?? <span className="muted">Non assigné</span>}</td>
                  <td>{fmtDate(t.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
