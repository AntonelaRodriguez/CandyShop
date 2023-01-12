import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addProductCart, editProductCart, deleteFromCart } from '../../redux/actions/actions';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { TbShoppingCartOff } from 'react-icons/tb';
import { ImPriceTag } from 'react-icons/im';

const CardProductCreateAndEdit = ({
  image,
  id,
  name,
  price,
  stock,
  availability,
  description,
  brand,
  category,
}) => {
  const actualUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.slice());
  const loading = useSelector((state) => state.loading);

  let inCart = (id) => cart.some((c) => c.id === id);
  let indexOfCart = (id) => cart.findIndex((c) => c.id === id);
  let initialCount = () => (inCart(id) ? cart[indexOfCart(id)].quantity : 1);
  let initialLastUnits = () => (inCart(id) ? cart[indexOfCart(id)].quantity : -1);
  const [count, setCount] = useState(initialCount);
  const [lastUnits, setLastUnits] = useState(initialLastUnits);
  const [showIconElim, setSetShowIconElim] = useState(false);

  const handleAddCart = (id) => {
    let prod = products.find((p) => p.id === id);
    if (prod) prod.quantity = count;
    setLastUnits(count);
    if (inCart(id)) {
      cart[indexOfCart(id)] = prod;
      return dispatch(editProductCart(cart));
    }
    dispatch(addProductCart(prod));
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
    setCount(1);
    setSetShowIconElim(false);
  };

  return (
    <motion.div style={{ width: '100%' }} whileHover={{ scale: 1.02 }}>
      <Card
        minW='full'
        minH={!actualUser.admin ? 500 : 300}
        maxH={500}
        h='full'
        maxW={{ base: 'full', md: '50%', lg: 'full' }}
        border={inCart(id) || actualUser?.admin ? '1px solid #F6ACA3' : '1px solid #F8E0E6'}
        boxShadow='2xl'
        borderRadius='10px'
        pos='relative'
      >
        <CardBody
          w='full'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          {loading || !image ? (
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
          ) : (
            <Link to={`/product/${id}`}>
              <Image
                w='full'
                objectFit='cover'
                maxW={200}
                margin='auto'
                loading='lazy'
                src={image}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              />
            </Link>
          )}
          <VStack
            w='full'
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='center'
          >
            <HStack align='center' justifyContent='center'>
              <Tag
                w='fit-content'
                cursor='pointer'
                pointerEvents='none'
                size='lg'
                variant='subtle'
                colorScheme='primary'
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                maxW={200}
              >
                <TagLeftIcon as={ImPriceTag} />
                <TagLabel>$ {price}</TagLabel>
              </Tag>

              <Heading textTransform='capitalize' fontWeight={700} size='md'>
                {name}
              </Heading>
            </HStack>

            <HStack flexWrap="wrap" maxW={300} justify='flex-start' align='center' gap={2}>
              {category?.map((c) => (
                <Tag
                  w='fit-content'
                  cursor='pointer'
                  pointerEvents='none'
                  size='lg'
                  variant='subtle'
                  colorScheme='cyan'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  gap={10}
                  maxW={250}
                >
                  <TagLabel>{c}</TagLabel>
                </Tag>
              ))}
            </HStack>

            <HStack justify='flex-start' align='center' gap={10}>
              <Tag
                w='fit-content'
                cursor='pointer'
                pointerEvents='none'
                size='lg'
                variant='subtle'
                colorScheme='whatsapp'
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                gap={10}
              >
                <TagLabel>{brand}</TagLabel>
              </Tag>
            </HStack>
          </VStack>
        </CardBody>
        <Divider />

        <CardFooter maxW="full" w='full' display="flex" flexWrap="wrap" justifyContent='center' borderRadius='0 0 10px 10px'>
          <Text  fontWeight={300}>{description}</Text>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CardProductCreateAndEdit;
