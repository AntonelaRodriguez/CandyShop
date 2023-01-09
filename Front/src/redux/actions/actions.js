import axios from "axios";
export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const ALL_CATEGORIES = "ALL_CATEGORIES";
export const SEARCH_CANDY = "SEARCH_CANDY";
export const SORT = "SORT";
export const DETAILS_PRODUCT = "DETAILS_PRODUCT";
export const POST_PRODUCT = "POST_PRODUCT";
export const POST_PIC = "POST_PIC";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETED_PRODUCT = "DELETED_PRODUCT";
export const SET_FILTERS = "SET_FILTERS";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const ADD_CART = "ADD_CART";
export const PAYMENT_TO_CART = "PAYMENT_TO_CART";
export const POST_USER = "POST_USER";
export const POST_USER_DETAIL = "POST_USER_DETAIL";
export const GET_USER = "GET_USER";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const GET_USER_CART = "GET_USER_CART";
export const POST_CART = "POST_CART";
export const EDIT_CART = "EDIT_CART";
export const GET_CART_BY_PK = "GET_CART_BY_PK";
export const GET_REVIEWS = "GET_REVIEWS";
export const POST_REVIEW = "POST_REVIEW";
export const CLEAN_REVIEWS = "CLEAN_REVIEWS";
export const UPDATE_CART = "UPDATE_CART";
export const GET_ALL_CARTS = "GET_ALL_CARTS";
export const DELETE_ALL_CARTS = "DELETE_ALL_CARTS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const UPDATE_USER_DETAIL = "UPDATE_USER_DETAIL";
export const UPDATE_USER = "UPDATE_USER";
export const GET_CART_PRODUCT_DETAIL = "GET_CART_PRODUCT_DETAIL";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const DELETED_REVIEW = "DELETED_REVIEW"
export const UPDATED_REVIEW = "UPDATED_REVIEW"
export const CLEAN_UP_FILTERS = "CLEAN_UP_FILTERS";
export const CLEAN_UP_SEARCH = "CLEAN_UP_SEARCH";
export const SET_LOADING = "SET_LOADING";
export const NEW_SUBSCRIPTION = "NEW_SUBSCRIPTION";

/* const url = 'https://deploydbcandy-production.up.railway.app' //usar url para db deployada */
// const url = "https://candyshop-production.up.railway.app";  usar url para db deployada
const url = "http://localhost:3001";//para usar la db local poner localhost en vez de url

export const getAllProducts = () => {
  return async function (dispatch) {
    const allProducts = await axios.get(`${url}/products`);
    return dispatch({ type: ALL_PRODUCTS, payload: allProducts.data });
  };
};

export const getAllCategories = () => {
  return async function (dispatch) {
    const allCategories = await axios.get(`${url}/categories`);
    return dispatch({ type: ALL_CATEGORIES, payload: allCategories.data });
  };
};

export const searchCandy = (name) => {
  return async function (dispatch) {
    const searchedProducts = await axios.get(
      `${url}/products/search?name=${name}`
    );
    return dispatch({ type: SEARCH_CANDY, payload: searchedProducts.data });
  };
};

export function setFilters(payload) {
  return {
    type: SET_FILTERS,
    payload,
  };
}

// export function applyFilters({ tacc, brand, category }) {
//   return async function (dispatch) {
//     const { data } = await axios.get(
//       `${url}/products/filters?tacc=${tacc || "TACC"}&brand=${
//         brand || "BRAND"
//       }&category=${category || "CATEGORY"}`
//     );
//     return dispatch({
//       type: APPLY_FILTERS,
//       payload: data,
//     });
//   };
// }
export function applyFilters(payload) {
  return { type: APPLY_FILTERS, payload };
}
export function cleanUpFilters() {
  return { type: CLEAN_UP_FILTERS };
}
export function cleanUpSearch() {
  return { type: CLEAN_UP_SEARCH };
}

export const sort = (payload) => {
  return { type: SORT, payload };
};

export const getProductDetails = (id) => {
  return async function (dispatch) {
    const detailProduct = await axios(`${url}/products/${id}`);
    return dispatch({ type: DETAILS_PRODUCT, payload: detailProduct.data });
  };
};

export const postProduct = (value) => {
  return async function (dispatch) {
    const result = await axios.post(`${url}/products/`, value);
    return dispatch({
      type: POST_PRODUCT,
    });
  };
};

