import { ALL_PRODUCTS, SEARCH_CANDY } from "../actions/actions"

const initialState = {
  products: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS: {
      return ({
        ...state,
        products: payload
      })
    }
    case SEARCH_CANDY: {
      return ({
        ...state,
        products: payload
      })
    }

    default:
      return state
  }
}

export default reducer
