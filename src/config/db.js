import mongoose from 'mongoose'

export async function conectRestDb() {
  try {
    await mongoose.connect(process.env.URL_DB)
    console.log('Conectado a base de datos')
  } catch (error) {
    console.error('Error al conectar con la base de datos', error)
    process.exit(1)
  }
}
