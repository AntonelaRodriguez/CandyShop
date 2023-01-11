import { Button, Heading, Spinner, Stack, Tag, TagLabel, Text, HStack,FormLabel, RadioGroup,Radio, textDecoration } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import CardProductCart from '../../Components/CardProductCart/CardProductCart'
import axios from 'axios'
import { paymentToCart, getUserCart, getCartByPk,updateCart } from '../../redux/actions/actions'
import { useLocalStorage } from '../../Components/useLocalStorage/useLocalStorage'
import {useAuth0} from "@auth0/auth0-react"
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch()
  const userCart = useSelector(state => state.userCart);
  const cartByPk = useSelector(state => state.cartByPk);
  const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();
  const cart = useSelector((state) => state.cart);
  const [loading, setloading] = useState(false);
  const [showOrderReady, setShowOrderReady] = useState(true);
  const [storedValue, setStoredValue] = useLocalStorage('cart', []);

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

  const [orderN, setorderN] = useState(0);
  const [input, setInput] = useState({});
  useEffect(() => {
    setorderN(userCart[userCart?.length - 1]?.orderN)
  }, [userCart.length])

  useEffect(() => {
    dispatch(getCartByPk(orderN))
  }, [orderN])

  console.log("cartPK", cartByPk)

  useEffect(()=>{
    setTimeout(() => {
    setInput({
      orderN: cartByPk?.orderN, 
      state: cartByPk?.state, 
      totalPrice: cartByPk?.totalPrice, 
      date: cartByPk?.date,
      trackingNumber: cartByPk?.trackingNumber,
      delivery: cartByPk?.delivery,
    })
  }, 5000)
  },[cartByPk])

  console.log("input", input)

  useEffect(() => {
    document.getElementById('form1').textContent = "";
    setloading(false);
    if(!cart.length) {
      setShowOrderReady(false);
    } else {
      setShowOrderReady(true);
    }
  }, [cart.length]);
  
  const handlerOrderReady = async () => {
    if(!orderN) return
    setShowOrderReady(false);
    setloading(true);
    document.getElementById('form1').textContent = "";
    let { data: { id } } = await axios.post('/mercadopago', {
      cartId: orderN, 
      userId: user.email, 
      cartItems: cart
    })
    setloading(false);
    const script = document.createElement('script');
    const attr_data_preference = document.createAttribute('data-preference-id');
    attr_data_preference.value = id;
    const data_button_label = document.createAttribute('data-button-label');
    data_button_label.value = "To pay";
    script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.setAttributeNode(attr_data_preference);
    script.setAttributeNode(data_button_label);
    document.getElementById('form1').appendChild(script);
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleDeliverySubmit = () => {
    dispatch(updateCart(input));
  }

  return (
    <>
      {!storedValue?.length ? <Heading>Empty shopping cart!</Heading> : <Heading>Products in cart:</Heading>}
      <Stack width='full' spacing={5} h='full' justifyContent='space-between' flexDirection='row'>
        <Stack width='full' margin="3em 0 5em 0">
          {storedValue?.map((p) => (
            <CardProductCart
              key={p.id}
              id={p.id}
              image={p.image}
              description={p.description}
              name={p.name}
              price={p.price}
              quantity={p.quantity}
              variable="cart"
            />
          ))}
        {
          priceTotal >= 5000 ?
            !cartByPk?.UserEmail ?
              <Spinner /> :
              <Stack>
              <Text as='b' mt={3} fontSize={'1.5rem'}>If you buy more than $5,000 in products, shipping is free!</Text>
              <FormLabel as='legend' marginTop='2rem'>Do you want home delivery?</FormLabel>
              <RadioGroup defaultValue={cartByPk.delivery === "no" ? 'no' : 'yes'}>
                <HStack spacing='24px'>
                  <Radio name='delivery' onChange={(e) => handleChange(e)} value='no'>
                    No
                  </Radio>
                  <Radio name='delivery' onChange={(e) => handleChange(e)} value='yes'>
                    Yes
                  </Radio>
                </HStack>
              </RadioGroup>
              { JSON.stringify(input) === '{}' ? <Spinner/> :
              input?.delivery === "yes" ?             
              <Text>Please, complete your information for the shipment <Link to="/userDetails" style={{ color: 'red', textDecoration: 'underline' }}>here</Link>.</Text> :
              <></>
              }
              </Stack> :
            <></>
        }
        </Stack>
        <Stack height='full' w='40%' p={15} spacing={15} justifyContent='center' align='center'>
        { storedValue?.length && 
          <> 
            <Heading>Payment</Heading>
            <Stack direction={{ base: 'column', md: 'row' }} align='center'>
              <Text fontWeight="600">TOTAL:</Text>
              <Tag size='lg' variant='subtle' colorScheme='primary'>
                <TagLabel>$ {priceTotal}</TagLabel>
              </Tag>
            </Stack>
          </>
        }
          {isAuthenticated 
            ? <>
                {loading 
                  ? <Spinner /> 
                  : showOrderReady 
                    ? <Button variant='ghost' bg='primary.300' onClick={() => {handlerOrderReady(); handleDeliverySubmit()}} disabled={!orderN}>
                        Order ready! 
                      </Button>
                    : ""
                }
              </>
            : <Button variant='ghost' bg='primary.300' onClick={() => loginWithRedirect()}>
                Log in and pay 
              </Button>
          }
          <form id='form1' ></form>
        </Stack>
      </Stack>
    </>
  )
}

export default Cart
