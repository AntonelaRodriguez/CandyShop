import {
  Badge,
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImPriceTag } from 'react-icons/im'
import { FaStar } from 'react-icons/fa' 
import { getProductDetails, deleteProduct, getAllProducts, getUser, addProductCart, editProductCart } from '../../redux/actions/actions'
import {useAuth0} from "@auth0/auth0-react"
import ReviewForm from '../Reviews/ReviewForm'
import ReviewCard from '../Reviews/ReviewCard'
import { IoMdArrowBack } from "react-icons/io";




const ProductDetail = () => {
  window.scroll(0, 0);
  const [cantidad, setCantidad] = useState(0)

  const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();

  const product = useSelector((state) => state.productDetail);
  const actualUser = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews)
  const ratings = reviews && reviews.map(r => r.rating)
 
 const dispatch = useDispatch()
 
 const navigate = useNavigate()
 
 const { id } = useParams()
  


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

 useEffect(() => {
   dispatch(getProductDetails(id))
   if(isAuthenticated){
     dispatch(getUser(user.email));
    }
    
  }, [dispatch, id])
  
  const sum = (current, last) => {
    return current + last
  }
  const ratingReduce = ratings.reduce(sum, 0)
  const totalAvg = ratingReduce / ratings.length;
 
  const handlerDelete = (e) => {
    e.preventDefault()
    dispatch(deleteProduct(id))
    dispatch(getAllProducts())
    navigate('/products')
  }

  return (
  <>
    <Flex
      w='full'
      direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
      justifyContent='space-between'
      borderRadius='md'
      height='full'
      margin='auto'
      boxShadow='2xl'
      position='relative'
      marginTop="4em"
    >
      <Stack
        borderStartRadius='md'
        width={{ base: '100%', sm: '100%', md: '50%' }}
        minHeight='full'
        bg='#E3E5FA'
        align='center'
        justify='center'
        position='relative'
        p={5}
      >
        <Box
          borderStartRadius='md'
          backgroundImage={product.image}
          backgroundPosition='center center'
          backgroundRepeat='no-repeat'
          bgSize='cover'
          boxSize='md'
          width='full'
        ></Box>
        <Button onClick={() => navigate(-1)} position='absolute' colorScheme='primary' variant='outline' top="-4em" left="0">
          <Icon boxSize={5} as={IoMdArrowBack} /> 
        </Button>
      </Stack>
      <Stack minHeight='full' width={{ base: '100%', sm: '100%', md: '50%' }}>
        <Flex
          minH='full'
          h='full'
          direction={{ base: 'column' }}
          align='center'
          justifyContent='space-evenly'
          p={10}
          gap={2}
          bg='gray.200'
        >
          <Flex direction='column' align='flex-start' justify='center' gap={2}>
            <Stack justify='center' align='flex-start' gap={1} w='full' direction='column'>
              <Heading
                as='h2'
                w='full'
                fontSize={'3xl'}
                textTransform='capitalize'
                fontWeight='bold'
              >
                {product.name}
              </Heading>
              <Tag
                w='fit-content'
                cursor='pointer'
                pointerEvents='none'
                size='lg'
                variant='subtle'
                colorScheme='primary'
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
              >
                <TagLeftIcon as={ImPriceTag} />
                <TagLabel>$ {product.price}</TagLabel>
              </Tag>
            </Stack>
            <Stack direction='row' align='center' justify='flex-start'>
              <Flex align='center' justify='center'>
                {[...Array(5)].map((star, i) => {
                  const starValue = i + 1
                  return (
                    <FaStar value={starValue} color={starValue <= Math.floor(totalAvg) ? "gold" : "lightgrey"}/>
                  )
                })}      
                {/* al .5 mas cercano hacia abajo */}
                {/* {isNaN(totalAvg)? 0 : (Math.floor(totalAvg*2)/2)} */}
                {/* al decimal */}
                <Text marginLeft='5px'>
                {/* {isNaN(totalAvg)? 0 : (Math.floor(totalAvg*10)/10)} */}
                </Text>
                {/* al entero */}
                {/* {isNaN(totalAvg)? 0 : Math.floor(totalAvg)} */}

                
              </Flex>
              <Link to={`/reviews/${id}`}>{reviews.length} Reviews</Link>
            </Stack>
            <Badge colorScheme='pink'>{product.brand}</Badge>
          </Flex>

          <Stack>
            <Text fontWeight={600} fontSize='2xl'>
              Description :
            </Text>
            <Text fontWeight={300}>{product.description}</Text>
          </Stack>

          <HStack spacing={10} align='center' direction='row' justify='center' width='full'>
            <HStack align='center' justify='center'>
              <Button onClick={()=> setCount(count - 1)} disabled={count <= 1}>-</Button>
              <Text fontWeight="600">{count}</Text>
              <Button onClick={() => setCount(count + 1)} disabled={count >= product.stock}>+</Button>
              <Button onClick={() => handleAddCart(id)} variant='ghost' bg='primary.300'> Add to cart </Button>
            </HStack>
          </HStack>
        </Flex>
      </Stack>
      {
        actualUser && actualUser.admin === true ? 
        <Stack position='absolute' top={15} right={15} direction='row'>
        <Link to={`/edit/${id}`}>
          <Button variant='solid' colorScheme='blue'>
            Editing
          </Button>
        </Link>
        <Button colorScheme='red' onClick={(e) => handlerDelete(e)}>
          Delete
        </Button>
       </Stack> :
          <></>
      }

   
    </Flex>
   <Flex alignItems='flex-start'>
    <ReviewForm />
    <ReviewCard />
   </Flex>
   <Stack  marginBottom='1rem'>
	<Button _hover={{
              color: "#000",
            }}
            colorScheme="primary"
            variant="outline" marginTop='20px'><Link to={`/reviews/${id}`}  marginBottom='1rem'>View more</Link></Button>
   </Stack>
  </>
  )
}

export default ProductDetail
