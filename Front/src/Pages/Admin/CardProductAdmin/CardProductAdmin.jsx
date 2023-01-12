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
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SkeletonCard from '../../../Components/SkeletonCard/SkeletonCard';
import { getAllProducts, deleteProduct } from '../../../redux/actions/actions';

const CardProductAdmin = ({ name, description, image, id, price }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading);
  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts());
    navigate('/admin/ProductsAdmin');
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
      {loading || !image ? (
        <SkeletonCard />
      ) : (
        <Stack margin='auto' w={{ base: 'full', sm: '20%', lg: '15%' }} h='full'>
          {!image ? (
            <SkeletonCard />
          ) : (
            <Image
              objectFit='cover'
              w='full'
              margin='auto'
              h='full'
              src={image}
              loading='lazy'
              alt={description}
            />
          )}
        </Stack>
      )}

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
            onClick={() => removeProduct(id)}
            size={{ base: 'xs', lg: 'sm' }}
            variant='solid'
            colorScheme='red'
          >
            Delete Product
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardProductAdmin;
