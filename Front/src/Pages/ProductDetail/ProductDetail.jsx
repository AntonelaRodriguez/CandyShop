import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ImPriceTag } from 'react-icons/im'
import stars from '../../assets/starsProductDetail/stars.svg'
import { getProductDetails } from '../../redux/actions/actions'

const ProductDetail = () => {
  const [cantidad, setCantidad] = useState(0)

  const product = useSelector((state) => state.productDetail)

  const dispatch = useDispatch()

  const { id } = useParams()
  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  console.log(product)
  const increment = () => {
    cantidad < product.stock ? setCantidad(cantidad + 1) : cantidad
  }

  const decrement = () => {
    cantidad > 0 ? setCantidad(cantidad - 1) : cantidad
  }
  return (
    <Flex
      w='full'
      direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
      justifyContent='space-between'
      borderRadius='md'
      height='full'
      margin='auto'
      boxShadow='2xl'
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
        <Link to='/ '>
          <Button position='absolute' colorScheme='primary' variant='outline' top={15} left={15}>
            Home
          </Button>
        </Link>
      </Stack>
      <Stack minHeight='full' width={{ base: '100%', sm: '100%', md: '50%' }}>
        <Flex
          minH='full'
          h='full'
          direction={{ base: 'column' }}
          align='flex-start'
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
                <Image width='3.5' src={stars} />
                <Image width='3.5' src={stars} />
                <Image width='3.5' src={stars} />
                <Image width='3.5' src={stars} />
                <Image width='3.5' src={stars} />
              </Flex>
              <Text>246 Reviews</Text>
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
              <Button colorScheme='primary' variant='outline' onClick={decrement}>
                -
              </Button>
              <Input
                maxW='50px'
                textAlign='center'
                type='number'
                max={Number(product.stock)}
                autoCorrect='off'
                autocapitalize='off'
                name='cantidad'
                value={cantidad}
                id=''
              />
              <Button colorScheme='primary' variant='outline' onClick={increment}>
                +
              </Button>
            </HStack>
            <Button colorScheme='primary' variant='solid' size='lg'>
              Add to cart
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default ProductDetail
