
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn, signInWithGoogle } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { error } = await signIn(email, password)
            if (error) throw error
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleGoogle = async () => {
        try {
            const { error } = await signInWithGoogle()
            if (error) throw error
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="auth-container">
            <h2 className="auth-title">Iniciar Sesión</h2>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="btn-primary">Entrar</button>
            </form>
            <div style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>o</div>
            <button onClick={handleGoogle} className="btn-primary btn-google" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span>Continuar con Google</span>
            </button>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                ¿No tienes cuenta? <a href="/register" style={{ color: 'var(--primary-green)' }}>Regístrate</a>
            </p>
        </div>
    )
}
