import { Button, Heading, Spinner, Stack, Tag, TagLabel, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CardProductCart from '../../Components/CardProductCart/CardProductCart'
import axios from 'axios'

import { paymentToCart } from '../../redux/actions/actions'
import { useLocalStorage } from '../../Components/useLocalStorage/useLocalStorage'
import {useAuth0} from "@auth0/auth0-react"

const Cart = () => {
  const dispatch = useDispatch()
  const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();
  const cart = useSelector((state) => state.cart)
  const [loading, setloading] = useState(true);
  const [storedValue, setStoredValue] = useLocalStorage('cart', [])
  const priceTotal = storedValue?.reduce((acc, curr) => {
    return Number(acc) + Number(curr.price)*Number(curr.quantity)
  }, 0)

  useEffect(() => {
    if (!storedValue.length) {
      return setStoredValue(cart)
    }

    if (storedValue.length && cart.length) {
      return setStoredValue(cart)
    }
    if(cart.length === 0){
      return setStoredValue([])
    }
  }, [cart])

  console.log(cart)
  console.log(storedValue)

  useEffect(() => {
    !cart.length && (document.getElementById('form1').textContent = "")
    cart.length && isAuthenticated &&
      (async () => {
        setloading(true);
        document.getElementById('form1').textContent = ""
        let {
          data: { id }
        } = await axios.post(`http://localhost:3001/mercadopago`, {
          cartId: '2', // volveerlo dinakico
          userId: '33', // volveerlo dinakico
          cartItems: cart
        })
        setloading(false);
        const script = document.createElement('script')
        const attr_data_preference = document.createAttribute('data-preference-id')
        attr_data_preference.value = id
        const data_button_label = document.createAttribute('data-button-label')
        data_button_label.value = "Pay with Mercado Pago"
        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
        script.setAttributeNode(attr_data_preference)
        script.setAttributeNode(data_button_label)
        document.getElementById('form1').appendChild(script)
      })()
  }, [cart.length, isAuthenticated])

  return (
    <Stack width='full' spacing={5} h='full' justifyContent='space-between' flexDirection='row'>
      <Stack width='full'>
        {storedValue?.map((p) => (
          <CardProductCart
            key={p.id}
            id={p.id}
            image={p.image}
            description={p.description}
            name={p.name}
            price={p.price}
            quantity={p.quantity}
          />
        ))}
      </Stack>
      <Stack height='full' w='40%' p={15} spacing={15} justifyContent='center' align='center'>
        <Heading>Payment</Heading>
        <Stack direction='row' align='center'>
          <Text>Order Total:</Text>
          <Tag size='lg' variant='subtle' colorScheme='primary'>
            <TagLabel>$ {priceTotal}</TagLabel>
          </Tag>
        </Stack>
        {isAuthenticated
          ? <>
              {loading ? <Spinner /> : ""}
            </>
          : <Button variant='ghost' bg='primary.300' onClick={() => loginWithRedirect()}>
              Log in and pay 
            </Button>
        }
        <form id='form1'></form>
      </Stack>
    </Stack>
  )
}

export default Cart
