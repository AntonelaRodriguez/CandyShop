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
    Spinner
  } from '@chakra-ui/react';
  import React, { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link, useParams } from 'react-router-dom';
  import {getCartProductDetail,getCartByPk} from '../../redux/actions/actions';
  import CardProductCart from '../../Components/CardProductCart/CardProductCart'
  import CardOrderAdmin from './CardOrderAdmin/CardOrderAdmin'

  const CartOrderDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    let detailCart = useSelector((state) => state.productDetailCart);
    let cart = useSelector((state) => state.cartByPk);
    useEffect(()=>{
        dispatch(getCartProductDetail(id));
        dispatch(getCartByPk(id));
    },[])

    console.log(cart);

    return (
        <Stack width='full' spacing={5} h='full' justifyContent='space-between' flexDirection='column'>
          <Stack justifyContent="space-between" direction="row">
          <Stack w="full" h="full" gap={4} p={5}>
            {cart ? 
                    <CardOrderAdmin
                    key={cart.orderN}
                    orderN={cart.orderN}
                    date={cart.date}
                    totalPrice={cart.totalPrice}
                    state={cart.state}
                    trackingNumber={cart.trackingNumber}
                    variable={"inputs"}
                  />
                : (
              <Spinner size="xl" />
            )}
          </Stack>
        </Stack>
        <Stack width='full'>
          {detailCart?.map((p) => (
            <CardProductCart
              key={p.id}
              id={p.id}
              image={p.Product.image}
              description={p.Product.description}
              name={p.Product.name}
              price={p.price}
              quantity={p.quantity}
              variable="detail"
            />
          ))}
        </Stack>
      </Stack>
    );
  };
  export default CartOrderDetail;