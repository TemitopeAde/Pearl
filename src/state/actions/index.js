import axios from 'axios';
import {
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_FAILED,
  GET_SINGLE_PRODUCT, SEARCH,
  SEARCH_FAILED,
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  UPDATE_CART,
  UPDATE_CART_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  MODIFY_CART_ITEM_QUANTITY,
  GET_TOTAL_CART_NUMBER,
  GET_TOTAL_CART_PRICE,
  CLEAR_CART,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR
} from './types';
import env from "react-dotenv";


const baseUrlAuth = "http://127.0.0.1:5100/api/v1/users"
const baseUrlProduct = "127.0.0.1:5100/products"

export const login = (data) => async (dispatch) => {

  // console.log(getState());
  const { email, password } = data;
  const url = `${baseUrlAuth}/signin`

  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Make the login request to your server
    const response = await axios.post(url, body, config);

    if (response.status !== 200) {
      throw new Error('Login failed'); // Throw an error for non-200 responses
    }

    // Assuming your server returns user data upon successful login
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: response.data
    })
    const user = response.data;

    // Return the user data
    return user;
  } catch (error) {
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: null
    })
    // Handle login error here
    throw error; // Re-throw the error for React Query to catch
  }

}


export const signUp = (data) => async (dispatch) => {

  // console.log(getState());
  const { email, password, confirmPassword, name } = data;
  const url = `${baseUrlAuth}/signup`

  const body = JSON.stringify({
    email,
    password,
    confirmPassword,
    name
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Make the login request to your server
    const response = await axios.post(url, body, config);

    if (response.status !== 200) {
      throw new Error('Login failed'); // Throw an error for non-200 responses
    }

    // Assuming your server returns user data upon successful login
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data
    })

    const user = response.data;

    // Return the user data
    return user;
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: null
    })
    // Handle login error here
    throw error; // Re-throw the error for React Query to catch
  }

}

export const getProductWithImage = (data) => async (dispatch) => {
  const productUrl = `https://api.wps-inc.com/items/${data}`;
  const imageUrl = `https://api.wps-inc.com/items/${data}/images`;

  try {
    const productConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 48rCG5xpVdyPCpnaE3jDR2QZIALlXkQjTI6Sr9QP`
      },
    };

    const productResponse = await axios.get(productUrl, productConfig);
    if (productResponse.status !== 200) {
      throw new Error('Get product failed');
    }

    const imageConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: imageUrl,
      headers: { 
        'Authorization': 'Bearer 48rCG5xpVdyPCpnaE3jDR2QZIALlXkQjTI6Sr9QP'
      }
    };

    const imageResponse = await axios.request(imageConfig);

    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: {
        product: productResponse.data,
        image: imageResponse.data
      }
    });

    return { product: productResponse.data, image: imageResponse.data };
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: null
    });
    throw error;
  }
}


export const getAllProducts = (data) => async (dispatch) => {
  const url = `https://api.wps-inc.com/items?page[cursor]=${data}`;
  // console.log(env.API_URL, "api")
  const productConfig = {
    headers: {
      Authorization: `Bearer ${env.API_URL}`
    },
  };

  try {
    // Fetch main product data
    const productResponse = await axios.get(url, productConfig);

    if (productResponse.status !== 200) {
      throw new Error('Get all products failed');
    }

    const products = productResponse.data.data;
    // console.log(products);

    // Fetch product images for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const imageConfig = {
          headers: {
            Authorization: "Bearer 48rCG5xpVdyPCpnaE3jDR2QZIALlXkQjTI6Sr9QP"
          },
        };

        const imageResponse = await axios.get(`https://api.wps-inc.com/items/${product.id}/images`, imageConfig);


        if (imageResponse.status !== 200) {
          throw new Error(`Get product images for product ${product._id} failed`);
        }

        const img = `${imageResponse.data.data[0]?.domain}${imageResponse.data.data[0]?.path}${imageResponse.data.data[0]?.filename}`
        const image = img; // Assuming you want to use the first image

        return {
          ...product,
          image_url: image ? image : null, // Adjust property names as needed
        };
      })
    );

    const responseWithMeta = {
      productsWithImages,
      meta: productResponse.data.meta,
    };


    // dispatch({
    //   type: FETCH_ALL_PRODUCTS,
    //   payload: productsWithImages,
    // });


    return responseWithMeta;
  } catch (error) {
    dispatch({
      type: FETCH_ALL_PRODUCTS_FAILED,
      payload: null,
    });
    throw error;
  }
};

