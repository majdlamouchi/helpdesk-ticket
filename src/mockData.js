// Données fictives : même format que le contrat d'API (voir README).
// Le back-end renvoie technician_name via un JOIN (null si non assigné).
export const mockUsers = [
  { id: 1, name: 'Sara Ben Ali', email: 'user@ecole.tn', role: 'user' },
  { id: 2, name: 'Karim Trabelsi', email: 'tech@ecole.tn', role: 'technician' },
  { id: 3, name: 'Admin', email: 'admin@ecole.tn', role: 'admin' },
]

const day = 24 * 3600 * 1000
const ago = (d) => new Date(Date.now() - d * day).toISOString()

export const mockTickets = [
  { id: 1, title: 'Projecteur salle B12 ne s’allume pas', description: '', category: 'matériel', priority: 'haute', status: 'ouvert', user_id: 1, technician_id: null, technician_name: null, created_at: ago(1), taken_at: null, resolved_at: null, closed_at: null },
  { id: 2, title: 'Wi-Fi coupé dans le bloc C', description: '', category: 'réseau', priority: 'moyenne', status: 'en_cours', user_id: 1, technician_id: 2, technician_name: 'Karim Trabelsi', created_at: ago(3), taken_at: ago(2), resolved_at: null, closed_at: null },
  { id: 3, title: 'Installer MATLAB sur le PC du labo', description: '', category: 'logiciel', priority: 'basse', status: 'resolu', user_id: 1, technician_id: 2, technician_name: 'Karim Trabelsi', created_at: ago(6), taken_at: ago(5), resolved_at: ago(2), closed_at: null },
  { id: 4, title: 'Clavier cassé poste 14', description: '', category: 'matériel', priority: 'basse', status: 'resolu', user_id: 1, technician_id: 2, technician_name: 'Karim Trabelsi', created_at: ago(15), taken_at: ago(14), resolved_at: ago(9), closed_at: null }, // > 7 jours : réouverture impossible
  { id: 5, title: 'Accès impossible à Moodle', description: '', category: 'logiciel', priority: 'haute', status: 'ferme', user_id: 1, technician_id: 2, technician_name: 'Karim Trabelsi', created_at: ago(20), taken_at: ago(19), resolved_at: ago(18), closed_at: ago(17) },
]
