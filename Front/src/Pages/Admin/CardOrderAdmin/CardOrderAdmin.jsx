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
  import React from 'react'
  import { useDispatch } from 'react-redux'
  import { Link } from 'react-router-dom'
  import { useState, useEffect } from 'react'
  
  const CardOrderAdmin = ({orderN, date, totalPrice, state, id}) => {

    const [input, setInput] = useState({
        orderN: orderN, 
        state: state, 
        totalPrice: totalPrice, 
        date: date
    })

    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
        console.log(input.state)
    }

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
            <Heading fontWeight={700} size='md'>
               Order Number:
            </Heading>
            <Heading fontWeight={700} size='sm'>
               {orderN}
            </Heading>
  
            <Text fontWeight={300} size='sm'>
              Date: {date}
            </Text>

            <Text fontWeight={300} size='sm'>
              Actual State: {state}
            </Text>
            
            <form action='submit' onSubmit={(e) => handleSubmit(e)}>
                <FormLabel htmlFor='cat'>State</FormLabel>
                <Select id='cat' name='state' value={input.state} onChange={(e)=>handleChange(e)}>
                    <option>Select category</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="delivered">Delivered</option>
                    <option value="recived">Recived</option>
                </Select>
                <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='pink'>
                    Change State
                </Button>
            </form>

            <Stack>
              <Tag variant='outline' size='sm' colorScheme='primary'>
                <TagLabel>$ {totalPrice}</TagLabel>
              </Tag>
            </Stack>
          </CardBody>
  
          <Stack h='full' direction='row'>
            <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='pink'>
              <Link to={'/edit/' + orderN}>Detail Cart</Link>
            </Button>
          </Stack>
        </Stack>
      </Card>
    )
  }
  
  export default CardOrderAdmin