import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  editProduct,
  getAllCategories,
  getAllProducts,
  getProductDetails
} from '../../redux/actions/actions'

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
  Flex
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import CardProductAdmin from '../Admin/CardProductAdmin/CardProductAdmin'

const EditProduct = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const category = useSelector((state) => state.categories)
  const productDetail = useSelector((state) => state.productDetail)
  const brand = useSelector((state) => state.brands)
  const navigate = useNavigate()
  // Cloudinary
  const [image, setImage] = useState('')

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()

    data.append('file', files[0])
    data.append('upload_preset', 'images')
    const { data: file } = await axios.post(
      'https://api.cloudinary.com/v1_1/dev3snn9g/image/upload',
      data
    )

    setImage(file.secure_url)
  }

  const [input, setInput] = useState({
    name: '',
    description: '',
    category: [],
    brand: '',
    tacc: '',
    price: null,
    stock: null
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(getProductDetails(id))
    dispatch(getAllCategories())
  }, [dispatch, id])

  useEffect(() => {
    if (productDetail) {
      setImage(productDetail.image)
      setInput(productDetail)
    }
  }, [productDetail])

  function handleSelectCategories(e) {
    setInput({
      ...input,
      category: [...input.category, e.target.value]
    })
  }

  function handleDeleteCategories(e) {
    setInput({
      ...input,
      category: input.category.filter((param) => param !== e)
    })
  }
  // console.log(productDetail.tacc)
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(editProduct(id, input))
    setInput({
      name: '',
      description: '',
      category: [],
      brand: '',
      tacc: false,
      img: '',
      price: null,
      stock: null
    })
    alert('Producto actualizado EditProductd succesfully')
    dispatch(getAllProducts())
    navigate('/admin/ProductsAdmin')
  }
  return (
    <Stack direction='row' p={15} w='full' align='center' justify='center' gap={15}>
      <form action='submit' onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2}>
          <FormControl>
            <Stack>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <Input type='text' id='name' value={input.name} name='name' onChange={handleChange} />
            </Stack>
            <Stack>
              <FormLabel htmlFor='desc'>Description</FormLabel>
              <Textarea
                id='desc'
                placeholder='Type a Description'
                value={input.description}
                name='description'
                onChange={handleChange}
              />
            </Stack>
            <FormLabel htmlFor='cat'>category</FormLabel>
            <select id='cat' onChange={(e) => handleSelectCategories(e)}>
              <option>Select category</option>
              {category?.map((g) => {
                return (
                  <option key={g.id + g.name} value={g.name}>
                    {g.name}
                  </option>
                )
              })}
            </select>
            {/* DELETE CATEGORY */}
            <Flex p={3} gap={5}>
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
                )
              })}
            </Flex>

            <FormLabel>Brand</FormLabel>
            <select name='brand' onChange={(e) => handleChange(e)}>
              <option value={input.brand}>Select Brand</option>
              {brand?.map((g, i) => {
                return (
                  <option key={g + i} value={g}>
                    {g}
                  </option>
                )
              })}
            </select>

            <Flex p={3} gap={5}>
              {input.brand && (
                <Stack direction='row' align='center' justify='flex-start'>
                  <Badge colorScheme='blue' variant='outline'>
                    {input.brand}
                  </Badge>
                  <Button colorScheme='red' size='xs' onClick={() => handleDeleteCategories(e)}>
                    X
                  </Button>
                </Stack>
              )}
            </Flex>

            <FormLabel as='legend'>Tacc</FormLabel>
            <RadioGroup 
            defaultValue={productDetail.tacc === true ? 'True' : 'False'}
            >
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

            <FormLabel>Price</FormLabel>

            <Input type='number' value={input.price} name='price' onChange={handleChange} />
            <FormLabel>Stock</FormLabel>

            <Input type='number' value={input.stock} name='stock' onChange={handleChange} />
            <FormLabel htmlFor='file'>Img URL</FormLabel>

            <Input
              id='fileInput'
              type='file'
              // value={image}
              name='file'
              onChange={(e) => uploadImage(e)}
            />

            <Button type='submit' colorScheme='primary'>
              Editar
            </Button>
          </FormControl>
        </Stack>
      </form>
      <Stack width='50%'>
        <CardProductAdmin
          name={input.name}
          description={input.description}
          image={image}
          id={input.id}
          price={input.price}
        />
      </Stack>
    </Stack>
  )
}

export default EditProduct
