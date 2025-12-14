# Guía de Despliegue a BannaHostin

## 📦 Archivos a Subir

Después de ejecutar `npm run build`, se creará una carpeta llamada **`dist`** con estos archivos:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [otros archivos]
└── .env (NO subir este archivo)
```

**IMPORTANTE**: Sube TODO el contenido de la carpeta `dist` a tu servidor.

---

## 🌐 Configuración del Subdominio

### 1. Crear el Subdominio en BannaHostin

1. Entra a tu panel de BannaHostin (cPanel)
2. Ve a **"Subdominios"**
3. Crea un nuevo subdominio, por ejemplo: `catalogo.tudominio.com`
4. Anota la ruta donde se creó (normalmente `/public_html/catalogo` o similar)

### 2. Subir los Archivos

**Opción A: FileZilla (FTP)**
1. Conecta por FTP a tu servidor
2. Ve a la carpeta del subdominio (ej: `/public_html/catalogo`)
3. Sube TODO el contenido de la carpeta `dist` (NO la carpeta dist misma, sino su contenido)

**Opción B: Administrador de Archivos (cPanel)**
1. Ve al "Administrador de Archivos"
2. Navega a la carpeta del subdominio
3. Sube todos los archivos de `dist`

### 3. Configurar Variables de Entorno

Como los archivos `.env` no se suben por seguridad, necesitas configurar las variables en el servidor:

**Crea un archivo `.htaccess` en la raíz de tu subdominio con este contenido:**

```apache
# Configuración para React Router (SPA)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Variables de entorno (NO RECOMENDADO - Ver alternativa abajo)
# SetEnv VITE_SUPABASE_URL https://rljlxmdctcipwulasmic.supabase.co
# SetEnv VITE_SUPABASE_ANON_KEY tu_clave_aqui
```

**⚠️ MEJOR OPCIÓN**: Las variables de Vite se "queman" en el build. Necesitas:

1. **ANTES de hacer `npm run build`**, crea un archivo `.env.production` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://rljlxmdctcipwulasmic.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamx4bWRjdGNpcHd1bGFzbWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDk1NzgsImV4cCI6MjA4MTA4NTU3OH0.Nr9zZs2lNeYufNeR1p_s-iFS3a3KuAaMHDzO8AsmF3A
```

2. Ejecuta `npm run build` de nuevo
3. Sube los archivos generados

---

## 🔧 Configuración de Supabase para Producción

### 1. Actualizar Site URL

Ve a [Supabase URL Configuration](https://supabase.com/dashboard/project/rljlxmdctcipwulasmic/auth/url-configuration)

**Site URL**: Cambia de `http://localhost:5173/email-confirmed` a:
```
https://catalogo.tudominio.com/email-confirmed
```

### 2. Agregar Redirect URLs

En la sección **"Redirect URLs"**, agrega:

```
https://catalogo.tudominio.com/email-confirmed
https://catalogo.tudominio.com
```

### 3. Actualizar Google OAuth

Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

En tu OAuth Client, agrega a **"URIs de redireccionamiento autorizados"**:

```
https://rljlxmdctcipwulasmic.supabase.co/auth/v1/callback
```

(Esta ya debería estar, solo verifica que esté)

---

## ✅ Verificación Post-Despliegue

1. **Visita tu subdominio**: `https://catalogo.tudominio.com`
2. **Prueba el login con Google**: Debería funcionar
3. **Prueba el registro con email**: Recibirás un email con el enlace correcto
4. **Verifica la confirmación**: Al hacer clic en el email, deberías ver "✅ Email Confirmado"

---

## 🐛 Solución de Problemas

### Error: "Página en blanco"
- Verifica que subiste TODO el contenido de `dist`, no la carpeta `dist` misma
- Revisa que el archivo `.htaccess` esté en la raíz

### Error: "Failed to fetch" o problemas de CORS
- Verifica que las variables de entorno estén correctas en `.env.production`
- Reconstruye con `npm run build`

### Google Auth no funciona
- Verifica que la URL de Supabase esté en Google Cloud Console
- Verifica que el Site URL en Supabase sea tu dominio de producción

---

## 📝 Resumen de Pasos

1. ✅ Crear `.env.production` con las credenciales de Supabase
2. ✅ Ejecutar `npm run build`
3. ✅ Crear subdominio en BannaHostin
4. ✅ Subir contenido de `dist` al servidor
5. ✅ Crear archivo `.htaccess` para React Router
6. ✅ Actualizar Site URL y Redirect URLs en Supabase
7. ✅ Probar la aplicación en producción
