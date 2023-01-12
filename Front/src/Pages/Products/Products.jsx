import React, { useState } from 'react';
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
  Select,
  Spinner,
  Box,
} from '@chakra-ui/react';
import CardProduct from '../../Components/CardProduct/CardProduct';
import * as actions from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../Components/Pagination/Pagination';
import Footer from '../../Components/Footer/Footer';
import { BsSearch } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import Filters from '../../Components/Filters/Filters';
import { Banner } from './BannerProducts';
// import { Link } from 'react-router-dom'

const Products = () => {
  const [name, setName] = useState('');
  const emptyAfterFiltering = useSelector((state) => state.emptyAfterFiltering);
  const recentSearch = useSelector((state) => state.recentSearch);
  const loading = useSelector((state) => state.loading);
  const handleChange = (event) => {
    setName(event.target.value);
  };

  //------filter

  const filters = useSelector((state) => state.filters);
  function handleFilters(event) {
    // setCurrentPage(1)
    dispatch(actions.setCurrentPage(1));
    dispatch(
      actions.setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      })
    );
    dispatch(
      actions.applyFilters({
        ...filters,
        [event.target.name]: event.target.value,
      })
    );
  }

  //--------filter

  const handleSumbit = (event) => {
    event.preventDefault();
    dispatch(actions.cleanUpFilters());
    dispatch(actions.setLoading(true));
    if (name) {
      // setCurrentPage(1)
      dispatch(actions.setCurrentPage(1));
      dispatch(actions.searchCandy(name));
      setName('');
    } else {
      dispatch(actions.getAllProducts());
    }
  };

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const [, setOrder] = useState('');

  const handlerSort = (e) => {
    setOrder(dispatch(actions.sort(e.target.value)));
    dispatch(actions.setCurrentPage(1));
  };

  const handleClear = (e) => {
    setOrder(dispatch(actions.getAllProducts()));
    document
      .querySelectorAll('option')
      .forEach((option) => (option.selected = false));
  };

  //--- pagination
  // const [currentPage, setCurrentPage] = useState(1)
  let currentPage = useSelector((state) => state.currentPage);
  let categories = useSelector((state) => state.categories);
  let brands = useSelector((state) => state.brands);
  const [productsPerPage] = useState(9);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    // setCurrentPage(pageNumber)
    dispatch(actions.setCurrentPage(pageNumber));
  };

  // const prevPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1)
  //   }
  // }

  // const nextPage = () => {
  //   if (currentPage !== Math.ceil(products.length / productsPerPage)) {
  //     setCurrentPage(currentPage + 1)
  //   }
  // }
  //----
  function handleResetFilters() {
    dispatch(actions.cleanUpFilters());
    window.scroll(0, 0);
  }
  function handleResetSearch() {
    dispatch(actions.cleanUpSearch());
    window.scroll(0, 0);
  }

  return (
    <Flex direction='column' justifyContent='center' align='center'>
      <Stack display="flex" flexDirection="column" align="center" gap={5} w='full' >
        <Heading fontSize="4xl" as="h2" textAlign="center" fontWeight={700} color="blackAlpha.900">Store</Heading>
        <Banner />
      </Stack>
      <form onSubmit={(event) => handleSumbit(event)}>
        <Flex
          bg='primary.200'
          p={2}
          mb={8}
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

      {loading ? (
        <Spinner
          thickness='10px'
          speed='0.65s'
          emptyColor='gray.200'
          color={'primary.200'}
          size='xl'
          p={10}
          m={10}
        />
      ) : recentSearch ? (
        <>
          <Flex alignItems='center' gap={4}>
            <Text fontSize='lg' fontWeight={600}>
              Search results: {products.length}
            </Text>
            <Button
              id='clearAllFilterButton'
              onClick={(e) => {
                handleResetSearch();
              }}
              variant='solid'
              _hover={{ backgroundColor: 'primary.400' }}
              color='whiteAlpha.900'
              bg={'primary.300'}
            >
              Start Over
            </Button>
          </Flex>
          <Grid
            p={20}
            pt={10}
            gridTemplateColumns={{
              sm: 'repeat(1,1fr)',
              md: 'repeat(2,1fr)',
              lg: 'repeat(3,1fr)',
            }}
            gap={20}
            minW='full'
          >
            {currentPosts.length
              ? currentPosts.map((product) => {
                  return (
                    <GridItem key={product.id}>
                      <CardProduct
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        availability={product.availability}
                      />
                    </GridItem>
                  );
                })
              : null}
          </Grid>
        </>
      ) : (
        <>
          <Filters />
          {emptyAfterFiltering ? (
            <Stack
              justify='start'
              align='center'
              h='sm'
              pt={10}
              fontSize='lg'
              fontWeight={600}
              gap={7}
            >
              <Text>No filters result. :( </Text>
              <Text>
                There are no products that match your current filters. Try
                removing some of them to get better results.
              </Text>
              <Button
                id='clearAllFilterButton'
                onClick={(e) => {
                  handleResetFilters();
                }}
                variant='solid'
                _hover={{ backgroundColor: 'primary.400' }}
                color='whiteAlpha.900'
                bg={'primary.300'}
              >
                Clear All Filter + Start Over
              </Button>
            </Stack>
          ) : (
            <Stack gap={3} justify='center' align='center' overflow='hidden'>
              <Grid
                p={20}
                pt={10}
                gridTemplateColumns={{
                  sm: 'repeat(1,1fr)',
                  md: 'repeat(2,1fr)',
                  lg: 'repeat(3,1fr)',
                }}
                gap={20}
                minW='full'
              >
                {currentPosts.length
                  ? currentPosts.map((product) => {
                      return (
                        <GridItem key={product.image}>
                          <CardProduct
                            key={product.image}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            availability={product.availability}
                          />
                        </GridItem>
                      );
                    })
                  : null}
              </Grid>
            </Stack>
          )}
        </>
      )}
      {/* { 
       emptyAfterFiltering 
        ? <Stack justify='start' align='center' h='sm' pt={10} fontSize='lg' fontWeight={600} gap={7}>
            <Text>No filters result. :( </Text>
            <Text>There are no products that match your current filters. Try removing some of them to get better results.</Text>
            <Button 
              id='clearAllFilterButton'
              onClick={(e) => {handleResetFilters()}}
              variant='solid'
              _hover={{ backgroundColor: 'primary.400' }}
              color='whiteAlpha.900'
              bg={'primary.300'}
            >
              Clear All Filter + Start Over
            </Button>
          </Stack>
        : <Stack gap={3} justify='center' align='center' overflow='hidden'>
            <Grid
              p={20}
              pt={10}
              gridTemplateColumns={{
                sm: 'repeat(1,1fr)',
                md: 'repeat(2,1fr)',
                lg: 'repeat(3,1fr)'
              }}
              gap={20}
              minW='full'
            >
              {currentPosts.length ? (
                currentPosts.map((product) => {
                  return (
                    <GridItem key={product.id}>
                      <CardProduct
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        availability={product.availability}
                      />
                    </GridItem>
                  )
                }))
                : null
              }
            </Grid>
          </Stack>
      } */}

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        currentPage={currentPage}
        paginate={paginate}
        // prevPage={prevPage}
        // nextPage={nextPage}
      />
      <Footer />
    </Flex>
  );
};

export default Products;
