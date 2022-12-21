import { Button, Heading, Stack, Tag, TagLabel, Text } from '@chakra-ui/react'
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
  const [storedValue, setStoredValue] = useLocalStorage('cart', [])
  const priceTotal = storedValue?.reduce((acc, curr) => {
    return Number(acc) + Number(curr.price)
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
    cart.length &&
      (async () => {
        let {
          data: { id }
        } = await axios.post(`http://localhost:3001/mercadopago`, {
          cartId: '2', // volveerlo dinakico
          userId: '33', // volveerlo dinakico
          cartItems: cart
        })
        const script = document.createElement('script')
        const attr_data_preference = document.createAttribute('data-preference-id')
        attr_data_preference.value = id
        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
        script.setAttributeNode(attr_data_preference)
        document.getElementById('form1').appendChild(script)
      })()
  }, [])

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
        {/* <Button onClick={paymentCart} colorScheme='primary' variant='solid' w='full'>
          Pay full cart
        </Button> */}
        {isAuthenticated ? 
        <form id='form1'> </form> :
        <form id='form1' onClick={() => loginWithRedirect()}> </form>
        }
      </Stack>
    </Stack>
  )
}

export default Cart
