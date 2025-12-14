
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <div className="container" style={{ textAlign: 'center', padding: '50px' }}>Cargando...</div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}
