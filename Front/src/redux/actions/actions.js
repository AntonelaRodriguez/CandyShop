import axios from "axios";

export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const ALL_CATEGORIES = "ALL_CATEGORIES";
export const SEARCH_CANDY = "SEARCH_CANDY";
export const SORT = "SORT";
export const DETAILS_PRODUCT = "DETAILS_PRODUCT";
export const POST_PRODUCT = "POST_PRODUCT";
export const POST_PIC = "POST_PIC";
export const SET_FILTERS = "SET_FILTERS";
export const APPLY_FILTERS = "APPLY_FILTERS";

export const getAllProducts = () => {
  return async function (dispatch) {
    const allProducts = await axios.get("http://localhost:3001/products");
    return dispatch({ type: ALL_PRODUCTS, payload: allProducts.data });
  };
};

export const getAllCategories = () => {
  return async function (dispatch) {
    const allCategories = await axios.get(
      "http://localhost:3001/products/categories"
    );
    return dispatch({ type: ALL_CATEGORIES, payload: allCategories.data });
  };
};

export const searchCandy = (name) => {
  return async function (dispatch) {
    const searchedProducts = await axios.get(
      `http://localhost:3001/products/search?name=${name}`
    );
    return dispatch({ type: SEARCH_CANDY, payload: searchedProducts.data });
  };
};

export function setFilters( payload ) { 
  return {
    type: SET_FILTERS,
    payload
  }
}

export function applyFilters({ tacc, brand, category }) { 
  return async function(dispatch) {
    const { data } = await axios.get(`http://localhost:3001/products/filters?tacc=${tacc || 'TACC' }&brand=${brand || 'BRAND'}&category=${category || 'CATEGORY'}`);
    return dispatch({
      type: APPLY_FILTERS,
      payload: data
    })
  }
}

export const sort = (payload) => {
  return { type: SORT, payload };
};

export const getProductDetails = (id) => {
  return async function (dispatch) {
    const detailProduct = await axios(`http://localhost:3001/products/${id}`);
    return dispatch({ type: DETAILS_PRODUCT, payload: detailProduct.data });
  };
};

export const postProduct = (value) => {
  return async function (dispatch) {
    const result = await axios.post("http://localhost:3001/products/", value);
    return dispatch({
      type: POST_PRODUCT,
    });
  };
};
