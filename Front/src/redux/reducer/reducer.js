import {
  ALL_PRODUCTS,
  SEARCH_CANDY,
  SORT,
  DETAILS_PRODUCT,
  POST_PRODUCT,
  ALL_CATEGORIES,
} from "../actions/actions";

const initialState = {
  products: [],
  productDetail: [],
  categories: [],
  brands: [
    "arcor",
    "bagley",
    "milka",
    "mogul",
    "aguila",
    "bon o bon",
    "cofler",
    "terrabusi",
    "topline",
    "tofi",
    "godet",
    "nestle",
    "felfort",
    "billiken",
    "georgalos",
    "bonafide",
    "jorgito",
    "trident",
    "ferrero",
    "unknown",
  ],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }
    case ALL_CATEGORIES: {
      return {
        ...state,
        categories: payload,
      };
    }
    case SEARCH_CANDY: {
      return {
        ...state,
        products: payload,
      };
    }
    case DETAILS_PRODUCT:
      return {
        ...state,
        productDetail: payload,
      };
    case SORT:
      if (payload === "A-Z") {
        return {
          ...state,
          products: state.products.sort((a, b) => (a.name > b.name ? 1 : -1)),
        };
      } else if (payload === "Z-A") {
        return {
          ...state,
          products: state.products.sort((a, b) => (a.name > b.name ? -1 : 1)),
        };
      } else if (payload === "Price: Highest") {
        return {
          ...state,
          products: state.products.sort((a, b) => b.price - a.price),
        };
      } else if (payload === "Price: Lowest") {
        return {
          ...state,
          products: state.products.sort((a, b) => a.price - b.price),
        };
      } else {
        return {
          ...state,
          products: state.products,
        };
      }
    case POST_PRODUCT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
