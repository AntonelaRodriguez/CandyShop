import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { addProductCart } from '../../redux/actions/actions'
import { useState } from 'react'

const CardProduct = ({ image, id, name, price }) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const [count, setCount] = useState(0)
  const handleAddCart = (id) => {
    const prod = products.filter((p) => p.id === id)
    dispatch(addProductCart(prod[0]))
  }
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
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' bg='primary.100'>
              Buy now
            </Button>
            <Button onClick={()=> setCount(count - 1)} disabled={count <= 0}>-</Button>
            <Text>{count}</Text>
            <Button onClick={() => setCount(count + 1)}>+</Button>
            <Button onClick={() => handleAddCart(id)} variant='ghost' bg='primary.300'>
              Add to cart
            </Button>
          </ButtonGroup>
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
