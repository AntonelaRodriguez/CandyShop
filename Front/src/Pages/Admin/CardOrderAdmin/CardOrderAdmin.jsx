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
    Select,
    Input
  } from '@chakra-ui/react'
  import React, {useState} from 'react'
  import { useDispatch } from 'react-redux'
  import { Link } from 'react-router-dom'
  import {updateCart,getCartByPk} from '../../../redux/actions/actions'
  import { useNavigate, useParams } from 'react-router-dom'
  
  const CardProductAdmin = ({ orderN, date, totalPrice, state, trackingNumber, variable}) => {

    let dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
      orderN: orderN, 
      state: state, 
      totalPrice: totalPrice, 
      date: date,
      trackingNumber: trackingNumber,
  });

  function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
      console.log(input);
  };

  let newInput = {
    orderN: input.orderN,
    state: input.state,
    totalPrice: input.totalPrice,
    date: input.date,
    trackingNumber: input.trackingNumber,
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateCart(newInput));
    dispatch(getCartByPk(orderN))
    alert("Cart succesfully updated!");
    navigate('/admin/OrdersAdmin');
  };

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
            Date: {date}.
            </Text>

            <Text fontWeight={300} size='sm'>
            Actual State: {state}.
            </Text>

            <Text fontWeight={300} size='sm'>
            Tracking Number: {trackingNumber}.
            </Text>
  
            <Stack>
              <Tag variant='outline' size='sm' colorScheme='primary'>
                <TagLabel>$ {totalPrice}</TagLabel>
              </Tag>
            </Stack>
            {variable === "inputs" &&
            
            <form action='submit' onSubmit={(e) => handleSubmit(e)}>
                <FormLabel>Tracking Number:</FormLabel>
                <Input type='text' value={input.trackingNumber} name='trackingNumber' onChange={(e)=> handleChange(e)}></Input>
                <Select name='state' value={input.state} onChange={(e)=>handleChange(e)}>
                    <option>Select category</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="delivered">Delivered</option>
                    <option value="recived">Recived</option>
                </Select>
                <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='pink' type='submit'>
                    Change State
                </Button>
            </form>
            }

          </CardBody>
          {variable === "button" && 
          <Stack h='full' direction='row'>
            <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='blue'>
              <Link to={'/detail/' + orderN}>Shopping Cart Detail</Link>
            </Button>
          </Stack>
          }
        </Stack>
      </Card>
    )
  }
  
  export default CardProductAdmin