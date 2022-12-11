import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { editProduct, getAllCategories, getProductDetails } from '../../redux/actions/actions'

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
  Center
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const EditProduct = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const category = useSelector((state) => state.categories)
  const productDetail = useSelector((state) => state.productDetail)
  const brand = useSelector((state) => state.brands)

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
  console.log(input)
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
    alert('Videogame EditProductd succesfully')
  }
  return (
    <Stack direction='row' align='center' justify='center' gap={15}>
      <form action='submit' onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type='text' value={input.name} name='name' onChange={handleChange} />
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder='Type a Description'
              value={input.description}
              name='description'
              onChange={handleChange}
            />
            <FormLabel>category</FormLabel>
            <select onChange={(e) => handleSelectCategories(e)}>
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
            {input.category?.map((e, i) => {
              return (
                <Stack key={e + i} direction='row' align='center' justify='flex-start'>
                  <Badge colorScheme='pink'>{e}</Badge>
                  <Button colorScheme='red' size='xs' onClick={() => handleDeleteCategories(e)}>
                    X
                  </Button>
                </Stack>
              )
            })}
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

            <FormLabel as='legend'>Tacc</FormLabel>
            <RadioGroup>
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
              Submit
            </Button>
          </FormControl>
        </Stack>
      </form>
      <Stack width={250}>
        <img src={image} alt='product pic' />
      </Stack>
    </Stack>
  )
}

export default EditProduct
