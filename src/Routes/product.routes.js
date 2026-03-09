import { Router } from 'express'
import { ProductController } from '../Controller/product.controller.js'
import { authMiddleware } from '../Middleware/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.patch('/:id', ProductController.updateProduct)

export default router
