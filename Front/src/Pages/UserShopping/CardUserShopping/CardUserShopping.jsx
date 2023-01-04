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
    Text,
    FormLabel,
    Select
  } from '@chakra-ui/react'
  import React, {useState} from 'react'
  import { Link } from 'react-router-dom'
  
  const CardProductAdmin = ({ orderN, date, totalPrice, state,}) => {

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
            src={'https://e7.pngegg.com/pngimages/833/426/png-clipart-shopping-cart-shopping-cart.png'}
            loading='lazy'
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
            Order Number: {orderN}
            </Heading>
  
            <Text fontWeight={300} size='sm'>
            Date: {date}
            </Text>

            <Text fontWeight={300} size='sm'>
            Actual State: {state}
            </Text>
  
            <Stack>
              <Tag variant='outline' size='sm' colorScheme='primary'>
                <TagLabel>$ {totalPrice}</TagLabel>
              </Tag>
            </Stack>
          </CardBody>
  
          <Stack h='full' direction='row'>
            <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='blue'>
              <Link to={'/detailShopping/' + orderN}>Shopping Cart</Link>
            </Button>
          </Stack>
        </Stack>
      </Card>
    )
  }
  export default CardProductAdmin