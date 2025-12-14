import { useState, useEffect } from 'react'
import { Home, Pill, Dumbbell, Activity, Package, Sprout, Flower2, Sparkles, Wrench, Droplets, LogOut, ShoppingBag, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export const LandingPage = () => {
    const [activeCategory, setActiveCategory] = useState('welcome')
    const { signOut, user } = useAuth()
    const navigate = useNavigate()

    const categories = [
        { id: 'welcome', label: 'Inicio', icon: Home },
        { id: 'nutricionales', label: 'Nutricionales', icon: Pill },
        { id: 'proteinas', label: 'Proteínas', icon: Dumbbell },
        { id: 'deportiva', label: 'Deportiva', icon: Activity },
        { id: 'packs', label: 'Packs', icon: Package },
        { id: 'superfoods', label: 'Superfoods', icon: Sprout },
        { id: 'forever-young', label: 'Forever Young', icon: Flower2 },
        { id: 'personal', label: 'Personal', icon: Sparkles },
        { id: 'accesorios', label: 'Accesorios', icon: Wrench },
        { id: 'agua', label: 'Agua', icon: Droplets },
    ]

    const [searchQuery, setSearchQuery] = useState('')
    const [showScrollTop, setShowScrollTop] = useState(false)

    // Detectar scroll para mostrar botón volver arriba
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Filtrar productos
    const getFilteredProducts = () => {
        let filtered = products;

        // Debug
        console.log('Active Category:', activeCategory);

        // 1. Si hay búsqueda, tiene prioridad global
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase()
            return products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            )
        }

        // 2. Si no hay búsqueda, filtrar por categoría activa
        if (activeCategory !== 'welcome') {
            filtered = products.filter(p => p.category === activeCategory)
        }

        console.log('Filtered Count:', filtered.length);
        return filtered
    }

    const filteredProducts = getFilteredProducts()

    const scrollToCategory = (id) => {
        setActiveCategory(id)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="container">
            {/* Nav Container */}
            <div className="nav-container">
                <div className="nav-buttons">
                    {/* Botón Tienda Premium Destacado */}
                    <button
                        onClick={() => navigate('/stripe-premium')}
                        className="nav-btn"
                        style={{
                            background: 'linear-gradient(135deg, #635bff 0%, #4b45c6 100%)',
                            border: 'none',
                            marginRight: '10px',
                            boxShadow: '0 4px 12px rgba(99, 91, 255, 0.3)'
                        }}
                    >
                        <ShoppingBag size={16} /> Tienda Premium
                    </button>

                    <button
                        className={`nav-btn ${activeCategory === 'welcome' ? 'active' : ''}`}
                        onClick={() => scrollToCategory('welcome')}
                    >
                        <Home size={16} /> Inicio
                    </button>

                    {categories.filter(c => c.id !== 'welcome').map(cat => (
                        <button
                            key={cat.id}
                            className={`nav-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => scrollToCategory(cat.id)}
                        >
                            <cat.icon size={16} /> {cat.label}
                        </button>
                    ))}
                    {/* Logout Button */}
                    {user ? (
                        <button onClick={signOut} className="nav-btn" style={{ marginLeft: 'auto', background: 'var(--primary-green)', borderColor: 'var(--primary-green)' }}>
                            <LogOut size={16} /> Salir ({user.email?.split('@')[0]})
                        </button>
                    ) : (
                        <button onClick={() => navigate('/login')} className="nav-btn" style={{ marginLeft: 'auto', background: 'var(--primary-green)', borderColor: 'var(--primary-green)' }}>
                            <LogOut size={16} /> Iniciar Sesión
                        </button>
                    )}
                </div>
            </div>

            <div className="main-content">
                {/* BUSCADOR */}
                <div style={{ margin: '0 0 30px 0', position: 'relative' }}>
                    <input
                        id="searchInput"
                        type="text"
                        placeholder="🔍 Buscar productos (ej: vitamina, proteína...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            borderRadius: '30px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 8px 25px rgba(46, 125, 50, 0.15)'}
                        onBlur={(e) => e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'}
                    />
                </div>

                {/* SEARCH RESULTS */}
                {searchQuery.length > 0 && (
                    <div className="category-section active">
                        <div className="category-header">
                            <h2 className="category-title">Resultados de búsqueda</h2>
                            <p>Mostrando resultados para "{searchQuery}"</p>
                        </div>
                        <div className="products-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '30px'
                        }}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>No se encontraron productos.</p>
                            )}
                        </div>
                        <button
                            onClick={() => setSearchQuery('')}
                            style={{
                                display: 'block', margin: '30px auto',
                                padding: '10px 20px', borderRadius: '20px',
                                border: '1px solid #ccc', background: 'white', cursor: 'pointer'
                            }}
                        >
                            Limpiar búsqueda
                        </button>
                    </div>
                )}


                {/* CONTENT: WELCOME */}
                {searchQuery.length === 0 && activeCategory === 'welcome' && (
                    <div className="category-section active">
                        <div className="category-header">
                            <h2 className="category-title"><Home style={{ display: 'inline', marginBottom: 5 }} /> Bienvenido a LifePlus Catálogo Premium</h2>
                            <p>Encuentra todos nuestros productos de bienestar en un solo lugar</p>
                        </div>

                        <div className="category-preview-grid">
                            <div className="category-preview-card premium-card" onClick={() => navigate('/stripe-premium')} style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #f6f9fc 100%)',
                                border: '1px solid rgba(99, 91, 255, 0.2)',
                                boxShadow: '0 10px 30px rgba(99, 91, 255, 0.15)'
                            }}>
                                <div className="category-icon-wrapper" style={{ background: '#635bff' }}>
                                    <ShoppingBag size={48} color="white" />
                                </div>
                                <h3 style={{ color: '#635bff' }}>Tienda Premium</h3>
                                <p style={{ color: '#425466' }}>Compra nuestros productos exclusivos con Stripe</p>
                            </div>

                            {categories.filter(c => c.id !== 'welcome').map(cat => (
                                <div key={cat.id} className="category-preview-card" onClick={() => scrollToCategory(cat.id)}>
                                    <div className="category-icon-wrapper">
                                        <cat.icon size={48} color="white" />
                                    </div>
                                    <h3>{cat.label}</h3>
                                    <p>Explora la categoría {cat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CONTENT: PRODUCTS BY CATEGORY */}
                {searchQuery.length === 0 && activeCategory !== 'welcome' && (
                    <div className="category-section active">
                        <div className="category-header">
                            {(() => {
                                const currentCategory = categories.find(c => c.id === activeCategory);
                                return (
                                    <h2 className="category-title">
                                        {currentCategory?.icon && (
                                            <currentCategory.icon style={{ display: 'inline', marginBottom: 5, marginRight: 10 }} />
                                        )}
                                        {currentCategory?.label || activeCategory}
                                    </h2>
                                );
                            })()}
                            <p style={{ marginBottom: '40px' }}>Explora nuestra selección de productos premium</p>
                        </div>

                        <div className="products-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '30px',
                            animation: 'fadeInUp 0.5s ease-out'
                        }}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div style={{
                                    gridColumn: '1 / -1',
                                    textAlign: 'center',
                                    padding: '60px',
                                    background: '#f8f9fa',
                                    borderRadius: '16px',
                                    border: '1px dashed #ced4da'
                                }}>
                                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                                    <h3 style={{ color: '#495057', marginBottom: '10px' }}>Próximamente en esta categoría</h3>
                                    <p style={{ color: '#6c757d' }}>Estamos trabajando para traerte los mejores productos de {categories.find(c => c.id === activeCategory)?.label}.</p>
                                    <button
                                        onClick={() => {
                                            setActiveCategory('welcome');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--stripe-blurple, #635bff)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                    >
                                        Volver al Inicio
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* --- BLOQUE DE BOTONES FLOTANTES PREMIUM --- */}
            <div style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '15px',
                zIndex: 9999,
                alignItems: 'end'
            }}>
                {/* 1. WhatsApp */}
                <a
                    href="https://wa.me/34600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fab-btn"
                    style={{
                        width: '60px', height: '60px',
                        background: '#25D366', color: 'white',
                        borderRadius: '50%', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                        textDecoration: 'none', position: 'relative',
                        cursor: 'pointer', transition: 'transform 0.3s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span style={{
                        position: 'absolute', right: '70px', background: '#333', color: 'white',
                        padding: '5px 10px', borderRadius: '5px', fontSize: '12px', whiteSpace: 'nowrap',
                        pointerEvents: 'none', opacity: 0, transition: 'opacity 0.3s'
                    }} className="fab-tooltip">Chat WhatsApp</span>
                </a>

                {/* 2. Contacto */}
                <div style={{ position: 'relative' }} className="fab-container">
                    <button
                        onClick={() => window.location.href = 'mailto:info@lifeplus.com'}
                        style={{
                            width: '60px', height: '60px',
                            background: '#4CAF50', color: 'white',
                            borderRadius: '50%', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
                            cursor: 'pointer', transition: 'transform 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    </button>
                    <div className="fab-label" style={{
                        position: 'absolute', top: '15px', right: '75px',
                        background: '#222', color: 'white', padding: '8px 15px',
                        borderRadius: '6px', fontSize: '14px', fontWeight: '500',
                        whiteSpace: 'nowrap', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>
                        Formulario de Contacto
                        <div style={{
                            position: 'absolute', right: '-6px', top: '50%', marginTop: '-6px',
                            width: '0', height: '0',
                            borderTop: '6px solid transparent',
                            borderBottom: '6px solid transparent',
                            borderLeft: '6px solid #222'
                        }}></div>
                    </div>
                </div>

                {/* 3. Buscador */}
                <div style={{ position: 'relative' }} className="fab-container">
                    <button
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setTimeout(() => {
                                const input = document.getElementById('searchInput');
                                if (input) input.focus();
                            }, 600);
                        }}
                        style={{
                            width: '60px', height: '60px',
                            background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                            color: 'white',
                            borderRadius: '50%', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(253, 160, 133, 0.6)',
                            cursor: 'pointer', transition: 'transform 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Search size={30} strokeWidth={2.5} />
                    </button>
                    <div className="fab-label" style={{
                        position: 'absolute', top: '15px', right: '75px',
                        background: '#FF8A65', color: 'white', padding: '8px 15px',
                        borderRadius: '6px', fontSize: '14px', fontWeight: '600',
                        whiteSpace: 'nowrap', boxShadow: '0 2px 10px rgba(255, 138, 101, 0.3)'
                    }}>
                        Buscar productos
                        <div style={{
                            position: 'absolute', right: '-6px', top: '50%', marginTop: '-6px',
                            width: '0', height: '0',
                            borderTop: '6px solid transparent',
                            borderBottom: '6px solid transparent',
                            borderLeft: '6px solid #FF8A65'
                        }}></div>
                    </div>
                </div>

                {/* 4. Scroll Top */}
                <button
                    onClick={scrollToTop}
                    title="Volver arriba"
                    style={{
                        width: '50px', height: '50px',
                        background: '#1B5E20', color: 'white',
                        borderRadius: '50%', border: 'none',
                        display: showScrollTop ? 'flex' : 'none',
                        alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                        opacity: showScrollTop ? 1 : 0,
                        transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                </button>
            </div>
        </div>
    )
}

export default LandingPage