export const getCartNumber = (data) => async (dispatch) => {
  // console.log(data);
  dispatch({
    type: UPDATE_CART,
    payload: data
  })
}

export const getCartProducts = (data) => async (dispatch) => {
  // console.log(data);
  dispatch({
    type: UPDATE_CART_PRODUCT,
    payload: data
  })
}

export const searchProducts = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(`${baseUrlProduct}/search?query=${data}`, config);
    if (response.status !== 200) {
      throw new Error('Search products failed'); // Throw an error for non-200 responses
    }

    // console.log(response.data);

    dispatch({
      type: SEARCH,
      payload: response.data
    })

    return response.data
  } catch (error) {
    dispatch({
      type: SEARCH_FAILED,
      payload: null
    })
    throw error
  }
}


export const addToCart = (data) => async (dispatch) => {
  // console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: data
  })
}


export const removeFromCart = (data) => async (dispatch) => {
  // console.log(data);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: data
  })
}

export const modifyCartItemQuantity = (productId, quantity) => async (dispatch) => {
  // console.log(productId, quantity);
  dispatch({
    type: MODIFY_CART_ITEM_QUANTITY,
    payload: { productId, quantity }
  })
}


export const getTotalCartNumber = () => async (dispatch) => {
  dispatch({
    type: GET_TOTAL_CART_NUMBER,
    payload: null
  })
}


export const getTotalCartPrice = () => async (dispatch) => {
  dispatch({
    type: GET_TOTAL_CART_PRICE,
    payload: null
  })
}


export const getPaymentLink = (data) => async (dispatch) => {
  // console.log(getState());
  const { email, phonenumber, name, price } = data;
  const url = `${baseUrlProduct}/payment-link`

  const body = JSON.stringify({
    email,
    phonenumber,
    name,
    price
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Make the login request to your server
    const response = await axios.post(url, body, config);

    if (response.status !== 200) {
      throw new Error('Login failed'); // Throw an error for non-200 responses
    }

    // Assuming your server returns user data upon successful login
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data
    })

    const user = response.data;

    // Return the user data
    return user;
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: null
    })
    // Handle login error here
    throw error; // Re-throw the error for React Query to catch
  }
}


export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
    payload: null
  })
}


export const sendResetPasswordToken = (data) => async (dispatch) => {
  
  const { email } = data;
  // console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
  });

  try {
    // Make the login request to your server
    const response = await axios.post(`${baseUrlAuth}/forget-password`, body, config);

    if (response.status !== 200) {
      throw new Error('Login failed'); // Throw an error for non-200 responses
    }

    // Assuming your server returns user data upon successful login
    dispatch({
      type: RESET_PASSWORD,
      payload: response.data
    })

    const res = response.data;

    // Return the user data
    return res;
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_ERROR,
      payload: null
    })
  }

}





export const sendResetPasswordConfirm = (data) => async (dispatch) => {
  
  const { newPassword, token } = data;
  // console.log(newPassword, token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    newPassword,
    token
  });

  try {
    // Make the login request to your server
    const response = await axios.post(`${baseUrlAuth}/reset-password/${token}`, body, config);

    if (response.status !== 200) {
      throw new Error('Login failed'); // Throw an error for non-200 responses
    }

    // Assuming your server returns user data upon successful login
    dispatch({
      type: RESET_PASSWORD,
      payload: response.data
    })

    const res = response.data;

    // Return the user data
    return res;
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_ERROR,
      payload: null
    })
  }

}