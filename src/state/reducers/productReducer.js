import {
  ADD_PRODUCT,
  ADD_PRODUCT_FAILED,
  ADD_TO_CART,
  CLEAR_CART,
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_FAILED,
  GET_TOTAL_CART_NUMBER,
  GET_TOTAL_CART_PRICE,
  MODIFY_CART_ITEM_QUANTITY,
  REMOVE_FROM_CART,
  SEARCH,
  UPDATE_CART,
  UPDATE_CART_PRODUCT
} from "../actions/types";

const initialState = {
  allProduct: [],
  fetchedProducts: [],
  cartItems: "",
  cartProducts: [],
  totalPages: "",
  currentPageNumber: "",
  shoppingCart: [],
  totalNumberCart: "",
  totalPrice: ""
}


const productReducer = (state = initialState, action) => {

  const { type, payload } = action;

  if (type === CLEAR_CART) {
    return {
      ...state,
      shoppingCart: []
    }
  }

  if (type === GET_TOTAL_CART_NUMBER) {
    const total = state.shoppingCart.reduce((total, item) => total + item.quantity, 0);
    // console.log(total, "total");
    return {
      ...state,
      totalNumberCart: total
    }
  }

  if (type === GET_TOTAL_CART_PRICE) {
    const totalPrice = state.shoppingCart.reduce((total, item) => total + (item?.list_price) * (item?.quantity), 0);
    // console.log(totalPrice, "total price");
    return {
      ...state,
      totalPrice
    }
  }

  if (type === REMOVE_FROM_CART) {
    // Filter out the item with the matching product ID
    const updatedCartItems = state.shoppingCart.filter((item) => item?.id !== payload);

    return {
      ...state,
      shoppingCart: updatedCartItems,
    };
  }

  if (type === MODIFY_CART_ITEM_QUANTITY) {
    const { productId, quantity } = payload;

    // Find the cart item by product ID
    const updatedCartItems = state.shoppingCart.map((item) => {
      if (item?.id === productId) {
        // Update the quantity and total price of the matching item
        return {
          ...item,
          quantity: quantity,
          totalPrice: item?.list_price * quantity,
        };
      }
      return item;
    });
    return {
      ...state,
      shoppingCart: updatedCartItems
    };
  }

  if (type === ADD_TO_CART) {
    console.log(payload, "payload");
    return {
      ...state,
      shoppingCart: [...state.shoppingCart, payload]
    }
  }


  if (type === FETCH_ALL_PRODUCTS) {
    // console.log(payload);
    return {
      ...state,
      fetchedProducts: payload.products,
    }
  }

  if (type === FETCH_ALL_PRODUCTS_FAILED) {
    return {
      ...state,
      fetchedProducts: []
    }
  }

  if (type === SEARCH) {
    console.log(payload);

    return {
      ...state,
      fetchedProducts: payload.products,
      totalPages: payload.totalPages,
      currentPageNumber: payload.currentPage
    }
  }

  if (type === UPDATE_CART_PRODUCT) {
    // console.log(payload, "payload")
    return {
      ...state,
      cartProducts: payload
    }
  }


  if (type === UPDATE_CART) {
    // console.log(payload, "payload")
    return {
      ...state,
      cartItems: payload
    }
  }



  return state
};


export default productReducer;

