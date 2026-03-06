import { Router } from 'express'
import { ProductController } from '../Controller/product.controller.js'
import { authMiddleware } from '../Middleware/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, ProductController.createProduct)

export default router
