
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            // For easier testing, we'll assume email confirmation is disabled or handled by the backend
            // and redirect directly to login after successful registration.
            // In a production environment, you would typically wait for email confirmation.
            const { error, data } = await signUp(email, password, {
                options: {
                    emailRedirectTo: `${window.location.origin}/login` // Redirect to login after email confirmation (if enabled)
                }
            })
            if (error) throw error
            if (data?.user?.identities?.length === 0) {
                setError('El usuario ya existe')
                return
            }
            // For development: user is auto-confirmed, redirect to login
            setMsg('Cuenta creada. Redirigiendo al login...')
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="auth-container">
            <h2 className="auth-title">Crear Cuenta</h2>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            {msg && <p style={{ color: 'green', marginBottom: '1rem' }}>{msg}</p>}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Registrarse</button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                ¿Ya tienes cuenta? <a href="/login" style={{ color: 'var(--primary-green)' }}>Inicia sesión</a>
            </p>
        </div>
    )
}
