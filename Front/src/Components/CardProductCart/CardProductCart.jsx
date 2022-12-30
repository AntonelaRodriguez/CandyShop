import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart } from '../../redux/actions/actions'
import { TbShoppingCartOff } from 'react-icons/tb'
import { ImPriceTag } from 'react-icons/im'

const CardProductCart = ({ name, description, price, id, image, quantity = 1, variable }) => {

  const dispatch = useDispatch()

  const handleDelete = (id) => {
      dispatch(deleteFromCart(id))
  }

  return (
    <Flex 
      position="relative" 
      direction={{ base: 'column', md: 'row' }} 
      border="1px solid #F6ACA3" 
      boxShadow="md" 
      borderRadius="10px"  
    >
      {variable === "cart" && 
        <Button 
          position="absolute" 
          top="1em" 
          right="1em" 
          padding="0" 
          bg='primary.300' 
          onClick={() => handleDelete(id)}
        > 
          <Icon color="#424242" boxSize={4} as={TbShoppingCartOff} /> 
        </Button> 
      }
      <Image w="8em" h="8em" margin="1em" src={image} alt='Green double couch with wooden legs' borderRadius='lg'/>
      <Flex 
        width="full" 
        height="full" 
        alignSelf="flex-end" 
        justifyContent="flex-end" 
        flexDir="column"
        padding="1.5em .5em .5em 2em" 
        >
        <Heading minH="2.7em" size='md' margin="0 0 0 0" maxW="90%">{name}</Heading>
        <Tag 
          w='fit-content' 
          cursor='pointer' 
          pointerEvents='none' 
          size='md' 
          variant='subtle' 
          colorScheme='primary' 
          display='flex' 
          alignItems='center' 
          justifyContent='flex-start'
        >
          <TagLeftIcon as={ImPriceTag} />
          <TagLabel>$ {price}</TagLabel>
        </Tag>
        {variable === "detail" && <Text marginTop="1em" > {description} </Text>}
        <Text 
          color='primary.300'
          fontSize='2xl' 
          alignSelf="flex-end"
          margin="0 1em 0 0" 
        > 
          {`${quantity}un. x $${price * quantity}`} 
        </Text>
      </Flex>
    </Flex>
    // <Card
    //   direction={{ base: 'column', lg: 'row' }}
    //   overflow='hidden'
    //   variant='outline'
    //   bg='gray.200'
    //   w='full'
    //   boxShadow='xl'
    // >
    //   <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={image} alt={description} />

    //   <Stack>
    //     {variable === "cart" ?
    //     <Button heigt='fit-content' width='fit-content' variant='solid' bg='primary.100' onClick={() => handleDelete(id)}>X</Button>
    //     : <></>
    //     }
    //     <CardBody>
    //       <Heading size='md'>{name}</Heading>
    //       <Text py={5} fontWeight="light">{description}</Text>
    //       <Tag size='lg' variant='subtle' colorScheme='primary'>
    //         <TagLabel>$ {price}</TagLabel>
    //       </Tag>
    //     </CardBody>
    //     <CardFooter display='flex' alignItems='center' justify='flex-start' gap={2}>
    //       <Tag size='lg' variant='subtle' colorScheme='primary' alignSelf="end">
    //       <TagLabel>
    //         {quantity === 1 ? "1 unidad " : `${quantity} unidades`} por ${quantity * price}
    //       </TagLabel>
    //     </Tag>
    //     </CardFooter>
    //   </Stack>
    // </Card>
  )
}

export default CardProductCart
