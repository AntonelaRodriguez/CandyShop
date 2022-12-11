import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import store from './redux/store/store'
import theme from './theme'

axios.defaults.baseURL = 'http://localhost:3001'
/* axios.defaults.baseURL = 'https://deploydbcandy-production.up.railway.app' */

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
)
