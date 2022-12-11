import axios from 'axios'

export const ALL_PRODUCTS = 'ALL_PRODUCTS'
export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const SEARCH_CANDY = 'SEARCH_CANDY'
export const SORT = 'SORT'
export const DETAILS_PRODUCT = 'DETAILS_PRODUCT'
export const POST_PRODUCT = 'POST_PRODUCT'
export const POST_PIC = 'POST_PIC'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const DELETED_PRODUCT = 'DELETED_PRODUCT'

export const getAllProducts = () => {
  return async function (dispatch) {
    const allProducts = await axios.get('/products')
    return dispatch({ type: ALL_PRODUCTS, payload: allProducts.data })
  }
}

export const getAllCategories = () => {
  return async function (dispatch) {
    const allCategories = await axios.get('/products/categories')
    return dispatch({ type: ALL_CATEGORIES, payload: allCategories.data })
  }
}

export const searchCandy = (name) => {
  return async function (dispatch) {
    const searchedProducts = await axios.get(`/products/search?name=${name}`)
    return dispatch({ type: SEARCH_CANDY, payload: searchedProducts.data })
  }
}

export const sort = (payload) => {
  return { type: SORT, payload }
}

export const getProductDetails = (id) => {
  return async function (dispatch) {
    const detailProduct = await axios(`/products/${id}`)
    return dispatch({ type: DETAILS_PRODUCT, payload: detailProduct.data })
  }
}

export const postProduct = (value) => {
  return async function (dispatch) {
    const result = await axios.post('/products/', value)
    return dispatch({
      type: POST_PRODUCT
    })
  }
}

export function editProduct(id, productEdit) {
  return async function (dispatch) {
    try {
      await axios.put(`/products/${id}`, productEdit)
      return dispatch({
        type: EDIT_PRODUCT
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProduct = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/products/${id}`)
      return dispatch({
        type: DELETED_PRODUCT
      })
    } catch (error) {
      console.log(error)
    }
  }
}
