import { LOADING, NOT_LOADING } from "../actions/types";

const initialState = {
  loading: false
}



const loaderReducer = (state = initialState, action) => {
  const { type } = action;

  if (type === LOADING) {
    // console.log("loading");
    return {
      ...state,
      loading: true
    }
  }

  if (type === NOT_LOADING) {
    // console.log("not loading");
    return {
      ...state,
      loading: false
    }
  }

  return state
};


export default loaderReducer

