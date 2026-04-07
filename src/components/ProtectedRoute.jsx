import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ requiredType = null }) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (requiredType && user?.tipoUsuario?.nome !== requiredType) {
    return <Navigate to="/pesquisa" replace />
  }

  return <Outlet />
}
