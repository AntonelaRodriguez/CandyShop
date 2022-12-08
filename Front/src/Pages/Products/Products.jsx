import React, { useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Grid, 
  GridItem,
  Select
} from '@chakra-ui/react'
import CardProduct from '../../Components/CardProduct/CardProduct'
import * as actions from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'




const Products = () => {
  
  const [name, setName] = useState("")
  
  const handleChange = event => {
    setName (event.target.value)
  }
  console.log(name)
  
  const handleSumbit = (event) => {
    event.preventDefault()
    if(name) {
      dispatch(actions.searchCandy(name))
       setName('')
    } else {
      dispatch(actions.getAllProducts())
    }
    console.log('prueba')
  }

  const dispatch = useDispatch()
 

  const products = useSelector(state => state.products)
  console.log(products);

  const [, setOrder] = useState('');

  const handlerSort = (e) => {
    setOrder(dispatch(actions.sort(e.target.value)))
  }

  const handleClear = (e) => {
    setOrder(dispatch(actions.getAllProducts()))
    document.querySelectorAll('option').forEach(option => option.selected = false);
  }

  return (
  <Flex 
  direction='column'
  justifyContent="center"
  align="center">
  <Heading as={'h2'} p={10}>All Products</Heading>
  <form onSubmit={(event)=>handleSumbit(event)}>
    <Flex bg="primary.200" p={2} borderRadius={'md'} justifyContent='center' width='fit-content'>
    <Input
      paddingRight={2}
      paddingLeft={2}
      value={name}
      type="search"
      focusBorderColor='#ffffff78'
      // variant='unstyled'
      outline="none"
      border={'none'}
      _focus={{ outline: 'none', border: 'none' }}
      _placeholder={{ opacity: 1, color: 'white' }}
      name=""
      placeholder="Search..."
      id=""
      width='auto'
      onChange={handleChange}
    />
    <Button
      type='submit'
      variant="solid"
      _hover={{ backgroundColor: 'primary.400' }}
      color="whiteAlpha.900"
      bg={'primary.300'}
      >
      <img src="src\assets\magnifying_glass_search_logo.svg" width="15px" height="15px"/>
      </Button>
    </Flex>
  </form>
    <Flex direction='row'
  justifyContent="center"
  align="center"
  p={5}>
            <Select 
            placeholder="Sort"
            bg={'primary.200'}
            _hover={{ backgroundColor: 'primary.400' }} 
            onChange={handlerSort}
            m={2}
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="Price: Highest">Price: Highest</option>
              <option value="Price: Lowest">Price: Lowest</option>
            </Select>
            <Button 
            variant="solid"
            _hover={{ backgroundColor: 'primary.400' }}
            color="whiteAlpha.900"
            bg={'primary.300'}
            onClick={handleClear}
            >✖</Button>
            </Flex>
    <Stack gap={3} justify="center" align="center" overflow="hidden">
        <Grid
          p={20}
          gridTemplateColumns={{
            sm: 'repeat(1,1fr)',
            md: 'repeat(2,1fr)',
            lg: 'repeat(3,1fr)'
          }}
          gap={20}
          minW="full"
        >
          {products.map((product) => {
            return (
              <GridItem>
                <CardProduct key={product.id} id={product.id} image={product.image} name={product.name} price={product.price} />
              </GridItem>
            )
          })}
        </Grid>
      </Stack>
  </Flex>
  )
}

export default Products
