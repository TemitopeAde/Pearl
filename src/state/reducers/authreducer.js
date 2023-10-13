import { FETCH_KEY, FETCH_KEY_FAILED, LOGOUT, SIGNIN_FAILED, SIGNIN_SUCCESS } from "../actions/types";

const initialState = {
  token: null,
  secret: ""
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === FETCH_KEY) {
    return {
      ...state,
      secret: payload
    }
  }

  if (type === FETCH_KEY_FAILED) {
    return {
      ...state,
      secret: ""
    }
  }

  if (type === SIGNIN_SUCCESS) {
    return {
      ...state,
      // token: payload.token
    }
  }

  if (type === SIGNIN_FAILED) {
    return {
      ...state,
      token: null
    }
  }

  if (type ===LOGOUT) {
    return {
      ...state,
      token: null
    }
  }

  return state
};


export default authReducer

