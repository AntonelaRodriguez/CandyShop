import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart } from '../../redux/actions/actions'

const CardProductCart = ({ name, description, price, id, image }) => {

  const dispatch = useDispatch()

  const handleDelete = (id) => {
      dispatch(deleteFromCart(id))
  }
  return (
    <Card
      direction={{ base: 'column', lg: 'row' }}
      overflow='hidden'
      variant='outline'
      bg='gray.200'
      w='full'
      boxShadow='xl'
    >
      <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={image} alt={description} />

      <Stack>
        <Button heigt='fit-content' width='fit-content' variant='solid' bg='primary.100' onClick={() => handleDelete(id)}>X</Button>
        <CardBody>
          <Heading size='md'>{name}</Heading>

          <Text py={5} fontWeight="light">{description}</Text>

        </CardBody>
        <CardFooter display='flex' alignItems='center' justify='flex-start' gap={2}>
          <Tag size='lg' variant='subtle' colorScheme='primary'>
            <TagLabel>$ {price}</TagLabel>
          </Tag>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export default CardProductCart
