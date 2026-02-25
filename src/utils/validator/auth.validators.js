import { z } from 'zod'

const userSchemaZod = z.object({
  nombre: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export function validateUser(object) {
  return userSchemaZod.safeParse(object)
}
