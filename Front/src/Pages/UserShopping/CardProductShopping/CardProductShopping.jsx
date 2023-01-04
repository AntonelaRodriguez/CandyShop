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
    Flex,
    Progress
  } from '@chakra-ui/react';
  import React, { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link, useParams } from 'react-router-dom';
  import {getCartProductDetail} from '../../../redux/actions/actions';
  import CardProductCart from '../../../Components/CardProductCart/CardProductCart'

  const CardProductShopping = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    let detailCart = useSelector((state) => state.productDetailCart);
    let userCart = useSelector((state) => state.userCart)
    let order = userCart.find((u) => u.orderN === Number(id))
    
    useEffect(()=>{
        dispatch(getCartProductDetail(id));
    },[])

    return (
        <Stack width='full' spacing={5} h='full' justifyContent='space-between' flexDirection='column'>
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
        <Stack w='90%' display='flex' flexDir='column'>
          <Text fontWeight='600'>Estado de entrega: </Text>
          <Progress 
            value={order.state === 'completed' ? 25 : order.state === 'delivered' ? 75 : order.state === 'recived' ? 100 : 0 } 
            size='xs' 
            colorScheme={order.state === 'completed' ? 'yellow' : order.state === 'delivered' ? 'blue' : order.state === 'recived' ? 'green' : ''} 
          />
          <Text 
            fontWeight='600' 
            textTransform='uppercase'
            color={order.state === 'completed' ? 'orange' : order.state === 'delivered' ? 'blue' : order.state === 'recived' ? 'green' : ''} 
          >{order.state}</Text>
        </Stack>
      </Stack>
    );
  };
  export default CardProductShopping;