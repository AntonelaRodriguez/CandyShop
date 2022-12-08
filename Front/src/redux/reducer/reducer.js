import { ALL_PRODUCTS, DETAILS_PRODUCT, SEARCH_CANDY } from '../actions/actions'

const initialState = {
  products: [],
  productDetail: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS: {
      return {
        ...state,
        products: payload
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

    default:
      return state
  }
}

export default reducer
