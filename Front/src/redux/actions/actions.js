import axios from 'axios'

export const ALL_PRODUCTS = 'ALL_PRODUCTS'
export const SEARCH_CANDY = 'SEARCH_CANDY'
export const DETAILS_PRODUCT = 'DETAILS_PRODUCT'

export const getAllProducts = () => {
  return async function (dispatch) {
    const allProducts = await axios.get('http://localhost:3001/products')
    return dispatch({ type: ALL_PRODUCTS, payload: allProducts.data })
  }
}

export const searchCandy = (name) => {
  return async function (dispatch) {
    const searchedProducts = await axios.get(`http://localhost:3001/products/search?name=${name}`)
    return dispatch({ type: SEARCH_CANDY, payload: searchedProducts.data })
  }
}

export const getProductDetails = (id) => {
  return async function (dispatch) {
    const detailProduct = await axios(`http://localhost:3001/products/${id}`);
    return dispatch({ type: DETAILS_PRODUCT, payload: detailProduct.data })
  }
}
