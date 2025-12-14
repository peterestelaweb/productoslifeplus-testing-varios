# Guía: Configurar Google OAuth Correctamente

## Problema Actual
Error 401: invalid_client - Google no reconoce las credenciales.

## Solución: Verificar configuración en Google Cloud Console

### Paso 1: Ir a Google Cloud Console
1. Ve a: https://console.cloud.google.com/apis/credentials
2. Busca tu OAuth 2.0 Client ID (el que termina en `.apps.googleusercontent.com`)
3. Haz clic en el nombre para editarlo

### Paso 2: Verificar URIs de Redirección Autorizados
En la sección **"URIs de redireccionamiento autorizados"**, asegúrate de tener EXACTAMENTE esta URL:

```
https://rljlxmdctcipwulasmic.supabase.co/auth/v1/callback
```

**IMPORTANTE**: 
- Debe empezar con `https://` (no `http://`)
- Debe terminar con `/auth/v1/callback`
- NO debe tener espacios ni caracteres extra

### Paso 3: Copiar credenciales EXACTAS
Una vez guardado el URI de redirección:

1. Copia el **ID de cliente** (debe terminar en `.apps.googleusercontent.com`)
2. Copia el **Secreto del cliente** (debe empezar con `GOCSPX-`)

### Paso 4: Pegar en Supabase
1. Ve a: https://supabase.com/dashboard/project/rljlxmdctcipwulasmic/auth/providers
2. Abre la configuración de **Google**
3. Pega las credenciales EXACTAMENTE como las copiaste
4. Guarda

### Paso 5: Esperar propagación
Después de guardar en Google Cloud, espera **1-2 minutos** antes de probar de nuevo.

## Verificación
Después de estos pasos, prueba el login con Google de nuevo en tu app local.
