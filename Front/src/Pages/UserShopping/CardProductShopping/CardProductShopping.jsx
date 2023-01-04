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
    useEffect(()=>{
        dispatch(getCartProductDetail(id));
    },[])

    return (
        <Stack width='full' spacing={5} h='full' justifyContent='space-between' flexDirection='row'>
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
  export default CardProductShopping;