export function editProduct(id, productEdit) {
  return async function (dispatch) {
    try {
      await axios.put(`${url}/products/${id}`, productEdit);
      return dispatch({
        type: EDIT_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteProduct = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`${url}/products/${id}`);
      return dispatch({
        type: DELETED_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/* CART */

export const addProductCart = (product) => {
  return { type: ADD_CART, payload: product };
};
export const editProductCart = (cart) => {
  return { type: EDIT_CART, payload: cart };
};

export const paymentToCart = (detailsProduct) => {
  return async function (dispatch) {
    let data = {
      cartItems: detailsProduct,
      userId: "10asd1q23",
      cartID: "aeasd255",
    };
    const result = await axios.post(`${url}/mercadopago`, data);
    console.log(result.data);
    return dispatch({
      type: PAYMENT_TO_CART,
      payload: result,
    });
  };
};

export const deleteFromCart = (id) => {
  return async function (dispatch) {
    return dispatch({ type: DELETE_FROM_CART, payload: id });
  };
};

export const getUserCart = (email) => {
  return async function (dispatch) {
    const userCart = await axios(`${url}/cart/${email}`);
    return dispatch({ type: GET_USER_CART, payload: userCart.data });
  };
};

export const postCart = (cart) => {
  return async function (dispatch) {
    const userCart = await axios.post(`${url}/cart/`, cart);
    return dispatch({ type: POST_CART });
  };
};

export const getCartByPk = (order) => {
  return async function (dispatch) {
    const cart = await axios.get(`${url}/cart/byPk/${order}`);
    return dispatch({ type: GET_CART_BY_PK, payload: cart.data });
  };
};

export const updateCart = (value) => {
  return async function (dispatch) {
    const result = await axios.put(`${url}/cart`, value);
    return dispatch({ type: UPDATE_CART });
  };
};

export const getAllCarts = () => {
  return async function (dispatch) {
    const carts = await axios(`${url}/cart`);
    return dispatch({ type: GET_ALL_CARTS, payload: carts.data });
  };
};

export const deleteallCarts = () => {
  return async function (dispatch) {
    localStorage.setItem("cart", []);
    return dispatch({ type: DELETE_ALL_CARTS });
  };
};

export const getCartProductDetail = (order) => {
  return async function(dispatch){
    const details = await axios(`${url}/detail/${order}`);
    return dispatch({type: GET_CART_PRODUCT_DETAIL, payload: details.data})
  }
}

//Users

export const postUser = (data) => {
  return async function (dispatch) {
    const { data: usuario } = await axios.post(`${url}/users`, data);
    return dispatch({ type: POST_USER, payload: usuario });
  };
};

export const postUserDetail = (data) =>{
  console.log(data, 'action')
  return async function(dispatch){
    const result = await axios.post(`${url}/users/userDetail`, data);
    return dispatch({type: POST_USER_DETAIL})
  }
}

export const updateUserDetail = (data) => {
  return async function(dispatch){
    await axios.put(`${url}/users/userDetail`, data);
    return dispatch({type: UPDATE_USER_DETAIL})
  }
}

export const getUser = (email) => {
  return async function (dispatch) {
    const user = await axios.get(`${url}/users/${email}`);
    return dispatch({ type: GET_USER, payload: user.data });
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const users = await axios.get(`${url}/users`);
    return dispatch({ type: GET_ALL_USERS, payload: users.data });
  };
};

export const updateUser = (data) => {
  return async function (dispatch) {
    const user = await axios.put(`${url}/users/admin/updateUser/`, data)
    return dispatch({type: UPDATE_USER})
  }
}

//Reviews
export const getReviews = (productId) => {
  return async function (dispatch) {
    const reviews = await axios.get(`${url}/reviews/${productId}`);
    return dispatch({ type: GET_REVIEWS, payload: reviews.data });
  };
};

export const cleanReviews = () => {
  return { type: CLEAN_REVIEWS };
};

export const postReview = (data) => {
  return async function (dispatch) {
    const newReview = await axios.post(
      `${url}/reviews/${data.productId}/${data.email}`,
      data
    ).then(data => alert('Review posted succesfully')).catch(error => alert(error));
    return dispatch({ type: POST_REVIEW });
  };
};

export const deleteReview = (id) => {
  return async function (dispatch) {
    await axios.delete(`${url}/reviews/admin/deleteReview/${id}`)
    return dispatch({ type: DELETED_REVIEW })
  }
}
export const setCurrentPage = (page) => {
  return { type: SET_CURRENT_PAGE, payload: page }
}
export const setLoading = (payload) => {
  return { type: SET_LOADING, payload }
}

export const newSubscription = (email) => {
  return async function(dispatch){
    await axios.post(`${url}/subscribe/${email}`)
    return dispatch({ type: NEW_SUBSCRIPTION, payload: email})
  }
}