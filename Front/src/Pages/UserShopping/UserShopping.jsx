import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  Flex,
  Select,
  Spinner,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import Pagination from "../../Components/Pagination/Pagination";
import { useEffect } from "react";
import { getUserCart } from "../../redux/actions/actions"
import { useAuth0 } from "@auth0/auth0-react";
import CardUserShopping from "./CardUserShopping/CardUserShopping"

const UserShopping = () => {


    const {isAuthenticated, user } = useAuth0();

    const dispatch = useDispatch();
    let carts = useSelector((state) => state.userCart)
    console.log(carts)

    carts = carts.filter((c) => c.state === 'completed');
    
     
    useEffect(()=>{
        if(isAuthenticated){
            dispatch(getUserCart(user.email));
        }
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
                    <CardUserShopping
                    key={p.orderN}
                    orderN={p.orderN}
                    date={p.date}
                    totalPrice={p.totalPrice}
                    state={p.state}
                  />
                );
              })
            ) : (
              <Spinner size="xl" />
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

export default UserShopping;