
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Dashboard } from './pages/Dashboard'
import { EmailConfirmed } from './pages/EmailConfirmed'
import { PaymentSuccessPage } from './pages/PaymentSuccessPage'
import { PaymentErrorPage } from './pages/PaymentErrorPage'
import { StripePremiumPage } from './pages/StripePremiumPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />

        {/* Payment Routes - Public (no auth required) */}
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/error" element={<PaymentErrorPage />} />

        {/* Stripe Premium Page - Public (no auth required) */}
        <Route path="/stripe-premium" element={<StripePremiumPage />} />

        {/* Landing Page - TEMPORARILY PUBLIC for testing design */}
        {/* Landing Page - Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard route kept just in case, but Landing is now main protected view */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
