import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Products from "./Pages/Products/Products.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import Create from "./Pages/Create/Create.jsx";
import { Container, IconButton, useColorMode } from "@chakra-ui/react";
import Nav from "./Components/Nav/Nav";
import { getAllProducts } from "./redux/actions/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // const { toggleColorMode, colorMode } = useColorMode(); //para el dark y light theme
  return (
    <Container
      maxW="container.lg"
      height="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Nav />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<Create />} />
        {/*  */}
      </Routes>
      {/* <IconButton // para light y dark theme (crear un componente para esto asi no queda desprolijo en app)
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode} 
        // icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} // para light y dark icons (agregarlos a dependencias en el futuro)
      />  */}
    </Container>
  );
}

export default App;
