import { Navigate, Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Products from './Pages/Products/Products.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import SignIn from './Pages/SignIn/SignIn.jsx'

import EditProduct from './Pages/EditProduct/EditProduct'
import { Container, Stack } from '@chakra-ui/react'
import Nav from './Components/Nav/Nav'
import {
  getAllProducts,
  getUser,
  postUser,
  getUserCart,
  postCart,
  getAllCarts,
  deleteallCarts,
  setLoading
} from './redux/actions/actions'
import Admin from './Pages/Admin/Admin'
import ProductsAdmin from './Pages/Admin/ProductsAdmin'
import UsersAdmin from './Pages/Admin/UsersAdmin'
import OrdersAdmin from './Pages/Admin/OrdersAdmin'
import UserDetails from './Pages/UserDetails/UserDetails'
import { useAuth0 } from '@auth0/auth0-react'
import NotFound from './Pages/NotFound/NotFound'
import ReviewCard from './Pages/Reviews/ReviewCard'
// import Reviews from './Pages/Reviews/Reviews'

import Create from './Pages/Admin/CreateProduct/CreateProduct'
import { FaGlassMartiniAlt } from 'react-icons/fa'
import { useLocalStorage } from '../src/Components/useLocalStorage/useLocalStorage'
import axios from 'axios'
import CartOrderDetail from './Pages/Admin/CartOrderDetail'
import UserShopping from './Pages/UserShopping/UserShopping'
import CardProductShopping from './Pages/UserShopping/CardProductShopping/CardProductShopping'
import ChatBotChatBot from './Components/ChatBot/ChatBot'
import EditUser from './Pages/Admin/EditUser/EditUser'
import SimpleSidebar from './Pages/Admin/src/NavAdmin/NavAdmin'
import ContactUs from './Pages/ContactUs/ContactUs'
import CandyStores from './Pages/CandyStores/CandyStores'
import HowToBuy from './Pages/HowToBuy/HowToBuy'
import Swal from 'sweetalert2'
import { useState } from 'react'

function App() {
  const usuario = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { isAuthenticated, user, logout } = useAuth0()
  const userCarts = useSelector((state) => state.userCart)
  const [storedValue, setStoredValue] = useLocalStorage('cart', [])

  //   let infoUser = {}
  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       if (user.email === 'bongiovanniivaan@gmail.com' || user.email === "pepo@gmail.com") {
  //         infoUser = {
  //           email: user.email,
  //           admin: true
  //         }
  //       } else {
  //         infoUser = {
  //           email: user.email,
  //           admin: false
  //         }
  //         dispatch(getUserCart(user.email))
  //       }
  //       dispatch(postUser(infoUser))
  //     }
  //   }, [isAuthenticated])

  // if(isAuthenticated){
  //   if(userCarts !== null){
  //     if(userCarts.length === 0){
  //       dispatch(postCart({
  //             email: user.email,
  //             totalPrice: 0
  //       }))
  //       dispatch(getUserCart(user.email))
  //     }
  //     if(userCarts.length > 0){
  //       if(userCarts[userCarts.length - 1].state === "completed" || userCarts[userCarts.length - 1].state === "cancelled" || userCarts[userCarts.length - 1].state === "delivered" || userCarts[userCarts.length - 1].state === "recived"){
  //         dispatch(postCart({
  //           email: user.email,
  //           totalPrice: 0
  //         }))
  //         console.log(storedValue)
  //         dispatch(getUserCart(user.email))

  //       }
  //     }
  //   }
  // }

  // console.log("pathname",window.location.pathname)

  // // if(window.location.pathname === "http://localhost:5173/?state=completed"){
  // //   setStoredValue([]);
  // //   console.log("entro en pathname")
  // //  }

  // console.log("userCarts", userCarts)

  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       dispatch(getUser(infoUser.email))
  //     }
  //   }, [user])

  //   useEffect(() => {
  //     dispatch(getAllProducts())
  //     dispatch(getAllCarts())
  //   }, [dispatch])

  //Despacha la acción que resulta en la creación de un usuario en la DB (si es que no existe) y su carrito correspondiente.
  useEffect(() => {
    if (isAuthenticated) {
      let infoUser = {
        email: user.email,
        admin:
          user.email === 'bongiovanniivaan@gmail.com' ||
          user.email === 'pipeurien@gmail.com' ||
          user.email === 'pepo@gmail.com'
      }
      dispatch(postUser(infoUser))
    }
  }, [isAuthenticated, dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        dispatch(getUser(user.email))
      }, 1000)
    }
  }, [isAuthenticated, user, usuario?.UserDetails])

  //Despacha acciones que resultan en el creación de un nuevo carrito para el usuario y el vaciado del estado "cart".
  //Estas acciones dependen del estado del último carrito creado para el usuario, las mismas se ejecutan
  //si el estado de este último carrito es igual a "completed", "cancelled", "delivered" o "recived".
  useEffect(() => {
    if (isAuthenticated && userCarts.length) {
      (async () => {
        let res = await axios(`/cart/${user.email}`)
        let optionStates = ['completed', 'cancelled', 'delivered', 'recived']
        if (optionStates.includes(res.data[res.data.length - 1]?.state)) {
          if(res.data[res.data.length - 1]?.state === 'completed') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Congratulations!',
              text: 'The purchase of your products was successful!',
              showConfirmButton: false,
              timer: 4000
            })
          }
          dispatch(postCart({ email: user.email, totalPrice: 0 }))
          dispatch(deleteallCarts())
        }
      })()
    }
  }, [isAuthenticated, userCarts.length])

  //Despacha la accion que resulta en el seteo del estado "userCart". Es muy importante que esta acción
  //se ejecute despues de la creación del usuario en DB.
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        dispatch(getUserCart(user.email))
      }, 3000)
    }
  }, [isAuthenticated, userCarts.length])

  //Despacha la acción que resulta en el seteo de los estados "products" y "allCarts"
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(setLoading(true))
    setTimeout(() => {
      dispatch(getAllCarts())
    }, 5000)
  }, [dispatch])

  const [isBanned, setIsBanned] = useState(false);
  useEffect(() => {
    setIsBanned(usuario.banned)
    if(isBanned) {
      Swal.fire({
        icon: 'error',
        title: 'Your account has been banned!',
        text: 'If your account has been banned because a moderator or administrator felt its coments was inappropriate, you may email candyshop127@outlook.com and request a state change.',
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: 'Log out',
        confirmButtonColor: '#FF6B6B',
        color: '#151515',
        width: 900,
        padding: '3em',
        background: '#fff',
      }).then((res) => {
        if(res.isConfirmed) {
          logout({ returnTo: window.location.origin })
        }
      })
    }

  }, [usuario])

  // const { toggleColorMode, colorMode } = useColorMode(); //para el dark y light theme
  return (
    <Container
      maxW='container.xl'
      height='full'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      /* el overflow='hidden'  es pq footer rompe la pagina y le hace un scroll en X */
      overflow='hidden'
      gap={5}
    >
      <Nav />
      <ChatBotChatBot />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/cart' element={!usuario.admin ? <Cart /> : <Navigate to='/admin' />} />
        <Route path='/Products' element={!usuario.banned ? <Products /> : <Navigate to='/' />} />
        <Route path='/product/:id' element={!usuario.banned ? <ProductDetail /> : <Navigate to='/' />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route
          path='/admin'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <Admin />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/create'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <Create />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/edit/:id'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <EditProduct />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/admin/UsersAdmin'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <UsersAdmin />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/admin/ProductsAdmin'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <ProductsAdmin />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/admin/OrdersAdmin'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <OrdersAdmin />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/editUser/:email'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <EditUser />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/admin/UsersAdmin'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row-reverse' justifyContent='center' >
                <UsersAdmin />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/detail/:id'
          element={usuario.admin ? <CartOrderDetail /> : <Navigate to='/' />}
        />
        <Route
          path='/admin/ProductsAdmin'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row' align='center' justifyContent='space-between'>
                <ProductsAdmin />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/admin/OrdersAdmin'
          element={
            usuario.admin ? (
              <Stack w='full' direction='row' align='center' justifyContent='space-between'>
                <OrdersAdmin />
                {usuario.admin ? <SimpleSidebar /> : <></>}
              </Stack>
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/detail/:id'
          element={usuario.admin ? <CartOrderDetail /> : <Navigate to='/' />}
        />
        <Route path='/userDetails' element={!usuario.banned ? <UserDetails /> : <Navigate to='/' />} />
        <Route path='/*' element={<NotFound />} />
        <Route path='/reviews/:id' element={!usuario.banned ?  <ReviewCard /> : <Navigate to='/' />} />

        <Route path='/UserShopping' element={!usuario.banned ? <UserShopping />: <Navigate to='/' />} />
        <Route path='/detailShopping/:id' element={!usuario.banned ? <CardProductShopping />: <Navigate to='/' />} />
        <Route path='/contactUs' element={!usuario.banned ? <ContactUs />: <Navigate to='/' />} />
        <Route path='/candyStores' element={!usuario.banned ? <CandyStores />: <Navigate to='/' />} />
        <Route path='/howToBuy' element={!usuario.banned ? <HowToBuy />: <Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
