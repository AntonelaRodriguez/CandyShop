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
export const SET_FILTERS = 'SET_FILTERS'
export const APPLY_FILTERS = 'APPLY_FILTERS'
export const ADD_CART = 'ADD_CART'
export const PAYMENT_TO_CART = 'PAYMENT_TO_CART'
export const POST_USER = "POST_USER"
export const GET_USER = "GET_USER"


/* const url = 'https://deploydbcandy-production.up.railway.app' //usar url para db deployada */
const url = 'http://localhost:3001' //para usar la db local poner localhost en vez de url

export const getAllProducts = () => {
  return async function (dispatch) {
    const allProducts = await axios.get(`${url}/products`)
    return dispatch({ type: ALL_PRODUCTS, payload: allProducts.data })
  }
}

export const getAllCategories = () => {
  return async function (dispatch) {
    const allCategories = await axios.get(`${url}/categories`)
    return dispatch({ type: ALL_CATEGORIES, payload: allCategories.data })
  }
}

export const searchCandy = (name) => {
  return async function (dispatch) {
    const searchedProducts = await axios.get(`${url}/products/search?name=${name}`)
    return dispatch({ type: SEARCH_CANDY, payload: searchedProducts.data })
  }
}

export function setFilters(payload) {
  return {
    type: SET_FILTERS,
    payload
  }
}

export function applyFilters({ tacc, brand, category }) {
  return async function (dispatch) {
    const { data } = await axios.get(
      `${url}/products/filters?tacc=${tacc || 'TACC'}&brand=${brand || 'BRAND'}&category=${
        category || 'CATEGORY'
      }`
    )
    return dispatch({
      type: APPLY_FILTERS,
      payload: data
    })
  }
}

export const sort = (payload) => {
  return { type: SORT, payload }
}

export const getProductDetails = (id) => {
  return async function (dispatch) {
    const detailProduct = await axios(`${url}/products/${id}`)
    return dispatch({ type: DETAILS_PRODUCT, payload: detailProduct.data })
  }
}

export const postProduct = (value) => {
  return async function (dispatch) {
    const result = await axios.post(`${url}/products/`, value)
    return dispatch({
      type: POST_PRODUCT
    })
  }
}

export function editProduct(id, productEdit) {
  return async function (dispatch) {
    try {
      await axios.put(`${url}/products/${id}`, productEdit)
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
      await axios.delete(`${url}/products/${id}`)
      return dispatch({
        type: DELETED_PRODUCT
      })
    } catch (error) {
      console.log(error)
    }
  }
}

/* CART */

export const addProductCart = (product) => {
  return { type: ADD_CART, payload: product }
}

export const paymentToCart = (detailsProduct) => {
  return async function (dispatch) {
    let data = {
      cartItems: detailsProduct,
      userId: '10asd1q23',
      cartID: 'aeasd255'
    }
    const result = await axios.post(`${url}/mercadopago`, data)
    console.log(result.data)
    return dispatch({
      type: PAYMENT_TO_CART,
      payload: result
    })
  }
}

//Users

export const postUser = (data) =>{
  return async function(dispatch){
    const result = await axios.post(`${url}/users`, data);
    return dispatch({type: POST_USER})
  }
}

export const getUser = (email)=>{
  return async function(dispatch){
    const user = await axios.get(`${url}/users/${email}`);
    return dispatch({type: GET_USER, payload: user.data})
  }
}