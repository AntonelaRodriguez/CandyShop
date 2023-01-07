const { Router } = require('express')
const userRouter = require('./userRouter.js')
const productRouter = require('./productRouter.js')
const categoryRouter = require('./categoryRouter')
const cartRouter = require('./cartRouter')
const detailRouter = require('./detailRouter.js')
const mercadoPagoRouter = require('./mercadoPagoRouter')
const reviewRouter = require('./reviewRouter.js')
const chatbotRouter = require('./chatbotRouter.js')
const subscribeRouter = require('./nodeMailer.js')
const router = Router()
/* const PaymentController = require('../Controllers/PaymentController')
const PaymentService = require('../services/PaymentService')
const PaymentInstance = new PaymentController(new PaymentService()) */

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/cart', cartRouter);
router.use('/detail', detailRouter);
router.use('/chatbot', chatbotRouter);
//mercado pago get de info del producto
router.use('/mercadopago', mercadoPagoRouter)
router.use('/reviews', reviewRouter)
router.use('/subscribe', subscribeRouter)

module.exports = router
