const server = require('express').Router()
const { Cart, User } = require('../db.js')
const { REACT_APP_BACK_URL } = process.env
const { REACT_APP_FRONT_URL } = process.env
const mercadopago = require('mercadopago')
const { ACCESS_TOKEN } = process.env
mercadopago.configure({ access_token: ACCESS_TOKEN })

server.post('/', (req, res) => {
  console.log(req.body)
  let cartId = 0
  req.body.cartItems.forEach((e) => (cartId = e.caridtId))
  let userId = req.body.userId
  let orderUserSeparator = '.'
  const items_ml = req.body.cartItems.map((i) => ({
    title: i.name,
    unit_price: Number(i.price),
    quantity: i.quantity || 1
  }))
  let preference = {
    items: items_ml,
    external_reference: `${cartId}` + `${orderUserSeparator}` + `${userId}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: 'atm'
        }
      ],
      installments: 3 //Cantidad máximo de cuotas
    },
    back_urls: {
      success: `${REACT_APP_BACK_URL}/mercadopago/pagos`,
      failure: `${REACT_APP_BACK_URL}/mercadopago/pagos`,
      pending: `${REACT_APP_BACK_URL}/mercadopago/pagos`
    },
    shipments: {
      receiver_address: {
        zip_code: '',
        street_name: '',
        street_number: 11,
        floor: '',
        apartment: ''
      }
    }
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.info('respondio')
      global.id = response.body.id
      console.log(response.body)
      res.json(response)
    })
    .catch(function (error) {
      console.log(error)
    })
})

//despues de pagar
//Ruta que recibe la información del pago
server.get('/pagos', (req, res) => {
  console.log(req.query)
  const {
    collection_id,
    collection_status,
    payment_id,
    status,
    external_reference,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    processing_mode,
    merchant_account_id
  } = req.query
  console.info('EN LA RUTA PAGOS ', req)
  console.log('EXTERNAL REFERENCE ', external_reference)
  Cart.findByPk(cartId)
    .then(async (order) => {
      order.payment_id = payment_id
      order.payment_status = payment_status
      order.merchant_order_id = merchant_order_id
      order.status = status
      console.info('Salvando order')
      order.save()
      let user = await User.findOne({
        where: {
          id: order.userId
        }
      })
      // sendEmail(user.firstname, user.email, user.lastname, order.id)
      Cart.create({
        userId: userId
      })
        .then((_) => {
          console.info('redirect success')
          return res.redirect(`${REACT_APP_FRONT_URL}/mercadopago/pagos`)
        })
        .catch((err) => {
          console.error('error al salvar', err)
          return res.redirect(`${REACT_APP_FRONT_URL}/?error=${err}&where=al+salvar`)
        })
    })
    .catch((err) => {
      console.error('error al buscar', err)
      return res.redirect(`${REACT_APP_FRONT_URL}/?error=${err}&where=al+buscar`)
    })
})

//Busco información de una orden de pago
/* server.get('/pagos/:id', (req, res) => {
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info('Buscando el id', id)
  mp.get(`/v1/payments/search`, { status: 'pending' }) //{"external_reference":id})
    .then((resultado) => {
      console.info('resultado', resultado)
      res.json({ resultado: resultado })
    })
    .catch((err) => {
      console.error('No se consulto:', err)
      res.json({
        error: err
      })
    })
})  */

module.exports = server
