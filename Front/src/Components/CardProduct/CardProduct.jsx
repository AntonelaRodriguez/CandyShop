// import {
//   Button,
//   ButtonGroup,
//   Card,
//   CardBody,
//   CardFooter,
//   Divider,
//   Flex,
//   Heading,
//   Icon,
//   Image,
//   Spinner,
//   Stack,
//   Text
// } from '@chakra-ui/react'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   addProductCart,
//   editProductCart,
//   getProductDetails,
//   deleteFromCart
// } from '../../redux/actions/actions'
// import { useState, useEffect } from 'react'
// import { AiOutlineShoppingCart } from 'react-icons/ai'
// import { TbShoppingCartOff } from 'react-icons/tb'

// const CardProduct = ({ image, id, name, price, stock, availability }) => {
//   const dispatch = useDispatch()
//   const products = useSelector((state) => state.products)
//   const cart = useSelector((state) => state.cart.slice())

//   let inCart = (id) => cart.some((c) => c.id === id)
//   let indexOfCart = (id) => cart.findIndex((c) => c.id === id)
//   let initialCount = () => (inCart(id) ? cart[indexOfCart(id)].quantity : 1)
//   let initialLastUnits = () => (inCart(id) ? cart[indexOfCart(id)].quantity : -1)
//   const [count, setCount] = useState(initialCount)
//   const [lastUnits, setLastUnits] = useState(initialLastUnits)
//   const [showIconElim, setSetShowIconElim] = useState(false)

//   const handleAddCart = (id) => {
//     let prod = products.find((p) => p.id === id)
//     if (prod) prod.quantity = count
//     setLastUnits(count)
//     if (inCart(id)) {
//       cart[indexOfCart(id)] = prod
//       return dispatch(editProductCart(cart))
//     }
//     dispatch(addProductCart(prod))
//   }

//   const handleDelete = (id) => {
//     dispatch(deleteFromCart(id))
//     setCount(1)
//     setSetShowIconElim(false)
//   }

//   return (
//     <motion.div whileHover={{ scale: 1.02 }}>
//       <Card
//         maxW='sm'
//         border={inCart(id) ? '1px solid #F6ACA3' : '1px solid #F8E0E6'}
//         boxShadow='md'
//         borderRadius='10px'
//         pos='relative'
//       >
//         {inCart(id) ? (
//           <Button
//             pos='absolute'
//             top='15px'
//             right='15px'
//             bg='primary.300'
//             onMouseOver={(e) => setSetShowIconElim(true)}
//             onMouseOut={(e) => setSetShowIconElim(false)}
//             onClick={() => handleDelete(id)}
//           >
//             {showIconElim ? (
//               <Icon color='#424242' boxSize={6} as={TbShoppingCartOff} />
//             ) : (
//               <Icon color='#424242' boxSize={6} as={AiOutlineShoppingCart} />
//             )}
//           </Button>
//         ) : (
//           ''
//         )}
//         <CardBody>
//           <Link to={`/product/${id}`}>
//             {image.length ? (
//               <Image loading='lazy' src={image} alt='Green double couch with wooden legs' borderRadius='lg' />
//             ) : (
//               <Spinner />
//             )}
//           </Link>
//           <Stack mt='6' spacing='3'>
//             <Heading minH='50px' size='md'>
//               {name}
//             </Heading>
//             <Text color='primary.300' fontSize='2xl'>
//               {' '}
//               {`${count}un. x $${price * count}`}{' '}
//             </Text>
//           </Stack>
//         </CardBody>
//         <Divider />
//         <CardFooter justifyContent='center' bg='primary.100' borderRadius='0 0 10px 10px'>
//           {!availability ? (
//             <Text fontWeight='600'>No disponible</Text>
//           ) : (
//             <Flex width='100%' alignItems='center' justifyContent='space-between' size='md'>
//               <ButtonGroup spacing='2' alignItems='center'>
//                 <Button
//                   onClick={() => setCount(count - 1)}
//                   disabled={count <= 1}
//                   boxShadow={count <= 1 ? 'inner' : 'lg'}
//                   bg='primary.300'
//                   fontWeight='700'
//                 >
//                   -
//                 </Button>
//                 <Text fontWeight='600'>{count}</Text>
//                 <Button
//                   onClick={() => setCount(count + 1)}
//                   disabled={count >= stock}
//                   boxShadow={count >= stock ? 'inner' : 'lg'}
//                   bg='primary.300'
//                   fontWeight='700'
//                 >
//                   +
//                 </Button>
//               </ButtonGroup>
//               <Button
//                 onClick={() => handleAddCart(id)}
//                 variant='ghost'
//                 bg='primary.300'
//                 boxShadow='lg'
//                 marginLeft='10px'
//                 disabled={inCart(id) && count === lastUnits}
//                 // width="130px"
//               >
//                 {inCart(id) ? 'Change units' : 'Add to cart'}
//               </Button>
//             </Flex>
//           )}
//         </CardFooter>
//       </Card>
//     </motion.div>
//   )
// }

