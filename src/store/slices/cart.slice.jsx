import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";

export const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    }
  }
});

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));

  return axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((res) => {
      console.log("resxx", res); 
      dispatch(setCart(res.data.data.cart.products))
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const createCartThunk = (productToCart) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post("https://e-commerce-api.academlo.tech/api/v1/cart", productToCart, getConfig())
    .then((res) => dispatch(getCartThunk()))
    .catch(error => console.log(error.response.data))
    .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
    .then(() => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;