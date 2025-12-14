# Guía Maestra: Implementación de Autenticación con Google (OAuth)

Este script está diseñado para una presentación paso a paso. Úsalo para recordar exactamente qué hacer o para presentar el proceso.

---

## 🟢 DIAPOSITIVA 1: Portada
**Título:** Implementación de Login con Google (OAuth 2.0)
**Subtítulo:** Guía Práctica Local & Producción
**Imagen sugerida:** Un diagrama simple mostrando: Usuario -> Login Google -> App -> Supabase.

**Notas del Orador:**
"Hoy veremos cómo integrar el inicio de sesión con Google en nuestra aplicación React utilizando Supabase como backend. Este es el estándar moderno para autenticación segura."

---

## 🟢 DIAPOSITIVA 2: ¿Qué necesitamos?
**Título:** Requisitos Previos
**Contenido (Lista):**
1. Cuenta de Google Cloud Platform (GCP).
2. Proyecto en Supabase.
3. Aplicación React (Vite).
4. Librería `@supabase/supabase-js`.

**Imagen sugerida:** Logos de React, Supabase y Google Cloud juntos.

---

## 🟢 DIAPOSITIVA 3: Paso 1 - Configuración en Google Cloud
**Título:** 1. Crear Credenciales en Google Cloud
**Pasos:**
1. Ir a `console.cloud.google.com`.
2. Crear un nuevo proyecto.
3. Ir a "APIs & Servicios" > "Credenciales".
4. Crear "ID de cliente de OAuth".

**Imagen sugerida:** Captura de pantalla de la pantalla "Crear ID de cliente de OAuth" en Google Cloud Console.

---

## 🟢 DIAPOSITIVA 4: Configurar Pantalla de Consentimiento
**Título:** 2. Pantalla de Consentimiento OAuth
**Pasos:**
1. Seleccionar "Externo" (para que cualquiera con cuenta Google pueda entrar).
2. Rellenar nombre de la app y correos de contacto.
3. No es necesario añadir "Scopes" extra por ahora.
4. **Importante:** Añadir usuarios de prueba si la app está en modo "Testing".

**Imagen sugerida:** Captura del formulario de "Pantalla de consentimiento de OAuth".

---

## 🟢 DIAPOSITIVA 5: Obtener Claves (Client ID & Secret)
**Título:** 3. Obtener el Client ID y Client Secret
**Acción:**
Al terminar de crear el cliente OAuth, Google te mostrará dos claves críticas.

**Imagen sugerida:** Captura del modal que muestra "Tu ID de cliente" y "Tu secreto de cliente".
*Nota: Resalta en rojo dónde están estos dos valores.*

---

## 🟢 DIAPOSITIVA 6: Configuración en Supabase
**Título:** 4. Conectar Supabase con Google
**Pasos:**
1. Ir al Dashboard de Supabase > Authentication > Providers.
2. Seleccionar "Google".
3. Pegar el **Client ID** y **Client Secret** obtenidos en el paso anterior.
4. Copiar la "Callback URL" que te da Supabase.

**Imagen sugerida:** Captura de la configuración de Google en el dashboard de Supabase con las claves pegadas.

---

## 🟢 DIAPOSITIVA 7: Autorizar Redirección en Google
**Título:** 5. El paso CRÍTICO: Callback URL
**Acción:**
Volver a Google Cloud Console y pegar la URL de Supabase.

**Código/Texto Clave:**
En "URIs de redireccionamiento autorizados" poner:
`https://<TU-PROYECTO>.supabase.co/auth/v1/callback`

**Imagen sugerida:** Captura de Google Cloud Console mostrando el campo "URIs de redireccionamiento autorizados" con la URL de Supabase ingresada.

---

## 🟢 DIAPOSITIVA 8: Código - El Cliente Supabase
**Título:** 6. Inicializar Supabase en React
**Archivo:** `src/lib/supabaseClient.js`

**Imagen sugerida:** Captura de código de este archivo.

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 🟢 DIAPOSITIVA 9: Código - AuthContext
**Título:** 7. Lógica de Autenticación (Context)
**Archivo:** `src/context/AuthContext.jsx`
**Explicación:** Creamos una función `signInWithGoogle` que llama a Supabase.

**Imagen sugerida:** Captura del bloque de la función `signInWithGoogle`.

```javascript
const signInWithGoogle = () => {
    return supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}
```

---

## 🟢 DIAPOSITIVA 10: Código - Botón de Login
**Título:** 8. El Botón en LoginPage
**Archivo:** `src/pages/LoginPage.jsx`
**Explicación:** Conectamos el botón con la función del contexto.

**Imagen sugerida:** Captura del botón en el código y cómo se ve en la pantalla.

```javascript
const handleGoogle = async () => {
    try {
        const { error } = await signInWithGoogle()
        if (error) throw error
    } catch (err) {
        setError(err.message)
    }
}

// En el JSX:
<button onClick={handleGoogle} className="btn-google">
    Continuar con Google
</button>
```

---

## 🟢 DIAPOSITIVA 11: Resultado Final
**Título:** 9. ¡Funcionando!
**Flujo:**
1. Usuario clickea "Google".
2. Redirige a cuentas de Google.
3. Usuario elige cuenta.
4. Vuelve a nuestra App autenticado.

**Imagen sugerida:** Un GIF o secuencia de 3 imágenes:
1. Página de Login.
2. Selector de cuentas de Google.
3. Página de Dashboard (logueado).

---

## 🟢 DIAPOSITIVA 12: Solución de Problemas Comunes
**Título:** Troubleshooting
**Errores Frecuentes:**
- **Error 400: redirect_uri_mismatch:** No pusiste la URL de Supabase en Google Cloud.
- **Error 401: invalid_client:** Copiaste mal el Client ID o Secret (¡cuidado con los espacios!).
- **Redirección infinita:** Revisa las reglas de `ProtectedRoute`.

**Imagen sugerida:** Icono de alerta o herramienta de reparación.

---

## 🟢 DIAPOSITIVA 13: Resumen
**Título:** Conclusión
**Checklist de éxito:**
- [x] Proyecto en Google Cloud creado.
- [x] Credenciales configuradas en Supabase.
- [x] URI de callback autorizado en Google.
- [x] Código implementado en React.

**Nota:** "Una vez configurado, ¡es el método más seguro y rápido para los usuarios!"
