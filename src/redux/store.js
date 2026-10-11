import { configureStore } from "@reduxjs/toolkit"

import cartReducer from "./cartSlice"


// Load existing cart from localStorage
const savedCart = localStorage.getItem("cart")

const initialCart = savedCart
  ? JSON.parse(savedCart)
  : []


export const store = configureStore({

  reducer: {

    cart: cartReducer,

  },

  preloadedState: {

    cart: {
      items: initialCart,
    },

  },

})


// Save Redux cart to localStorage
store.subscribe(() => {

  const state = store.getState()

  localStorage.setItem(
    "cart",
    JSON.stringify(state.cart.items)
  )

})