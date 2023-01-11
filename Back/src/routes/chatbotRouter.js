const { Router } = require('express')
const chatBot = Router()
const natural = require('natural')
const train = require('../train/train.js')
const classifier = new natural.BayesClassifier()
train(classifier)
classifier.train()

chatBot.post('/send', (req, res) => {
  const { message } = req.body

  const classification = classifier.classify(message)

  const responses = {
    miNombre: 'Lo siento no tengo nombre, puesto que soy un bot',
    saludo: 'Hola como estas ?',
    bien: 'Me alegro de oír eso',
    mal: 'Lamento oir eso',
    noEntiendo: 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?',
    entrega: 'Nuestros horarios de entrega son de lunes a viernes de 9:00 a.m. a 5:00 p.m.',
    'atencion al cliente':
      'Nuestros horarios de atención al cliente son de lunes a viernes de 9:00 a.m. a 5:00 p.m.',
    devoluciones:
      'Para hacer una devolución, por favor contáctanos a través de nuestro formulario de contacto o envía un correo electrónico a info@tienda.com con tu número de pedido y una descripción del producto que deseas devolver.',
    cambios:
      'Para hacer un cambio, por favor contáctanos a través de nuestro formulario de contacto o envía un correo electrónico a info@tienda.com con tu número de pedido y una descripción del producto que deseas cambiar.',
    terminosYcondiciones:
      'Nuestros términos y condiciones se encuentran disponibles en nuestro sitio web en la sección "Términos y Condiciones".',
    politicasDePrivacidad:
      'Nuestras políticas de privacidad se encuentran disponibles en nuestro sitio web en la sección "Políticas de Privacidad".',
    direccion: 'Nuestra dirección es: 123 Main Street, Ciudad, País',
    tiendaFisica: 'Sí, tenemos una tienda física ubicada en 123 Main Street, Ciudad, País.',
    hacerUnPedido:
      'Para hacer un pedido, por favor añade los productos que deseas a tu carrito de compras y sigue las instrucciones del proceso de pago.',
    procesoDePago:
      'El proceso de pago es seguro y se realiza a través de nuestro sistema de pago en línea. Aceptamos tarjetas de crédito y débito, así como también pagos con PayPal.',
    metodosDePago: 'Aceptamos tarjetas de crédito y débito, así como también pagos con PayPal.',
    desconocido: 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?',
    agradecimiento:"Estamos encantados de haber podido ayudarlo.",
    agradecido:"Nos complace haber sido de ayuda."
  }

  return res.json({ response: responses[classification], meMesssage: message })
})

module.exports = chatBot