// export default CardProduct
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProductCart,
  editProductCart,
  getProductDetails,
  deleteFromCart
} from '../../redux/actions/actions'
import { useState, useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbShoppingCartOff } from 'react-icons/tb'
import { ImPriceTag } from 'react-icons/im'

const CardProduct = ({ image, id, name, price, stock, availability }) => {
  const actualUser = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart.slice())

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

  return (
    <motion.div style={{ width: '100%' }} whileHover={{ scale: 1.02 }}>
      <Card
        minW='full'
        minH={500}
        maxH={500}
        h='full'
        maxW={{ base: 'full', md: '50%', lg: 'full' }}
        border={inCart(id) || actualUser?.admin ? '1px solid #F6ACA3' : '1px solid #F8E0E6'}
        boxShadow='2xl'
        borderRadius='10px'
        pos='relative'
      >
        {actualUser && !actualUser.admin && inCart(id) ? (
          <Button
            pos='absolute'
            top='15px'
            right='15px'
            bg='primary.300'
            onMouseOver={(e) => setSetShowIconElim(true)}
            onMouseOut={(e) => setSetShowIconElim(false)}
            onClick={() => handleDelete(id)}
          >
            {actualUser && !actualUser.admin && showIconElim ? (
              <Icon color='#424242' boxSize={6} as={TbShoppingCartOff} />
            ) : (
              <Icon color='#424242' boxSize={6} as={AiOutlineShoppingCart} />
            )}
          </Button>
        ) : (
          ''
        )}
        <CardBody w='full'>
          <Link to={`/product/${id}`}>
            {image?.length && (
              <Image
                w='full'
                objectFit='cover'
                maxW={200}
                margin='auto'
                loading='lazy'
                src={image}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              />
            )}
          </Link>
          {actualUser && !actualUser.admin ? (
            <Stack mt='6' spacing='3'>
              <Heading minH='50px' size='md'>
                {name}
              </Heading>
              <Text color='primary.300' fontSize='2xl'>
                {`${count}un. x $${price * count}`}
              </Text>
            </Stack>
          ) : (
            <Stack mt='6' spacing='2'>
              <Heading minH='50px' size='md'>
                {name}
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
                <TagLabel>$ {price}</TagLabel>
              </Tag>
            </Stack>
          )}
        </CardBody>
        <Divider />
        {actualUser && !actualUser.admin && (
          <CardFooter justifyContent='center' bg='primary.100' borderRadius='0 0 10px 10px'>
            {!availability ? (
              <Text fontWeight='600'>No available</Text>
            ) : (
              <Flex width='100%' alignItems='center' justifyContent='space-between' size='md'>
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
                    disabled={count >= stock}
                    boxShadow={count >= stock ? 'inner' : 'lg'}
                    bg='primary.300'
                    fontWeight='700'
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  onClick={() => handleAddCart(id)}
                  variant='ghost'
                  bg='primary.300'
                  boxShadow='lg'
                  marginLeft='10px'
                  disabled={inCart(id) && count === lastUnits}
                >
                  {inCart(id) ? 'Change units' : 'Add to cart'}
                </Button>
              </Flex>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

export default CardProduct
