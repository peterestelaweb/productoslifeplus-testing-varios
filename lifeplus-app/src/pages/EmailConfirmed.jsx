import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const EmailConfirmed = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [countdown, setCountdown] = useState(3)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    navigate(user ? '/' : '/login')
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [navigate, user])

    return (
        <div className="auth-container" style={{ marginTop: '100px' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
                <h2 className="auth-title">¡Email Confirmado!</h2>
                <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                    Tu cuenta ha sido verificada correctamente.
                </p>
                <p style={{ marginTop: '10px', color: 'var(--text-light)', fontSize: '14px' }}>
                    Redirigiendo en {countdown} segundos...
                </p>
                <button
                    onClick={() => navigate(user ? '/' : '/login')}
                    className="btn-primary"
                    style={{ marginTop: '30px' }}
                >
                    {user ? 'Ir al Catálogo' : 'Ir al Login'}
                </button>
            </div>
        </div>
    )
}
