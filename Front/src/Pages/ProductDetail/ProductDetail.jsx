// import {
//   Badge,
//   Box,
//   Button,
//   Flex,
//   GridItem,
//   Heading,
//   HStack,
//   Icon,
//   Image,
//   Input,
//   Stack,
//   Tag,
//   TagLabel,
//   TagLeftIcon,
//   Text,
//   useToast
// } from '@chakra-ui/react'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { ImPriceTag } from 'react-icons/im'
// import { FaStar } from 'react-icons/fa' 
// import { getProductDetails, deleteProduct, getAllProducts, getUser, addProductCart, editProductCart } from '../../redux/actions/actions'
// import {useAuth0} from "@auth0/auth0-react"
// import ReviewForm from '../Reviews/ReviewForm'
// import ReviewCard from '../Reviews/ReviewCard'
// import { IoMdArrowBack } from "react-icons/io";




// const ProductDetail = () => {
//   window.scroll(0, 0);
//   const [cantidad, setCantidad] = useState(0)

//   const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();

//   const product = useSelector((state) => state.productDetail);
//   const actualUser = useSelector((state) => state.user);
//   const reviews = useSelector((state) => state.reviews)
//   const ratings = reviews && reviews.map(r => r.rating)
 
//  const dispatch = useDispatch()
 
//  const navigate = useNavigate()
 
//  const { id } = useParams()
  


//  const products = useSelector((state) => state.products)
//  const cart = useSelector((state) => state.cart.slice());
//  const [count, setCount] = useState(1)
//  const handleAddCart = (id) => {
//    let prod = products.find((p) => p.id === id);
//    if(prod) prod.quantity = count;
//    let indexOfCart = -1;
//    for (let i = 0; i < cart.length; i++) {
//      if(cart[i].id === id) {
//        indexOfCart = i;
//        break;
//      }
//    };
//    if(indexOfCart === -1) return dispatch(addProductCart(prod));
//    cart[indexOfCart] = prod;
//    dispatch(editProductCart(cart))
//  }

//  useEffect(() => {
//    dispatch(getProductDetails(id))
//    if(isAuthenticated){
//      dispatch(getUser(user.email));
//     }
    
//   }, [dispatch, id])
  
//   const sum = (current, last) => {
//     return current + last
//   }
//   const ratingReduce = ratings.reduce(sum, 0)
//   const totalAvg = ratingReduce / ratings.length;
 
//   const handlerDelete = (e) => {
//     e.preventDefault()
//     dispatch(deleteProduct(id))
//     dispatch(getAllProducts())
//     navigate('/products')
//   }

