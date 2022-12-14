import React, { useState, useEffect } from 'react'
import SimpleSidebar from './src/NavAdmin/NavAdmin'
import { useSelector } from 'react-redux'
import { Button, Container, Flex, Select, Spinner, Stack, FormLabel, Text } from '@chakra-ui/react'
import CardProductAdmin from './CardProductAdmin/CardProductAdmin.jsx'
import CardOrderAdmin from './CardOrderAdmin/CardOrderAdmin'
import Pagination from '../../Components/Pagination/Pagination'
import { ImCross } from 'react-icons/im'
import Searchname from '../../Components/SearchName/Searchname'
import Filters from '../../Components/Filters/Filters'
import Order from '../../Components/Order/Order'
import { useDispatch } from 'react-redux'
import { getAllCarts } from '../../redux/actions/actions'

const OrdersAdmin = () => {
    let dispatch = useDispatch();
    let carts = useSelector((state) => state.allCarts)
    const [loading, setLoading] = useState(true);
    console.log(carts)
    carts = carts.filter((c) => c.state !== 'created');
    
    useEffect(()=>{
      dispatch(getAllCarts())
  },[])
  
    //--- pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(9)
  
    const indexOfLastPost = currentPage * productsPerPage
    const indexOfFirstPost = indexOfLastPost - productsPerPage
    const currentPosts = carts.slice(indexOfFirstPost, indexOfLastPost)
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  
    const prevPage = () => {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  
    const nextPage = () => {
      if (currentPage !== Math.ceil(carts.length / productsPerPage)) {
        setCurrentPage(currentPage + 1)
      }
    }
    //----
    //Stop spinner
    setTimeout(()=>{
      setLoading(false)
    }, 6000)

  return (
    <Container
      maxW="container.lg"
      display="flex"
      w="full"
      flexDirection={{ base: "column", md: "column" }}
      gap={10}
    >
      <Stack
        direction="column"
        w="full"
        align="center"
        justifyContent="space-between"
        >
        {/* // productos y sidebar */}
        <Stack justifyContent="space-between" direction="row">
          <Stack w="full" h="full" gap={4} p={5}>
            {currentPosts.length ? (
              currentPosts.map((p, i) => {
                return (
                  <CardOrderAdmin
                    key={p.orderN}
                    orderN={p.orderN}
                    date={p.date}
                    totalPrice={p.totalPrice}
                    state={p.state}
                    trackingNumber={p.trackingNumber}
                    UserEmail={p.UserEmail}
                    delivery={p.delivery}
                    variable={"button"}
                  />
                );
              })
            ) : (        
              loading === true ? 
                <Spinner size="xl" />
              :
              <Text fontWeight='600'>No orders found</Text>
              
            )}
          </Stack>
        </Stack>

        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={carts.length}
          currentPage={currentPage}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Stack>
    </Container>
  );
};

export default OrdersAdmin;
