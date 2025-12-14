# Lemon Squeezy Setup Instructions
**LifePlus Payment Integration**

## 🍋 Lemon Squeezy Setup - Guía Rápida

### Paso 1: Crear Cuenta Lemon Squeezy
1. Ve a: https://lemonsqueezy.com/signup
2. Regístrate con tu email de LifePlus
3. Verifica tu email
4. Completa tu perfil de negocio

### Paso 2: Configurar tu Store
1. Crea un nuevo "Store"
2. Nombre: "LifePlus Store"
3. URL: lifeplus-store (o lo que prefieras)
4. Moneda: EUR (Euros)
5. País: España

### Paso 3: Crear tus Productos
Para cada uno de tus 4 productos:

#### Producto 1 (€29.99)
- **Nombre**: LifePlus Producto 1
- **Descripción**: Producto premium de bienestar y nutrición
- **Precio**: €29.99
- **Variants**: 1 unidad
- **Imagen**: Sube la imagen del producto

#### Producto 2 (€39.99)
- **Nombre**: LifePlus Producto 2
- **Descripción**: Fórmula avanzada para rendimiento óptimo
- **Precio**: €39.99

#### Producto 3 (€49.99)
- **Nombre**: LifePlus Producto 3
- **Descripción**: Suplemento de alta calidad para recuperación
- **Precio**: €49.99

#### Producto 4 (€59.99)
- **Nombre**: LifePlus Producto 4
- **Descripción**: Pack completo de bienestar y energía
- **Precio**: €59.99

### Paso 4: Obtener los Checkout Links
Para cada producto:
1. Ve a "Products" → selecciona producto
2. Click en "Share" → "Copy checkout link"
3. Copia el link (formato: `https://your.lemonsqueezy.com/buy/product-id`)

### Paso 5: Actualizar tus Links en el Código
Edita `src/data/products.js` y reemplaza los placeholders:

```javascript
// ANTES:
lemonSqueezyLink: 'https://your.lemonsqueezy.com/buy/product-1'

// DESPUÉS (ejemplo):
lemonSqueezyLink: 'https://lemonsqueezy.lemonsqueezy.com/checkout/buy/abc123-def456'
```

**⚠️ IMPORTANTE**: Reemplaza solo los links, mantén todo lo demás igual.

### Paso 6: Configurar Webhooks (Opcional pero Recomendado)
1. Ve a "Settings" → "Webhooks"
2. Añade webhook URL: `https://tudominio.com/payment/success`
3. Eventos a escuchar:
   - order_created
   - subscription_payment_success
   - order_updated

### Paso 7: Testeo Final
1. Visita tu app: http://localhost:5174
2. Verifica que aparezcan ambas opciones (Stripe + Lemon Squeezy)
3. Testea Lemon Squeezy con modo "test mode"
4. Verifica que redirija correctamente

---

## 🔧 Qué hará el código automáticamente:

- ✅ **Detecta** si tienes links de Lemon Squeezy configurados
- ✅ **Muestra** ambas opciones si están disponibles
- ✅ **Oculta** Lemon Squeezy si no está configurado
- ✅ **Fallback** automático a Stripe si Lemon Squeezy falla

## 📋 Checklist Final:
- [ ] Cuenta Lemon Squeezy creada
- [ ] 4 productos configurados
- [ ] 4 checkout links obtenidos
- [ ] Links actualizados en `products.js`
- [ ] Testeo completado
- [ ] Todo funciona correctamente

---

## 💡 Ventajas de Lemon Squeezy:
- **🏆 Merchant of Record**: Maneja todos los impuestos automáticamente
- **⚡ Super Simple**: Más fácil que Paddle/Stripe para configurar
- **🌍 Global Perfecto**: Ideal para mercado español + internacional
- **💰 Comisión Mejor**: 5% vs 10% de alternativas
- **🇪🇸 Soporte Nativo**: Español nativo

## 🚀一旦完成，你就拥有了一个双重支付系统！
Once complete, you'll have a dual payment system!