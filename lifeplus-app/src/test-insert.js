// Probar inserción de datos para verificar permisos RLS
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rljlxmdctcipwulasmic.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamx4bWRjdGNpcHd1bGFzbWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDk1NzgsImV4cCI6MjA4MTA4NTU3OH0.Nr9zZs2lNeYufNeR1p_s-iFS3a3KuAaMHDzO8AsmF3A'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('🧪 Probando permisos de inserción...')

// 1. Primero autenticarse con el usuario de prueba
console.log('\n🔐 Paso 1: Autenticando usuario de prueba...')
const testEmail = 'test@lifeplus.com'
const testPassword = 'test123456'

try {
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  })

  if (signInError) {
    console.log('⚠️ No se puede autenticar (puede necesitar confirmación email):', signInError.message)
  } else {
    console.log('✅ Usuario autenticado:', signInData.user?.id)
  }

  // 2. Intentar insertar en profiles
  console.log('\n📝 Paso 2: Probando inserción en profiles...')
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: '7bc90348-e436-4a55-8690-7f338307c63f', // ID del usuario de prueba
        email: testEmail,
        full_name: 'Usuario de Prueba',
        created_at: new Date().toISOString()
      }
    ])
    .select()

  if (profileError) {
    console.log('❌ Error insertando en profiles:', profileError.message)
    console.log('   Código:', profileError.code)
    console.log('   Detalles:', profileError.details)
  } else {
    console.log('✅ Perfil creado:', profileData)
  }

  // 3. Intentar insertar en products
  console.log('\n🛍️ Paso 3: Probando inserción en products...')
  const { data: productData, error: productError } = await supabase
    .from('products')
    .insert([
      {
        name: 'Producto de Prueba',
        price: 29.99,
        description: 'Esto es un producto de prueba',
        category: 'test',
        created_at: new Date().toISOString()
      }
    ])
    .select()

  if (productError) {
    console.log('❌ Error insertando en products:', productError.message)
    console.log('   Código:', productError.code)
    console.log('   Detalles:', productError.details)
  } else {
    console.log('✅ Producto creado:', productData)
  }

} catch (err) {
  console.log('❌ Error general:', err.message)
}

console.log('\n🏁 Prueba de inserción completada')