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
    Spinner,
    Flex,
    SimpleGrid,
    Box,
    Container,
    Input,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    HStack,
    RadioGroup,
    Radio
  } from '@chakra-ui/react';
  import React, { useEffect, useState, useRef } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link, useParams, useNavigate } from 'react-router-dom';
  import {getCartProductDetail,getCartByPk, updateCart} from '../../redux/actions/actions';
  import CardProductCart from '../../Components/CardProductCart/CardProductCart'

  const CartOrderDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    let detailCart = useSelector((state) => state.productDetailCart);
    let cart = useSelector((state) => state.cartByPk);
    useEffect(()=>{
        dispatch(getCartProductDetail(id));
        dispatch(getCartByPk(id));
    },[]);

    useEffect(()=>{
      setInput({
        orderN: cart.orderN, 
        state: cart.state, 
        totalPrice: cart.totalPrice, 
        date: cart.date,
        trackingNumber: cart.trackingNumber,
        delivery: cart.delivery
      })
    },[cart]);

    console.log(detailCart);
    console.log(cart);

    const navigate = useNavigate();

    const [input, setInput] = useState({});

  function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
  };

  let newInput = {
    orderN: input.orderN,
    state: input.state,
    totalPrice: input.totalPrice,
    date: input.date,
    trackingNumber: input.trackingNumber === '' ? cart.trackingNumber : input.trackingNumber,
    delivery: input.delivery
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateCart(newInput));
    dispatch(getCartByPk(cart.orderN))
    navigate('/admin/OrdersAdmin');
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

    return (
      <Stack width='full' spacing={5} h='full' justifyContent='space-between' flexDirection='column'>

        <Stack direction='column' align='start'>
          <Button variant="solid"
            colorScheme="primary"
            mb={8}
            >
          <Link to={'/admin/OrdersAdmin'}>Back</Link>
          </Button>
          <Stack direction='column' align='center' justify='center' gap={15}>
            <Heading fontWeight={700} size="lg" mb={2}>{`Order from: ${cart.UserEmail}`}</Heading>
          </Stack>
        </Stack>

        <Box
        w="full"
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent="space-between"
        borderRadius="md"
        height="full"
        margin="auto"
        border='1px solid #F6ACA3'
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid templateColumns="repeat(2, 1fr)" spacing={8}>
          <Stack>
            <Text color={"tomato"} fontWeight={"500"} fontSize={"lg"} mb={2}>
              Order Number: {cart.orderN}.
            </Text>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Date: {cart.date}.
            </Text>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Delivery: {cart.delivery}.
            </Text>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Tracking Number: {cart.trackingNumber}.
            </Text>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Status Order: {cart.state}.
            </Text>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Total Price: ${cart.totalPrice}.
            </Text>
          </Stack>

          <Stack>
          <form action='submit' onSubmit={(e) => handleSubmit(e)}>
                <FormLabel>Tracking Number:</FormLabel>
                <Input maxLength={'23'} type='text' value={input.trackingNumber} name='trackingNumber' onChange={(e)=> handleChange(e)} mb={"1rem"} htmlSize={30} width='auto'></Input>
                <FormLabel>Order Status:</FormLabel>
                <RadioGroup mb={"1rem"} value={input.state}>
                  <HStack spacing='24px'>
                  <Radio name='state' onChange={(e) => handleChange(e)} value='completed'>
                  Completed
                  </Radio>
                  <Radio name='state' onChange={(e) => handleChange(e)} value='cancelled'>
                  Cancelled
                  </Radio>
                  <Radio name='state' onChange={(e) => handleChange(e)} value='delivered'>
                  Delivered
                  </Radio>
                  <Radio name='state' onChange={(e) => handleChange(e)} value='recived'>
                  Recived
                  </Radio>
                  </HStack>
                </RadioGroup>
                <Button size={{ base: 'xs', lg: 'sm' }} variant='solid' colorScheme='pink' onClick={onOpen}>
                    Edit Order
                </Button>

                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                  <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Edit Order
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' 
                  // type='submit'
                  onClick={(e) => {handleSubmit(e); onClose(e)}} 
                  ml={3}>
                  Save changes
                  </Button>
                  </AlertDialogFooter>
                  </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
            </form>
          </Stack>
          </SimpleGrid>
        </Container>
      </Box>
        <Stack width='full'>
          {detailCart?.map((p) => (
            <CardProductCart
              key={p.id}
              id={p.id}
              image={p.Product.image}
              description={p.Product.description}
              name={p.Product.name}
              price={p.Product.price}
              quantity={p.quantity}
              variable="detail"
            />
          ))}
        </Stack>
      </Stack>
    );
  };
  export default CartOrderDetail;