import { useState } from 'react'
import { CreditCard, Shield, Zap, CheckCircle, ArrowRight, Sparkles, Lock, Home, Star, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import './StripePremiumPage.css'

export const StripePremiumPage = () => {
    const navigate = useNavigate()
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null)

    const handlePurchase = (product) => {
        setIsProcessing(true)
        setSelectedProduct(product.id)

        // Analytics tracking
        if (window.gtag) {
            gtag('event', 'begin_checkout', {
                item_id: product.id,
                item_name: product.name,
                value: product.price,
                currency: 'EUR'
            })
        }

        // Redirect to Stripe
        setTimeout(() => {
            window.open(product.stripePaymentLink, '_blank')
            setIsProcessing(false)
            setSelectedProduct(null)
        }, 800)
    }

    return (
        <div className="stripe-premium-container">
            {/* Animated Background */}
            <div className="animated-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Hero Section */}
            <div className="stripe-hero">
                <button onClick={() => navigate('/')} className="back-home-btn">
                    <Home size={20} /> Volver al Inicio
                </button>

                <div className="hero-content">
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Productos Premium LifePlus</span>
                    </div>

                    <h1 className="hero-title">
                        Transforma tu Bienestar
                    </h1>

                    <p className="hero-subtitle">
                        Productos exclusivos de nutrición y bienestar con pago seguro y acceso inmediato
                    </p>

                    <div className="hero-features">
                        <div className="feature-item">
                            <Shield size={20} />
                            <span>Pago 100% Seguro</span>
                        </div>
                        <div className="feature-item">
                            <Zap size={20} />
                            <span>Envío Inmediato</span>
                        </div>
                        <div className="feature-item">
                            <Lock size={20} />
                            <span>Datos Protegidos</span>
                        </div>
                        <div className="feature-item">
                            <Star size={20} />
                            <span>Calidad Premium</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <CreditCard size={40} />
                    </div>
                    <div className="floating-card card-2">
                        <Shield size={40} />
                    </div>
                    <div className="floating-card card-3">
                        <CheckCircle size={40} />
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="products-section">
                <div className="section-header">
                    <div className="section-badge">
                        <TrendingUp size={16} />
                        <span>Más Vendidos</span>
                    </div>
                    <h2>Nuestros Productos Exclusivos</h2>
                    <p>Selecciona el producto perfecto para alcanzar tus objetivos de bienestar</p>
                </div>

                <div className="premium-products-grid">
                    {products
                        .filter(product => product.stripePaymentLink && product.stripePaymentLink.trim() !== '')
                        .map((product, index) => (
                            <div
                                key={product.id}
                                className={`premium-product-card ${hoveredCard === product.id ? 'hovered' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onMouseEnter={() => setHoveredCard(product.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Product Image */}
                                <div className="product-image-container">
                                    <div className="image-glow"></div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="popular-badge">
                                        <Star size={14} />
                                        <span>Popular</span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="product-info">
                                    <div className="card-header">
                                        <span className="product-badge">{product.category}</span>
                                    </div>

                                    <h3 className="product-title">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>

                                    <div className="product-price-section">
                                        <div className="price-container">
                                            <span className="currency">€</span>
                                            <span className="price-amount">{product.price}</span>
                                        </div>
                                        <div className="price-label">Precio especial</div>
                                    </div>

                                    <ul className="product-features">
                                        <li>
                                            <CheckCircle size={16} />
                                            <span>Fórmula premium certificada</span>
                                        </li>
                                        <li>
                                            <CheckCircle size={16} />
                                            <span>Envío gratuito en 24-48h</span>
                                        </li>
                                        <li>
                                            <CheckCircle size={16} />
                                            <span>Garantía de satisfacción</span>
                                        </li>
                                        <li>
                                            <CheckCircle size={16} />
                                            <span>Soporte nutricional incluido</span>
                                        </li>
                                    </ul>

                                    <button
                                        onClick={() => handlePurchase(product)}
                                        disabled={isProcessing && selectedProduct === product.id}
                                        className={`purchase-btn ${isProcessing && selectedProduct === product.id ? 'processing' : ''}`}
                                    >
                                        {isProcessing && selectedProduct === product.id ? (
                                            <>
                                                <div className="spinner"></div>
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={20} />
                                                Comprar Ahora
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Trust Section */}
            <div className="trust-section">
                <h3>¿Por qué Comprar con Stripe?</h3>
                <div className="trust-grid">
                    <div className="trust-item">
                        <div className="trust-icon">
                            <Shield size={32} />
                        </div>
                        <h4>Máxima Seguridad</h4>
                        <p>Certificación PCI DSS Nivel 1, el más alto estándar de seguridad en pagos online</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">
                            <Lock size={32} />
                        </div>
                        <h4>Datos Encriptados</h4>
                        <p>Toda tu información está protegida con encriptación de grado bancario</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">
                            <Zap size={32} />
                        </div>
                        <h4>Proceso Instantáneo</h4>
                        <p>Completa tu compra en segundos y recibe confirmación inmediata</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">
                            <CheckCircle size={32} />
                        </div>
                        <h4>Garantía Total</h4>
                        <p>30 días de garantía de devolución si no estás completamente satisfecho</p>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods-section">
                <p>Métodos de pago aceptados</p>
                <div className="payment-logos">
                    <span>💳 Visa</span>
                    <span>💳 Mastercard</span>
                    <span>🍎 Apple Pay</span>
                    <span>📱 Google Pay</span>
                    <span>💰 American Express</span>
                </div>
            </div>
        </div>
    )
}

export default StripePremiumPage
