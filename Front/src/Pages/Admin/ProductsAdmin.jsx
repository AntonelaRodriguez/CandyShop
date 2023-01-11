import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import CardProductAdmin from './CardProductAdmin/CardProductAdmin.jsx'
import Pagination from '../../Components/Pagination/Pagination'
import Searchname from '../../Components/SearchName/Searchname'
import Filters from '../../Components/Filters/Filters'
import { applyFilters, cleanUpFilters, cleanUpSearch, setCurrentPage, setFilters, setLoading } from '../../redux/actions/actions'

const ProductsAdmin = () => {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(setLoading(true));
    dispatch(setFilters({ order: '', tacc: '', brand: '', category: '', reverse: false }))
    dispatch(applyFilters());
    return () => {
      window.scroll(0, 0)
    }
  }, [])
  
  const emptyAfterFiltering = useSelector((state) => state.emptyAfterFiltering)
  const recentSearch = useSelector((state) => state.recentSearch)
  const loading = useSelector((state) => state.loading)
  const currentPage = useSelector((state) => state.currentPage)

  let products = useSelector((state) => state.products)
  const [name, setName] = useState('')

  const handleChange = (event) => {
    setName(event.target.value)
  }
  const [productsPerPage] = useState(9)
  const indexOfLastPost = currentPage * productsPerPage
  const indexOfFirstPost = indexOfLastPost - productsPerPage
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  }

  useEffect(() => {
    return () => {
      dispatch(cleanUpFilters())
    }
  }, [])

  function handleResetFilters() {
    dispatch(cleanUpFilters());
    dispatch(setCurrentPage(1))
    window.scroll(0, 0);
  }

  function handleResetSearch() {
    dispatch(cleanUpSearch());
    dispatch(setCurrentPage(1))
    window.scroll(0, 0);
  }

  return (
    <Container
      maxW='container.lg'
      display='flex'
      w='full'
      flexDirection={{ base: 'column', md: 'column' }}
      gap={10}
      mb={10}
    >
      <Stack direction='column' w='full' align='center' justifyContent='space-between'>
        <Searchname name={name} handleChange={handleChange} setName={setName} />
        <Stack justifyContent='space-between' direction='row'>
          <Stack w='full' h='full' gap={4} p={5}>
            {
              loading
                ? <Spinner
                    thickness='10px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color={'primary.200'}
                    size='xl'
                    p={10}
                    m={10}
                  />
                : recentSearch
                  ?
                    <>
                      <Flex alignItems='center' gap={4}>
                        <Text fontSize='lg' fontWeight={600}>Search results: {products.length}</Text>
                        <Button
                          id='clearAllFilterButton'
                          onClick={(e) => { handleResetSearch() }}
                          variant='solid'
                          _hover={{ backgroundColor: 'primary.400' }}
                          color='whiteAlpha.900'
                          bg={'primary.300'}
                        >
                          Start Over
                        </Button>
                      </Flex>
                      {
                        currentPosts?.map((p, i) => {
                          return (
                            <CardProductAdmin
                              key={p.description}
                              name={p.name}
                              description={p.description}
                              image={p.image}
                              id={p.id}
                              price={p.price}
                            />
                          )
                        })
                      }
                    </>
                  : <>
                      <Filters />
                      {
                        emptyAfterFiltering
                          ? <Stack justify='start' align='center' h='sm' pt={10} fontSize='lg' fontWeight={600} gap={7}>
                            <Text>No filters result. :( </Text>
                            <Text>There are no products that match your current filters. Try removing some of them to get better results.</Text>
                            <Button
                              id='clearAllFilterButton'
                              onClick={(e) => { handleResetFilters() }}
                              variant='solid'
                              _hover={{ backgroundColor: 'primary.400' }}
                              color='whiteAlpha.900'
                              bg={'primary.300'}
                            >
                              Clear All Filter + Start Over
                            </Button>
                          </Stack>
                          : currentPosts?.map((p, i) => {
                            return (
                              <CardProductAdmin
                                key={p.description}
                                name={p.name}
                                description={p.description}
                                image={p.image}
                                id={p.id}
                                price={p.price}
                              />
                            )
                          })
                      }
                    </>
            }
          </Stack>
        </Stack>

        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </Stack>
    </Container>
  )
}

export default ProductsAdmin
