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
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const CardProductAdmin = ({ name, description, image, id, price }) => {
  return (
    <Card
      w='full'
      h='full'
      display='flex'
      justifyContent='space-between'
      alignItems='flex-start'
      direction={{ base: 'column', sm: 'column', md: 'row' }}
      overflow='hidden'
      variant='elevated'
      boxShadow='xl'
      bg='gray.100'
      size='md'
      gap={10}
      p={5}
    >
      <Stack margin='auto' w={{ base: 'full', sm: '20%', lg: '15%' }} h='full'>
        <Image
          objectFit='cover'
          w='full'
          margin='auto'
          h='full'
          src={image}
          loading='lazy'
          alt={description}
        />
      </Stack>

      <Stack
        flex={1}
        justifyContent='space-between'
        direction={{ base: 'column-reverse', lg: 'row' }}
        alignItems='flex-start'
      >
        <CardBody
          w='full'
          display='flex'
          h='full'
          alignItems='flex-start'
          gap={5}
          justifyContent='space-between'
          flexDirection='column'
        >
          <Heading fontWeight={700} size='sm'>
            {name}
          </Heading>

          <Text fontWeight={300} size='sm'>
            {description}
          </Text>

          <Stack>
            <Tag variant='outline' size='sm' colorScheme='primary'>
              <TagLabel>$ {price}</TagLabel>
            </Tag>
          </Stack>
        </CardBody>

        <Stack h='full' direction='row'>
          <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='blue'>
            <Link to={'/edit/' + id}>Edit Product</Link>
          </Button>
          <Button
            onClick={() => deleteProduct(id)}
            size={{ base: 'xs', lg: 'sm' }}
            variant='solid'
            colorScheme='red'
          >
            <Link>Delete Product</Link>
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default CardProductAdmin
