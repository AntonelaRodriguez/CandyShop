import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  editProduct,
  getAllCategories,
  getAllProducts,
  getProductDetails,
} from '../../redux/actions/actions';

import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  RadioGroup,
  HStack,
  Radio,
  Textarea,
  Box,
  Badge,
  Center,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import CardProductAdmin from '../Admin/CardProductAdmin/CardProductAdmin';
import CardProductCreateAndEdit from '../../Components/CardProductCreateAndEdit/CardProductCreateAndEdit';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const category = useSelector((state) => state.categories);
  const productDetail = useSelector((state) => state.productDetail);
  const brand = useSelector((state) => state.brands);
  const navigate = useNavigate();
  // Cloudinary
  const [image, setImage] = useState('');

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'images');
    const { data: file } = await axios.post(
      'https://api.cloudinary.com/v1_1/dev3snn9g/image/upload',
      data,
    );

    setImage(file.secure_url);
  };

  const [input, setInput] = useState({
    name: '',
    description: '',
    category: [],
    brand: '',
    tacc: '',
    price: null,
    stock: null,
  });
  console.log(input);
  function handleChange(e) {
    if (e.target.name === 'price') {
      if (!/^[0-9]{0,6}$/.test(e.target.value)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'no podes poner mas de 4 cifras',
          showConfirmButton: false,
          timer: 1400,
        });
        return;
      }
    }

    if (e.target.name === 'name') {
      if (!/^[a-zA-Z0-9\u00C0-\u017F()" "]{0,31}$/.test(e.target.value)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'The name must be between 1 and 21 characters',
          showConfirmButton: false,
          timer: 1400,
        });
        return;
      }
    }

    if (e.target.name === 'description') {
      if (!/^[a-zA-Z0-9\u00C0-\u017F()" "]{0,51}$/.test(e.target.value)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'The description must be between 1 and 51 characters',
          showConfirmButton: false,
          timer: 1400,
        });
        return;
      }
    }

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getAllCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail) {
      setImage(productDetail.image);
      setInput(productDetail);
    }
  }, [productDetail]);

  function handleSelectCategories(e) {
    if (input?.category.includes(e.target.value) || input?.category.length > 2) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Selected category',
        showConfirmButton: false,
        timer: 1400,
      });
      return;
    }
    setInput({
      ...input,
      category: [...input.category, e.target.value],
    });
  }

  console.log(input.category);
  function handleDeleteCategories(e) {
    setInput({
      ...input,
      category: input.category.filter((param) => param !== e),
    });
  }
  // console.log(productDetail.tacc)
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editProduct(id, input));
    setInput({
      name: '',
      description: '',
      category: [],
      brand: '',
      tacc: false,
      img: '',
      price: null,
      stock: null,
    });
    alert('Producto actualizado EditProductd succesfully');
    dispatch(getAllProducts());
    navigate('/admin/ProductsAdmin');
  }
  return (
    <Stack direction='row' ml={20} w='full' align='center' justify='center' gap={15}>
      <Stack direction='row' m='auto' w='full' justify='center'>
        <form action='submit' onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={10}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type='text' value={input.name} name='name' onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                maxLength={70}
                placeholder='Type a Description'
                value={input.description}
                name='description'
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <select onChange={(e) => handleSelectCategories(e)}>
                <option>Select category</option>
                {category?.map((g) => {
                  return <option value={g.name}>{g.name}</option>;
                })}
              </select>
              {/* DELETE CATEGORY */}
              {input.category && (
                <Flex flexWrap='wrap' maxW={300} p={3} gap={5}>
                  {input.category?.map((e, i) => {
                    return (
                      <Stack
                        width='fit-content'
                        key={e + i}
                        direction='row'
                        align='center'
                        justify='flex-start'
                      >
                        <Badge colorScheme='pink'>{e}</Badge>
                        <Button
                          colorScheme='red'
                          size='xs'
                          onClick={() => handleDeleteCategories(e)}
                        >
                          X
                        </Button>
                      </Stack>
                    );
                  })}
                </Flex>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Brand</FormLabel>
              <select name='brand' onChange={(e) => handleChange(e)}>
                <option value={input.brand}>Select Brand</option>
                {brand?.map((g) => {
                  return <option value={g}>{g}</option>;
                })}
              </select>
              {input.brand && (
                <Stack direction='row' align='center' justify='flex-start'>
                  <Badge colorScheme='blue' variant='outline'>
                    {input.brand}
                  </Badge>
                </Stack>
              )}
            </FormControl>

            <FormControl>
              <FormLabel as='legend'>Tacc</FormLabel>
              <RadioGroup defaultValue={productDetail.tacc === true ? 'True' : 'False'}>
                <HStack spacing='24px'>
                  <Radio
                    onChange={(e) => handleChange(e)}
                    defaultValue={input.tacc}
                    name='tacc'
                    value='True'
                  >
                    Yes
                  </Radio>
                  <Radio
                    onChange={(e) => handleChange(e)}
                    defaultValue={input.tacc}
                    name='tacc'
                    value='False'
                  >
                    No
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input type='number' value={input.price} name='price' onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input type='number' value={input.stock} name='stock' onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='file'>Img URL</FormLabel>
              <Input
                id='fileInput'
                type='file'
                // value={image}
                name='file'
                onChange={(e) => uploadImage(e)}
              />
            </FormControl>

            <Button type='submit' colorScheme='primary'>
              Editar
            </Button>
          </Stack>
        </form>
      </Stack>
      {input && (
        <CardProductCreateAndEdit
          name={input?.name}
          description={input?.description}
          image={image}
          id={input?.id}
          price={input?.price}
          brand={input?.brand}
          category={input?.category}
        />
      )}
    </Stack>
  );
};

export default EditProduct;
