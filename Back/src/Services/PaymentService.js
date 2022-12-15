const axios = require('axios')

class PaymentService {
  async createPayment(bodyInfo) {
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const body = {
      payer_email: 'comprador@email.com',
      items: bodyInfo.map((p) => {
        return {
          title: p.name,
          description: p.name,
          picture_url: p.image,
          category_id: p.id,
          quantity: 1,
          unit_price: Number(p.price) || 100
        }
      }),
      back_urls: {
        success: 'http://localhost:5173',
        failure: 'http://www.failure.com',
        pending: 'http://www.pending.com'
      },
      notification_url: 'https://www.your-site.com/1pn'
    }

    const payment = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    })

    return payment.data
  }
}

module.exports = PaymentService
