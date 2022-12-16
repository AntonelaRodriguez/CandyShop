const { Router } = require('express')
const userRouter = require('./userRouter.js')
const productRouter = require('./productRouter.js')
const categoryRouter = require('./categoryRouter')
const router = Router()
/* const PaymentController = require('../Controllers/PaymentController')
const PaymentService = require('../services/PaymentService')
const PaymentInstance = new PaymentController(new PaymentService()) */
const mercadoPago = require('../controllers/mercadopago')
const mercadoPagoRouter = require('./mercadoPagoRouter')
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
//mercado pago get de info del producto
router.use('/mercadopago', mercadoPagoRouter)

module.exports = router
