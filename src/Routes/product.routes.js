import { Router } from 'express'
import { ProductController } from '../Controller/product.controller.js'
import { authMiddleware } from '../Middleware/auth.middleware.js'
import { roleMiddleware } from '../Middleware/role.middleware.js'

const router = Router()

router.post('/', authMiddleware, ProductController.createProduct)
router.get('/', authMiddleware, ProductController.getAvailableProducts)
router.get('/admin', authMiddleware, roleMiddleware(['admin']), ProductController.getAllProducts)
router.get('/:id', authMiddleware, ProductController.getProductById)
router.patch('/:id', authMiddleware, ProductController.updateProduct)
router.patch('/:id/availability', authMiddleware, roleMiddleware(['admin']), ProductController.updateAvailability)
router.delete('/:id', authMiddleware, ProductController.disableProduct)

export default router
