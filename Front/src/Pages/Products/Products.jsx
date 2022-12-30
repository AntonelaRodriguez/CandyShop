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
import Footer from '../../Components/Footer/Footer'
import { BsSearch } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
// import { Link } from 'react-router-dom'

const Products = () => {
  const [name, setName] = useState('')

  const handleChange = (event) => {
    setName(event.target.value)
  }

  //------filter

  const filters = useSelector((state) => state.filters)
  function handleFilters(event) {
    setCurrentPage(1)
    dispatch(actions.setFilters({ ...filters, [event.target.name]: event.target.value }))
    dispatch(actions.applyFilters({ ...filters, [event.target.name]: event.target.value }))
  }

  //--------filter

  const handleSumbit = (event) => {
    event.preventDefault()
    if (name) {
      setCurrentPage(1)
      dispatch(actions.searchCandy(name))
      setName('')
    } else {
      dispatch(actions.getAllProducts())
    }
  }

  const dispatch = useDispatch()

  const products = useSelector((state) => state.products)

  const [, setOrder] = useState('')

  const handlerSort = (e) => {
    setOrder(dispatch(actions.sort(e.target.value)))
  }

  const handleClear = (e) => {
    setOrder(dispatch(actions.getAllProducts()))
    document.querySelectorAll('option').forEach((option) => (option.selected = false))
  }

  //--- pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(9)

  const indexOfLastPost = currentPage * productsPerPage
  const indexOfFirstPost = indexOfLastPost - productsPerPage
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)

 console.log("products", products)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }
  //----

  return (
    <Flex direction='column' justifyContent='center' align='center'>
      <Heading as={'h2'} p={10}>
        All Products
      </Heading>
      <form onSubmit={(event) => handleSumbit(event)}>
        <Flex
          bg='primary.200'
          p={2}
          borderRadius={'md'}
          justifyContent='center'
          width='fit-content'
        >
          <Input
            paddingRight={2}
            paddingLeft={2}
            value={name}
            type='search'
            focusBorderColor='#ffffff78'
            // variant='unstyled'
            outline='none'
            border={'none'}
            _focus={{ outline: 'none', border: 'none' }}
            _placeholder={{ opacity: 1, color: 'white' }}
            name=''
            placeholder='Search...'
            id=''
            width='auto'
            onChange={handleChange}
          />
          <Button
            type='submit'
            variant='solid'
            _hover={{ backgroundColor: 'primary.400' }}
            color='whiteAlpha.900'
            bg={'primary.300'}
          >
            <BsSearch />
          </Button>
        </Flex>
      </form>
      <Flex direction='row' justifyContent='center' align='center' p={5}>
        <Select
          placeholder='Sort'
          bg={'primary.200'}
          _hover={{ backgroundColor: 'primary.400' }}
          onChange={handlerSort}
          m={2}
        >
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
          <option value='Price: Highest'>Price: Highest</option>
          <option value='Price: Lowest'>Price: Lowest</option>
        </Select>
        <Button
          variant='solid'
          _hover={{ backgroundColor: 'primary.400' }}
          color='whiteAlpha.900'
          bg={'primary.300'}
          onClick={handleClear}
        >
          <ImCross />
        </Button>
      </Flex>

      {/* filters */}
      <Flex direction='row' justifyContent='center' align='center' p={5}>
        <Select
          placeholder='T.A.C.C'
          name='tacc'
          value={filters.tacc}
          bg={'primary.200'}
          _hover={{ backgroundColor: 'primary.400' }}
          onChange={handleFilters}
          m={2}
        >
          <option value='tacc'>With TACC</option>
          <option value='notacc'>No TACC</option>
        </Select>

        <Select
          placeholder='BRAND'
          name='brand'
          value={filters.brand}
          bg={'primary.200'}
          _hover={{ backgroundColor: 'primary.400' }}
          onChange={handleFilters}
          m={2}
        >
          <option value='aguila'>Aguila</option>
          <option value='arcor'>Arcor</option>
          <option value='bagley'>Bagley</option>
          <option value='bon o bon' option>
            Bon o Bon
          </option>
          <option value='billiken'>Billiken</option>
          <option value='bonafide'>Bonafide</option>
          <option value='cofler'>Cofler</option>
          <option value='felfort'>Felfort</option>
          <option value='ferrero'>Ferrero</option>
          <option value='georgalos'>Georgalos</option>
          <option value='godet'>Godet</option>
          <option value='jorgito'>Jorgito</option>
          <option value='milka'>Milka</option>
          <option value='mogul'>Mogul</option>
          <option value='nestle'>Nestle</option>
          <option value='terrabusi'>Terrabusi</option>
          <option value='tofi'>Tofi</option>
          <option value='topline'>Topline</option>
          <option value='trident'>Trident</option>
          <option value='unknown'>Unknown</option>
        </Select>
        <Select
          placeholder='CATEGORY'
          value={filters.category}
          name='category'
          bg={'primary.200'}
          _hover={{ backgroundColor: 'primary.400' }}
          onChange={handleFilters}
          m={2}
        >
          <option value='biscuits'>biscuits</option>
          <option value='bubble gum'>bubble gum</option>
          <option value='caramel cookie'>caramel cookie</option>
          <option value='candy'>candy</option>
          <option value='cerealbars'>cerealbars</option>
          <option value='chocolate'>chocolate</option>
          <option value='gummies'>gummies</option>
          <option value='lollipop'>lollipop</option>
          <option value='tablets'>tablets</option>
          <option value='unknown'>unknown</option>
        </Select>
      </Flex>

      <Stack gap={3} justify='center' align='center' overflow='hidden'>
        <Grid
          p={20}
          gridTemplateColumns={{
            sm: 'repeat(1,1fr)',
            md: 'repeat(2,1fr)',
            lg: 'repeat(3,1fr)'
          }}
          gap={20}
          minW='full'
        >
          {currentPosts &&
            currentPosts.map((product) => {
              return (
                <GridItem  key={product.id}>     
                  <CardProduct
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    availability= {product.availability}
                  />
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
      <Footer />
    </Flex>
  )
}

export default Products