//   return (
//   <>
//     <Flex
//       w='full'
//       direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
//       justifyContent='space-between'
//       borderRadius='md'
//       height='full'
//       margin='auto'
//       boxShadow='2xl'
//       position='relative'
//       marginTop="4em"
//     >
//       <Stack
//         borderStartRadius='md'
//         width={{ base: '100%', sm: '100%', md: '50%' }}
//         minHeight='full'
//         bg='#E3E5FA'
//         align='center'
//         justify='center'
//         position='relative'
//         p={5}
//       >
//         <Box
//           borderStartRadius='md'
//           backgroundImage={product.image}
//           backgroundPosition='center center'
//           backgroundRepeat='no-repeat'
//           bgSize='cover'
//           boxSize='md'
//           width='full'
//         ></Box>
//         <Button onClick={() => navigate(-1)} position='absolute' colorScheme='primary' variant='outline' top="-4em" left="0">
//           <Icon boxSize={5} as={IoMdArrowBack} /> 
//         </Button>
//       </Stack>
//       <Stack minHeight='full' width={{ base: '100%', sm: '100%', md: '50%' }}>
//         <Flex
//           minH='full'
//           h='full'
//           direction={{ base: 'column' }}
//           align='center'
//           justifyContent='space-evenly'
//           p={10}
//           gap={2}
//           bg='gray.200'
//         >
//           <Flex direction='column' align='flex-start' justify='center' gap={2}>
//             <Stack justify='center' align='flex-start' gap={1} w='full' direction='column'>
//               <Heading
//                 as='h2'
//                 w='full'
//                 fontSize={'3xl'}
//                 textTransform='capitalize'
//                 fontWeight='bold'
//               >
//                 {product.name}
//               </Heading>
//               <Tag
//                 w='fit-content'
//                 cursor='pointer'
//                 pointerEvents='none'
//                 size='lg'
//                 variant='subtle'
//                 colorScheme='primary'
//                 display='flex'
//                 alignItems='center'
//                 justifyContent='flex-start'
//               >
//                 <TagLeftIcon as={ImPriceTag} />
//                 <TagLabel>$ {product.price}</TagLabel>
//               </Tag>
//             </Stack>
//             <Stack direction='row' align='center' justify='flex-start'>
//               <Flex align='center' justify='center'>
//                 {[...Array(5)].map((star, i) => {
//                   const starValue = i + 1
//                   return (
//                     <FaStar value={starValue} color={starValue <= Math.floor(totalAvg) ? "gold" : "lightgrey"}/>
//                   )
//                 })}      
//                 {/* al .5 mas cercano hacia abajo */}
//                 {/* {isNaN(totalAvg)? 0 : (Math.floor(totalAvg*2)/2)} */}
//                 {/* al decimal */}
//                 <Text marginLeft='5px'>
//                 {/* {isNaN(totalAvg)? 0 : (Math.floor(totalAvg*10)/10)} */}
//                 </Text>
//                 {/* al entero */}
//                 {/* {isNaN(totalAvg)? 0 : Math.floor(totalAvg)} */}

                
//               </Flex>
//               <Link to={`/reviews/${id}`}>{reviews.length} Reviews</Link>
//             </Stack>
//             <Badge colorScheme='pink'>{product.brand}</Badge>
//           </Flex>

//           <Stack>
//             <Text fontWeight={600} fontSize='2xl'>
//               Description :
//             </Text>
//             <Text fontWeight={300}>{product.description}</Text>
//           </Stack>

//           <HStack spacing={10} align='center' direction='row' justify='center' width='full'>
//             <HStack align='center' justify='center'>
//               <Button onClick={()=> setCount(count - 1)} disabled={count <= 1}>-</Button>
//               <Text fontWeight="600">{count}</Text>
//               <Button onClick={() => setCount(count + 1)} disabled={count >= product.stock}>+</Button>
//               <Button onClick={() => handleAddCart(id)} variant='ghost' bg='primary.300'> Add to cart </Button>
//             </HStack>
//           </HStack>
//         </Flex>
//       </Stack>
//       {
//         actualUser && actualUser.admin === true ? 
//         <Stack position='absolute' top={15} right={15} direction='row'>
//         <Link to={`/edit/${id}`}>
//           <Button variant='solid' colorScheme='blue'>
//             Editing
//           </Button>
//         </Link>
//         <Button colorScheme='red' onClick={(e) => handlerDelete(e)}>
//           Delete
//         </Button>
//        </Stack> :
//           <></>
//       }

   
//     </Flex>
//    <Flex alignItems='flex-start'>
//     <ReviewForm />
//     <ReviewCard />
//    </Flex>
//    <Stack  marginBottom='1rem'>
// 	<Button _hover={{
//               color: "#000",
//             }}
//             colorScheme="primary"
//             variant="outline" marginTop='20px'><Link to={`/reviews/${id}`}  marginBottom='1rem'>View more</Link></Button>
//    </Stack>
//   </>
//   )
// }

// export default ProductDetail
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
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
import { getProductDetails, deleteProduct, getAllProducts, getUser, addProductCart, editProductCart, deleteFromCart, cleanUpFilters, getCartProductDetail } from '../../redux/actions/actions'
import { useAuth0 } from "@auth0/auth0-react"
import ReviewForm from '../Reviews/ReviewForm'
import ReviewCard from '../Reviews/ReviewCard'
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbShoppingCartOff } from 'react-icons/tb'
import { IoMdTrash, IoMdCreate } from 'react-icons/io'
import axios from 'axios'
import Swal from 'sweetalert2'

