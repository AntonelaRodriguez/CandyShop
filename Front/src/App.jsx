import { Route } from 'react-router-dom'

import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Products from './Pages/Products/Products.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import SignIn from './Pages/SignIn/SignIn.jsx'

function App() {
  return (
    <>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/cart" render={() => <Cart />} />
      <Route path="/Products" render={() => <Products />} />
      <Route path="/product/:id" render={() => <ProductDetail />} />
      <Route path="/signup" render={() => <SignUp />} />
      <Route path="/signin" render={() => <SignIn />} />
    </>
  )
}

export default App
