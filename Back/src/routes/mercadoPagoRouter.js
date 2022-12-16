const server = require('express').Router()
const { Cart, User } = require('../db.js')
const { REACT_APP_BACK_URL, REACT_APP_FRONT_URL } = process.env

const mercadopago = require('mercadopago')
mercadopago.configure({ access_token: process.env.ACCESS_TOKEN })

server.post('/', async (req, res, next) => {
  let back_url = `${REACT_APP_BACK_URL}/mercadopago/pagos`
  try {
    const { cartId, userId, cartItems } = req.body
    let items = cartItems.map((i) => ({
      title: i.name,
      unit_price: Number(i.price),
      quantity: Number(i.quantity) || 1
    }))
    let preference = {
      items,
      external_reference: `${cartId}.${userId}`,
      payment_methods: {
        excluded_payment_types: [{ id: 'atm' }],
        installments: 3
      },
      back_urls: { success: back_url, failure: back_url, pending: back_url },
      // auto_return: 'approved',
      shipments: {
        receiver_address: {
          zip_code: '',
          street_name: '',
          street_number: 11,
          floor: '',
          apartment: ''
        }
      }
      // no anda esto porque deberia saer un sitio seguro(deploy)
      // notification_url: `${REACT_APP_BACK_URL}/mercadopago/pagos`
    }
    const mercadoResponse = await mercadopago.preferences.create(preference)
    return res.json({ id: mercadoResponse.body.id })
  } catch (error) {
    next(error)
  }
})

server.get('/pagos', async (req, res, next) => {
  try {
    console.log({ ...req.query })
    const { external_reference, status } = req.query
    let reference = external_reference.split('.')
    let cartId = reference[0]
    let userId = reference[1]

    //busco cart y usuario unico
    /*     let cart = await Cart.findByPk(cartId)
    //esto funciona si el usuario existe en la db, es decir el usuario esta logueado
    let user = await User.findByPk(userId)

    if (status === 'approved') cart.status = 'completed'
    if (status === 'rejected') cart.status = 'cancelled'
    if (status === 'pending') cart.status = 'processing' este default

    await cart.save()

    //relacion del cart y el user
    await user.addCart(cart) */
    return res.redirect('http://localhost:5173/')
  } catch (error) {
    next(error)
  }
})

/* server.post('/webhooks', async (req, res) => {
  console.log(req.body)
  const {
    data: { id },
    type
  } = req.body
  try {
    if (id !== '123456789' && type === 'payment') {
      const { data } = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
        }
      })
      console.log(data)
      // console.log(data);
      // const {metadata:{id_shop}} = data;
      // console.log(id_shop);
      // if (data.status === "approved" && data.status_detail === "accredited") {
      //   const docRef = doc(database, "ordenes de compra", id_shop);
      //   updateDoc(docRef, {ispaid:"approved"}).then(docRef => {
      //       console.log("A New Document Field has been added to an existing document");
      //   })
      //   .catch(error => {
      //       console.log(error);
      //   })
      // }
    }
    return res.status(200).send('OK')
  } catch (error) {
    console.log(error)
  }

  return res.status(200).send('OK')
}) */

module.exports = server
