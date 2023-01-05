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
// axios.defaults.baseURL = 'https://candyshop-production.up.railway.app'

/* axios.defaults.baseURL = 'https://deploydbcandy-production.up.railway.app' */

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Auth0Provider domain='dev-5x324ab1t35kga07.us.auth0.com' 
      clientId='GetC2rzak3aH4xlGcPFkFZjot8MBg48f'
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      >
        <App />
      </Auth0Provider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
)
