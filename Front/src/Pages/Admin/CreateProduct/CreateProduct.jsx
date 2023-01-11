import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { postProduct, getAllCategories, getAllProducts } from '../../../redux/actions/actions';

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
  Flex,
  Badge,
} from '@chakra-ui/react';

import CardProductCreateAndEdit from '../../../Components/CardProductCreateAndEdit/CardProductCreateAndEdit';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

//nombre
//descripción
//categoría
//marca
//tac
//imagen
//precio
//stock
//disponibilidad

const Create = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const category = useSelector((state) => state.categories);
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

    /* console.log(file); */
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

  /* useEffect(() => {
    dispatch(getcategory());
    dispatch(getBrand());
  }, []);
 */
  function handleChange(e) {
    if (e.target.name === 'price') {
      if (!/^[0-9]{0,4}$/.test(e.target.value)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Cannot contain more than 4 digits.',
          showConfirmButton: false,
          timer: 1400,
        });
        return;
      }
    }

    if (e.target.name === 'name') {
      if (!(/^[a-zA-Z0-9\u00C0-\u017F()" "]{0,31}$/.test(e.target.value))) {
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
      if (!(/^[a-zA-Z0-9\u00C0-\u017F()" "]{0,51}$/.test(e.target.value))) {
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

    if (e.target.name === 'stock') {
      if (!/^[0-9]{0,4}$/.test(e.target.value)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Cannot contain more than 4 digits.',
          showConfirmButton: false,
          timer: 1400,
        });
        return;
      }
      
    }
    

    setInput({
      ...input,
      [e.target.name]: e.target.value.replace(/^\s+|\s+$/, " "),
    });
  }

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

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

  function handleDeleteCategories(e) {
    setInput({
      ...input,
      category: input.category.filter((param) => param !== e),
    });
  }

  function handleSelectBrand(e) {
    setInput({
      ...input,
      brand: [...input.brand, e.target.value],
    });
  }

  function handleSubmit(e) {
    console.log(input);
    e.preventDefault();
    let crear = {
      name: input.name,
      description: input.description,
      category: input.category,
      brand: input.brand,
      tacc: input.tacc === 'True' ? true : false,
      image: image,
      price: Number(input.price),
      stock: Number(input.stock),
    };

    dispatch(postProduct(crear));
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
    dispatch(getAllProducts());
    navigate('/admin/ProductsAdmin');
    alert('Product created succesfully');
  }
  return (
    <Stack direction='row' m='auto' w='full' align='center' justify='center' gap={15}>
      <Stack maxW='100%' direction='row' m='auto' w='full' justify='center'>
        <form action='submit' onSubmit={(e) => handleSubmit(e)}>
          <Stack w='full' maxW='full' spacing={10}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
               // maxLength={40}
                type='text'
                value={input.name}
                name='name'
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
               // maxLength={55}
                placeholder='Type a Description'
                value={input.description}
                name='description'
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <select onChange={(e) => handleSelectCategories(e)}>
                <option>Select category</option>
                {category?.map((g) => {
                  return <option value={g.name}>{g.name}</option>;
                })}
              </select>
              {/* DELETE CATEGORY */}
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
                      <Button colorScheme='red' size='xs' onClick={() => handleDeleteCategories(e)}>
                        X
                      </Button>
                    </Stack>
                  );
                })}
              </Flex>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Brand</FormLabel>
              <select name='brand' onChange={(e) => handleChange(e)}>
                <option>Select Brand</option>
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

            <FormControl isRequired>
              <FormLabel as='legend'>Tacc</FormLabel>
              <RadioGroup>
                <HStack spacing='24px'>
                  <Radio name='tacc' onChange={(e) => handleChange(e)} value='True'>
                    Yes
                  </Radio>
                  <Radio name='tacc' onChange={(e) => handleChange(e)} value='False'>
                    No
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input type='number' value={input.price} name='price' onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Stock</FormLabel>
              <Input type='number' value={input.stock} name='stock' onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor='file'>Img URL</FormLabel>
              <Input
                id='fileInput'
                type='file'
                // value={image}
                name='file'
                onChange={(e) => uploadImage(e)}
              />
            </FormControl>

            <Button disabled={!input?.category.length || input?.brand === ""} type='submit' colorScheme='primary'>
              Crear
            </Button>
          </Stack>
        </form>
      </Stack>
      <CardProductCreateAndEdit
        name={input?.name}
        description={input?.description}
        image={image}
        id={input?.id}
        price={input?.price}
        brand={input?.brand}
        category={input?.category}
      />
    </Stack>
  );
};

export default Create;
