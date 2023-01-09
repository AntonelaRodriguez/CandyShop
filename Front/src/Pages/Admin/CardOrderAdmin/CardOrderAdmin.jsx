import {
    Button,
    Card,
    CardBody,
    Heading,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
  } from '@chakra-ui/react'
  import React from 'react'
  import { Link } from 'react-router-dom'
  import image from '../../../assets/heroImage/1f6d2.png'
  
  const CardProductAdmin = ({ orderN, date, totalPrice, state, trackingNumber, UserEmail, delivery}) => {

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

            <Text>User: {UserEmail}</Text>
            <Text>Date: {date}.</Text>
            <Text>Actual State: {state}.</Text>
            <Text>Tracking Number: {trackingNumber}.</Text>
            <Text>Delivery: {delivery}</Text>
  
            <Stack>
              <Tag variant='outline' size='sm' colorScheme='primary'>
                <TagLabel>$ {totalPrice}</TagLabel>
              </Tag>
            </Stack>

          </CardBody>
          <Stack h='full' direction='row'>
            <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='blue'>
              <Link to={'/detail/' + orderN}>Shopping Cart Detail</Link>
            </Button>
          </Stack>
        </Stack>
      </Card>
    )
  }
  
  export default CardProductAdmin