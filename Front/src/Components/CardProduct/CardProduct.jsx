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
   
  console.log("stock", name)

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card h={450} boxShadow='2xl' bg='gray.300' maxW='sm' minH='full'>
        <CardBody>
          <Link to={`/product/${id}`}>
            <Image
              w={'full'}
              h={200}
              src={image}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
          </Link>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{name}</Heading>
            <Text color='blue.600' fontSize='2xl'>
              {`$${price}`}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="center" >
            <Flex width="100%" alignItems="center" justifyContent="space-between" size='md'>
              
              {!availability ?  <Text fontWeight="600">No disponible</Text> : 
               <>  
               <Button variant='solid' bg='primary.100'> Buy now </Button>
               <Button onClick={()=> setCount(count - 1)} disabled={count <= 1}>-</Button>
               <Text fontWeight="600">{count}</Text>
               <Button onClick={() => setCount(count + 1) } disabled={count >= stock}>+</Button>
               <Button onClick={() => handleAddCart(id)} variant='ghost' bg='primary.300'> Add to cart </Button>
                </>}

            </Flex>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default CardProduct
{
  /* <GridItem>
<Image width="250px" src={i} />
</GridItem> */
}
