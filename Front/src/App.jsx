import { Navigate, Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Products from './Pages/Products/Products.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import SignIn from './Pages/SignIn/SignIn.jsx'

import EditProduct from './Pages/Edit/EditProduct.jsx'
import { Container } from '@chakra-ui/react'
import Nav from './Components/Nav/Nav'
import { getAllProducts, getUser, postUser, getUserCart, postCart } from './redux/actions/actions'
import Admin from './Pages/Admin/Admin'
import ProductsAdmin from './Pages/Admin/ProductsAdmin'
import UsersAdmin from './Pages/Admin/UsersAdmin'
import OrdersAdmin from './Pages/Admin/OrdersAdmin'
import UserDetails from './Pages/UserDetails/UserDetails'
import { useAuth0 } from '@auth0/auth0-react'
import NotFound from './Pages/NotFound/NotFound'
import ReviewCard from './Pages/Reviews/ReviewCard'
// import Reviews from './Pages/Reviews/Reviews'
import Reviews from './Pages/Reviews/Reviews'
import Create from './Pages/Admin/Create/Create'
import { FaGlassMartiniAlt } from 'react-icons/fa'


function App() {
  const usuario = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useAuth0()
  const userCarts = useSelector(state => state.userCart);

  let infoUser = {}
  useEffect(() => {
    if (isAuthenticated) {
      if (user.email === 'bongiovanniivaan@gmail.com' || user.email === "pepo@gmail.com") {
        infoUser = {
          email: user.email,
          admin: true
        }
      } else {
        infoUser = {
          email: user.email,
          admin: false
        }
        dispatch(getUserCart(user.email))
      }
      dispatch(postUser(infoUser))
    }
  }, [isAuthenticated])

  console.log("userCarts", userCarts)
if(isAuthenticated){
  if(userCarts !== null){
    if(userCarts.length === 0){
      dispatch(postCart({
            email: user.email,
            totalPrice: 0
      }))
    }
    if(userCarts.length > 0){
      if(userCarts[userCarts.length - 1].state === "completed" || userCarts[userCarts.length - 1].state === "cancelled"){
        dispatch(postCart({
          email: user.email, 
          totalPrice: 0
        }))
      }
    }
  }
}

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser(infoUser.email))
    }
  }, [user])

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  // const { toggleColorMode, colorMode } = useColorMode(); //para el dark y light theme
  return (
    <Container
      maxW='container.xl'
      height='full'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Nav />

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/cart' element={!usuario.admin ? <Cart /> : <Navigate to='/admin' />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/admin' element={usuario.admin ? <Admin /> : <Navigate to='/' />} />
        <Route path='/create' element={usuario.admin ? <Create /> : <Navigate to='/' />} />
        <Route path='/edit/:id' element={usuario.admin ? <EditProduct /> : <Navigate to='/' />} />
        <Route
          path='/admin/UsersAdmin'
          element={usuario.admin ? <UsersAdmin /> : <Navigate to='/' />}
        />
        <Route
          path='/admin/ProductsAdmin'
          element={usuario.admin ? <ProductsAdmin /> : <Navigate to='/' />}
        />
        <Route
          path='/admin/OrdersAdmin'
          element={usuario.admin ? <OrdersAdmin /> : <Navigate to='/' />}
        />
        <Route
          path='/userDetails'
          element={<UserDetails />}
        />
        <Route path='/*' element={<NotFound />} />
        <Route path="/reviews/:id" element={<ReviewCard />} />
      </Routes>
    </Container>
  )
}

export default App
