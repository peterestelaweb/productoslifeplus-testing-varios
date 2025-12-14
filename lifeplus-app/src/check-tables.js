// Verificar si las tablas existen en Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rljlxmdctcipwulasmic.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamx4bWRjdGNpcHd1bGFzbWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDk1NzgsImV4cCI6MjA4MTA4NTU3OH0.Nr9zZs2lNeYufNeR1p_s-iFS3a3KuAaMHDzO8AsmF3A'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('🔍 Verificando tablas en Supabase...')

// Lista de tablas que debería haber
const tables = [
  'users',
  'products',
  'orders',
  'profiles',
  'categories'
]

tables.forEach(async (tableName) => {
  console.log(`📋 Verificando tabla: ${tableName}`)

  try {
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.log(`❌ Tabla ${tableName}: ERROR - ${error.message}`)
      if (error.code === 'PGRST116') {
        console.log(`   └─ La tabla "${tableName}" NO existe`)
      } else if (error.code === 'PGRST301') {
        console.log(`   └─ La tabla "${tableName}" existe pero no hay permisos RLS`)
      }
    } else {
      console.log(`✅ Tabla ${tableName}: EXISTE (${count} registros)`)
    }
  } catch (err) {
    console.log(`❌ Tabla ${tableName}: ERROR GENERAL - ${err.message}`)
  }
})

// También verificar información del esquema
setTimeout(async () => {
  console.log('\n🔍 Verificando esquema de la base de datos...')

  try {
    const { data, error } = await supabase
      .rpc('get_table_info') // Esto puede no existir
      .limit(5)

    if (error) {
      console.log('ℹ️ No se puede obtener información detallada del esquema (normal)')
    } else {
      console.log('Tablas encontradas:', data)
    }
  } catch (err) {
    console.log('ℹ️ No hay acceso a información del esquema')
  }

  console.log('\n🏁 Verificación completada')
}, 2000)