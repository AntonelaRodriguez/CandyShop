import { filter } from '@chakra-ui/react'
import {
  ALL_PRODUCTS,
  SEARCH_CANDY,
  SORT,
  DETAILS_PRODUCT,
  POST_PRODUCT,
  ALL_CATEGORIES,
  SET_FILTERS,
  APPLY_FILTERS,
  EDIT_PRODUCT,
  DELETED_PRODUCT,
  ADD_CART,
  PAYMENT_TO_CART,
  POST_USER,
  GET_USER,
  DELETE_FROM_CART,
  POST_USER_DETAIL
} from '../actions/actions'

const initialState = {
  products: [],
  productDetail: [],
  categories: [],
  brands: [
    'arcor',
    'bagley',
    'milka',
    'mogul',
    'aguila',
    'bon o bon',
    'cofler',
    'terrabusi',
    'topline',
    'tofi',
    'godet',
    'nestle',
    'felfort',
    'billiken',
    'georgalos',
    'bonafide',
    'jorgito',
    'trident',
    'ferrero',
    'unknown'
  ],
  filters: { tacc: 'TACC', brand: 'BRAND', category: 'CATEGORY' },
  cart: [],
  user: {}
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS: {
      return {
        ...state,
        products: payload
      }
    }
    case ALL_CATEGORIES: {
      return {
        ...state,
        categories: payload
      }
    }
    case SEARCH_CANDY: {
      return {
        ...state,
        products: payload
      }
    }
    case DETAILS_PRODUCT:
      return {
        ...state,
        productDetail: payload
      }
    case SORT:
      if (payload === 'A-Z') {
        return {
          ...state,
          products: state.products.sort((a, b) => (a.name > b.name ? 1 : -1))
        }
      } else if (payload === 'Z-A') {
        return {
          ...state,
          products: state.products.sort((a, b) => (a.name > b.name ? -1 : 1))
        }
      } else if (payload === 'Price: Highest') {
        return {
          ...state,
          products: state.products.sort((a, b) => b.price - a.price)
        }
      } else if (payload === 'Price: Lowest') {
        return {
          ...state,
          products: state.products.sort((a, b) => a.price - b.price)
        }
      } else {
        return {
          ...state,
          products: state.products
        }
      }
    case POST_PRODUCT:
      return {
        ...state
      }
    case EDIT_PRODUCT:
      return { ...state }

    case DELETED_PRODUCT:
      return { ...state }

    case SET_FILTERS:
      return {
        ...state,
        filters: payload
      }
    case APPLY_FILTERS:
      return {
        ...state,
        products: payload
      }
    case ADD_CART:
      return { ...state, cart: [...state.cart, payload] }
    case PAYMENT_TO_CART:
      return { ...state }

    case POST_USER: 
    return {
      ...state
    }
    case POST_USER_DETAIL:
      return {
        ...state
      }
    case GET_USER:
      return{
        ...state,
        user: payload
      }
    case DELETE_FROM_CART:
      console.log(payload)
      const filteredCart = state.cart.filter(i => i.id !== payload)
      console.log(filteredCart, 'filteredCart')
      return{
        ...state,
        cart: filteredCart
      }
    default:
      return state
  }
}

export default reducer
