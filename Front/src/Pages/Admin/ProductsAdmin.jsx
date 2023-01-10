import React, { useState, useEffect } from 'react'
import SimpleSidebar from './src/NavAdmin/NavAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Flex, Select, Spinner, Stack } from '@chakra-ui/react'
import CardProductAdmin from './CardProductAdmin/CardProductAdmin.jsx'
import Pagination from '../../Components/Pagination/Pagination'
import { ImCross } from 'react-icons/im'
import Searchname from '../../Components/SearchName/Searchname'
import Filters from '../../Components/Filters/Filters'
import { cleanUpFilters } from '../../redux/actions/actions'
// import Order from "../../Components/Order/Order";

const ProductsAdmin = () => {
  const dispatch = useDispatch()

  let products = useSelector((state) => state.products)
  const [name, setName] = useState('')

  const handleChange = (event) => {
    setName(event.target.value)
  }

  //--- pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(9)

  const indexOfLastPost = currentPage * productsPerPage
  const indexOfFirstPost = indexOfLastPost - productsPerPage
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)

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
  useEffect(() => {
    return () => {
      dispatch(cleanUpFilters())
    }
  }, [])

  return (
    <Container
      maxW='container.lg'
      display='flex'
      w='full'
      flexDirection={{ base: 'column', md: 'column' }}
      gap={10}
    >
      
      {/* filtors */}

      <Stack direction='column' w='full' align='center' justifyContent='space-between'>
        {/* busqueda */}

        <Searchname name={name} handleChange={handleChange} setName={setName} />
        {/*  ordenamientos */}
        {/* <Order /> */}

        {/* // productos y sidebar */}
        <Stack justifyContent='space-between' direction='row'>
          <Stack w='full' h='full' gap={4} p={5}>
            <Filters />
            {currentPosts.length ? (
              currentPosts.map((p, i) => {
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
                ) : (
                  <Spinner size='xl' />
                  )}
          </Stack>
        </Stack>

        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          currentPage={currentPage}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Stack>
    </Container>
  )
}

export default ProductsAdmin
