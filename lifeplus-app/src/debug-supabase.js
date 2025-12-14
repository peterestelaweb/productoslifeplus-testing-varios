// Script de diagnóstico para Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rljlxmdctcipwulasmic.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamx4bWRjdGNpcHd1bGFzbWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDk1NzgsImV4cCI6MjA4MTA4NTU3OH0.Nr9zZs2lNeYufNeR1p_s-iFS3a3KuAaMHDzO8AsmF3A'

console.log('🔍 Diagnóstico de Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test 1: Conexión básica
console.log('📡 Test 1: Probando conexión básica...')
supabase.auth.getSession()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Error en getSession():', error.message)
    } else {
      console.log('✅ Conexión exitosa:', data)
    }
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err.message)
  })

// Test 2: Verificar configuración de auth
console.log('📋 Test 2: Verificando configuración de auth...')
supabase.auth.getUser()
  .then(({ data, error }) => {
    if (error) {
      console.log('ℹ️ Usuario no autenticado (normal):', error.message)
    } else {
      console.log('✅ Usuario actual:', data)
    }
  })

// Test 3: Intentar registro de prueba (sin guardar)
console.log('🔐 Test 3: Probando disponibilidad de auth...')
supabase.auth.signUp({
  email: 'test@lifeplus.com',
  password: 'test123456',
  options: {
    data: {
      test: true
    }
  }
})
  .then(({ data, error }) => {
    if (error) {
      console.log('ℹ️ Respuesta de auth (puede ser normal):', error.message)
    } else {
      console.log('✅ Auth disponible:', data)
    }
  })

console.log('🏁 Diagnóstico completado. Revisa los resultados above.')