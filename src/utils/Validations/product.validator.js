import z from 'zod'

const productSchema = z.object({
  nombre: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  available: z.boolean()
})

export function validateProduct(object) {
  return productSchema.safeParse(object)
}
