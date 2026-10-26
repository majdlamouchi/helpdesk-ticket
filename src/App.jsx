import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, homeForRole } from './auth.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import MyTickets from './pages/MyTickets.jsx'
import Kanban from './pages/Kanban.jsx'
import Stats from './pages/Stats.jsx'

export default function App() {
  const { user } = useAuth()
  return (
    <>
      {user && <Navbar />}
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tickets" element={<ProtectedRoute roles={['user']}><MyTickets /></ProtectedRoute>} />
          <Route path="/kanban" element={<ProtectedRoute roles={['technician']}><Kanban /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute roles={['admin']}><Stats /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={user ? homeForRole(user.role) : '/login'} replace />} />
        </Routes>
      </main>
    </>
  )
}
