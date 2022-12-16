import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import store from './redux/store/store'
import theme from './theme'

//Auth0
import {Auth0Provider} from "@auth0/auth0-react"

axios.defaults.baseURL = 'http://localhost:3001'
/* axios.defaults.baseURL = 'https://deploydbcandy-production.up.railway.app' */

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Auth0Provider domain='dev-mk55pfi0jjgc0xzc.us.auth0.com' 
      clientId='Uh36veOXsDCEJPug8FRHAnVF2NSH7y0g'
      redirectUri={window.location.origin}>
        <App />
      </Auth0Provider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
)
