import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { addProductCart, editProductCart, getProductDetails } from '../../redux/actions/actions'
import { useState, useEffect } from 'react'

const CardProduct = ({ image, id, name, price, stock, availability }) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart.slice());
  const [count, setCount] = useState(1)
  const handleAddCart = (id) => {
    let prod = products.find((p) => p.id === id);
    if(prod) prod.quantity = count;
    let indexOfCart = -1;
    for (let i = 0; i < cart.length; i++) {
      if(cart[i].id === id) {
        indexOfCart = i;
        break;
      }
    };
    if(indexOfCart === -1) return dispatch(addProductCart(prod));
    cart[indexOfCart] = prod;
    dispatch(editProductCart(cart))
  }
   

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
    <Card maxW='sm' border="1px solid #F8E0E6" boxShadow="md" borderRadius="10px">
      <CardBody>
        <Link to={`/product/${id}`}>
          <Image src={image} alt='Green double couch with wooden legs' borderRadius='lg'/>
        </Link>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{name}</Heading>
          <Text color='primary.300' fontSize='2xl'> {`${count}un. x $${price * count}`} </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent="center" bg='primary.100' borderRadius="0 0 10px 10px">
        {!availability ? <Text fontWeight="600">No disponible</Text> :
          <Flex width="95%" alignItems="center" justifyContent="space-between" size='md'>
            <ButtonGroup spacing="2" alignItems="center">
              <Button 
                onClick={() => setCount(count - 1)} 
                disabled={count <= 1} 
                boxShadow={ count <= 1 ? "inner" : "lg" } 
                bg={ count <= 1 ? "" : 'primary.300' }
                fontWeight="700"
              >
                -
              </Button>
              <Text fontWeight="600">{count}</Text>
              <Button 
                onClick={() => setCount(count + 1)} 
                disabled={count >= stock} 
                boxShadow={ count >= stock ? "inner" : "lg" } 
                bg={ count >= stock ? "" : 'primary.300' }
                fontWeight="700"
              >
                +
              </Button>
            </ButtonGroup>
            <Button 
              onClick={() => handleAddCart(id)} 
              variant='ghost' 
              bg='primary.300' 
              boxShadow="lg"
              marginLeft="10px"
            > 
              Add to cart 
            </Button>
          </Flex>
        }
      </CardFooter>
    </Card>
  </motion.div>
  )
}

export default CardProduct