const ProductDetail = () => {
  
  const {isAuthenticated, user } = useAuth0();

  const product = useSelector((state) => state.productDetail);
  const actualUser = useSelector((state) => state.user);
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart.slice());
  const reviews = useSelector((state) => state.reviews)
  const ratings = reviews && reviews.map(r => r.rating)
  let detailCart = useSelector((state) => state.productDetailCart);
  let userCart = useSelector((state) => state.userCart)
  let completed = userCart.filter((u) => u.state === 'completed')
  let orderN = completed.map((u) => u.orderN)
  let canReview = detailCart.filter(e => `/product/${e.ProductId}` === window.location.pathname);




  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()
  id = Number(id)
  
  let inCart = (id) => cart.some((c) => c.id === id)
  let indexOfCart = (id) => cart.findIndex((c) => c.id === id)
  let initialCount = () => (inCart(id) ? cart[indexOfCart(id)].quantity : 1)
  let initialLastUnits = () => (inCart(id) ? cart[indexOfCart(id)].quantity : -1)
  const [count, setCount] = useState(initialCount)
  const [lastUnits, setLastUnits] = useState(initialLastUnits)
  const [showIconElim, setSetShowIconElim] = useState(false)

  const handleAddCart = (id) => {
    let prod = products.find((p) => p.id === id)
    if (prod) prod.quantity = count
    setLastUnits(count)
    if (inCart(id)) {
      cart[indexOfCart(id)] = prod
      return dispatch(editProductCart(cart))
    }
    dispatch(addProductCart(prod))
  }

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id))
    setCount(1)
    setSetShowIconElim(false)
  }


  useEffect(() => {
    dispatch(getProductDetails(id))
    orderN.map(e => {
      dispatch(getCartProductDetail(e))
    });
    if (isAuthenticated) {
      dispatch(getUser(user.email));
    }

  }, [dispatch, id])

  const sum = (current, last) => {
    return current + last
  }
  const ratingReduce = ratings.reduce(sum, 0)
  const totalAvg = ratingReduce / ratings.length;

  const handlerDelete = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The product has been deleted.',
          'success'
        )
        axios.delete(`/products/${id}`).then(() => {
          dispatch(getAllProducts())
          dispatch(cleanUpFilters())
          navigate('/products')
        })
      }
    })
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  console.log(canReview.length);

  return (
    <>
      <Card
        mt='3em'
        border={(inCart(id) || actualUser?.admin) ? '1px solid #F6ACA3' : '1px solid #F8E0E6'}
        boxShadow='2xl'
        borderRadius='10px'
        pos='relative'
        w='90%'
      >
        <Button onClick={() => navigate(-1)} position='absolute' colorScheme='primary' variant='outline' top="-3em" left="0">
          <Icon boxSize={4} as={IoMdArrowBack} />
        </Button> 
        { actualUser && !actualUser.admin && inCart(product.id) ? (
          <Button
            pos='absolute'
            top='15px'
            right='15px'
            bg='primary.300'
            onMouseOver={(e) => setSetShowIconElim(true)}
            onMouseOut={(e) => setSetShowIconElim(false)}
            onClick={() => handleDelete(product.id)}
            zIndex='2'
          >
            { actualUser && !actualUser.admin && showIconElim ? (
              <Icon color='#424242' boxSize={6} as={TbShoppingCartOff} />
            ) : (
              <Icon color='#424242' boxSize={6} as={AiOutlineShoppingCart} />
            )}
          </Button>
        ) : (
          ''
        )}
        <CardBody 
          display='flex' 
          mt='1em' 
          flexDir={{ base: 'column', lg: 'row' }} 
        >
            {product?.image?.length &&
              <Image 
                loading='lazy' 
                src={product.image} 
                alt='Green double couch with wooden legs' 
                borderRadius='lg' 
                maxW={{base: 'full', md: 'md'}}  
                alignSelf={{ base: 'center', lg: 'flex-start' }}
              />
            }
          <Stack  
            padding='3em 0 3em 0' 
            w='full' 
            justifyContent='flex-start' 
            position='relative' 
            lineHeight='.5em'
          >
            <Heading
              as='h2'
              w='full'
              fontSize={{ base: 'xl', md: '3xl' }}
              textTransform='capitalize'
              fontWeight='bold'
              margin='0'
              padding='0'
            >
              {product.name}
            </Heading>
            <Flex 
              flexDir='column' 
              gap='2em' 
              padding='1em' 
              h='full'
            >
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
              <Stack direction='row' align='center' justify='flex-start'>
                <Flex align='center' justify='center'>
                  {[...Array(5)].map((star, i) => {
                    const starValue = i + 1
                    return (
                      <FaStar value={starValue} color={starValue <= Math.floor(totalAvg) ? "gold" : "lightgrey"} />
                    )
                  })}
                  {/* al decimal */}
                  <Text ml='5px'>
                    {/* {isNaN(totalAvg)? 0 : (Math.floor(totalAvg*10)/10)} */}
                  </Text>
                  {/* al entero */}
                  {/* {isNaN(totalAvg)? 0 : Math.floor(totalAvg)} */}
                </Flex>
                <Link to={`/reviews/${product.id}`}>{reviews.length} Reviews</Link>
              </Stack>
              <Badge colorScheme='pink' padding='1em' border='md' width='min-content'>{product.brand}</Badge>
              <Text fontWeight={600} fontSize={{ base: 'xl', md: '2xl' }}> Description : </Text>
              <Text fontWeight={400} lineHeight='1.4em'>{product.description}</Text>
            </Flex>
          { actualUser && !actualUser.admin &&
              <>
                <Text 
                  color='primary.300' 
                  fontSize='2xl' 
                  position='absolute' 
                  bottom='1em' 
                  right='1em'
                  >
                  {`${count}un. x $${product.price * count}`}
                </Text>
              </>
            }
          </Stack>
        </CardBody>
        <Divider />
        
    { actualUser && !actualUser.admin && 
      <CardFooter 
          justifyContent='center' 
          bg='primary.100' 
          borderRadius='0 0 10px 10px'
        >
          {!product.availability ? (
            <Text fontWeight='600'>No available</Text>
          ) : (
            <Flex width='100%' alignItems='center' justifyContent='flex-end' size='md' gap='5'>
              <ButtonGroup spacing='2' alignItems='center'>
                <Button
                  onClick={() => setCount(count - 1)}
                  disabled={count <= 1}
                  boxShadow={count <= 1 ? 'inner' : 'lg'}
                  bg='primary.300'
                  fontWeight='700'
                >
                  -
                </Button>
                <Text fontWeight='600'>{count}</Text>
                <Button
                  onClick={() => setCount(count + 1)}
                  disabled={count >= product.stock}
                  boxShadow={count >= product.stock ? 'inner' : 'lg'}
                  bg='primary.300'
                  fontWeight='700'
                >
                  +
                </Button>
              </ButtonGroup>
              <Button
                onClick={() => handleAddCart(product.id)}
                variant='ghost'
                bg='primary.300'
                boxShadow='lg'
                ml='10px'
                disabled={inCart(product.id) && count === lastUnits}
              >
                {inCart(product.id) ? 'Change units' : 'Add to cart'}
              </Button>
            </Flex>
          )}
        </CardFooter>}
        {
          actualUser && actualUser.admin === true ?
            <Stack position='absolute' top={15} right={15} direction='row'>
              <Link to={`/edit/${id}`}>
                <Button variant='solid' colorScheme='blue'>
                  <Icon as={IoMdCreate}></Icon>
                </Button>
              </Link>
              <Button colorScheme='red' onClick={(e) => handlerDelete(e)}>
                <Icon as={IoMdTrash}></Icon>
              </Button>
            </Stack> :
            <></>
        }
      </Card>


      <Flex alignItems='flex-start'>

      { canReview.length === 1 ?
      <ReviewForm /> : <></>
}
        <ReviewCard />
      </Flex>
      <Stack mb='1rem'>
        <Button _hover={{
          color: "#000",
        }}
          colorScheme="primary"
          variant="outline" mt='20px'><Link to={`/reviews/${id}`} mb='1rem'>View more</Link></Button>
      </Stack>
    </>
  )
}

export default ProductDetail
