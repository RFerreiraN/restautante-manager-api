import z from 'zod'

const orderSchema = z.object({
  user: z.string().min(1, { message: 'ID user required' }),
  items: z.array(z.object({ product: z.string().min(1), quantity: z.number().int().positive().min(1) })).min(1),
  status: z.enum(['pending', 'preparing', 'ready', 'delivered']).optional(),
  table: z.string().min(1),
  total: z.number().positive()
})

export function validateOrder(object) {
  return orderSchema.safeParse(object)
}

export function validatePartialOrder(object) {
  return orderSchema.partial().safeParse(object)
}
