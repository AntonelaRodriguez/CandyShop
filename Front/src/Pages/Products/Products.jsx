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
import Pagination from '../../Components/Pagination/Pagination'
// import { Link } from 'react-router-dom'




const Products = () => {
  
  const [name, setName] = useState("")
  
  const handleChange = event => {
    setName (event.target.value)
  }
  console.log(name)
  
  //------filter

  const filters = useSelector((state) => state.filters);
  function handleFilters(event) {
    dispatch(actions.setFilters({ ...filters, [event.target.name]: event.target.value }));
    dispatch(actions.applyFilters({ ...filters, [event.target.name]: event.target.value  }));
  }

  //--------filter

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

  //--- pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
 };

 const nextPage = () => {
    if (currentPage !== Math.ceil(products.length / productsPerPage)) {
       setCurrentPage(currentPage + 1);
    }
 };
  //----

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

    {/* filters */}
    <Select
          placeholder="T.A.C.C"
          name="tacc"
          value={filters.tacc}
          bg={'primary.200'}
          _hover={{ backgroundColor: 'primary.400' }}
          onChange={handleFilters}
          m={2}
        >
          <option value="tacc">TACC</option>
          <option value="notacc">NO TACC</option>
        </Select>

        <Select
          placeholder="BRAND"
          name="brand"
          value={filters.brand}
          bg={'primary.200'}
          _hover={{ backgroundColor: 'primary.400' }}
          onChange={handleFilters}
          m={2}
        >
          <option value="Aguila">Aguila</option>
          <option value="Arcor">Arcor</option>
          <option value="Bagley">Bagley</option>
          <option value="Bon o Bon"option>Bon o Bon</option>
          <option value="Billiken">Billiken</option>
          <option value="Bonafide">Bonafide</option>
          <option value="Cofler">Cofler</option>
          <option value="Felfort">Felfort</option>
          <option value="Ferrero">Ferrero</option>
          <option value="Georgalos">Georgalos</option>
          <option value="Godet">Godet</option>
          <option value="Jorgito">Jorgito</option>
          <option value="Milka">Milka</option>
          <option value="Mogul">Mogul</option>
          <option value="Nestle">Nestle</option>
          <option value="Terrabusi">Terrabusi</option>
          <option value="Tofi">Tofi</option>
          <option value="Topline">Topline</option>
          <option value="Trident">Trident</option>
          <option value="Unknown">Unknown</option>
        </Select>
        <Select
          placeholder="CATEGORY"
          value={filters.category}
          name="category"
          bg={'primary.200'}
          _hover={{ backgroundColor: 'primary.400' }}
          onChange={handleFilters}
          m={2}
        >
          <option value="biscuits">biscuits</option>
          <option value="bubble gum">bubble gum</option>
          <option value="caramel cookie">caramel cookie</option>
          <option value="candy">candy</option>
          <option value="cerealbars">cerealbars</option>
          <option value="chocolate">chocolate</option>
          <option value="gummies">gummies</option>
          <option value="lollipop">lollipop</option>
          <option value="tablets">tablets</option>
          <option value="unknown">unknown</option>
        </Select>
        
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
          {currentPosts && currentPosts.map((product) => {
            return (
              <GridItem>
                <CardProduct key={product.id} id={product.id} image={product.image} name={product.name} price={product.price} />
              </GridItem>
            )
          })}
        </Grid>
      </Stack>
      <Pagination 
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            currentPage={currentPage}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
            />
  </Flex>
  )
}

export default Products
