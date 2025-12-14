
import { useAuth } from '../context/AuthContext'

export const Dashboard = () => {
    const { user, signOut } = useAuth()

    return (
        <div className="container">
            <div className="category-header">
                <h2 className="category-title">Panel de Control</h2>
                <p>Bienvenido, {user?.email}</p>
                <div style={{ marginTop: '20px' }}>
                    <p>Esta es tu área privada. Aquí podrás gestionar tus pedidos y favoritos próximamente.</p>
                </div>
                <button
                    onClick={signOut}
                    className="nav-btn"
                    style={{ backgroundColor: 'var(--primary-green)', color: 'white', marginTop: '30px', display: 'inline-flex', padding: '10px 20px' }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}
