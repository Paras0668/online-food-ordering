import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    addToCart: (state, action) => {

      const foodId =
        action.payload.id ||
        action.payload._id

      const existingItem =
        state.items.find(
          (item) => item.id === foodId
        )

      if (existingItem) {

        existingItem.quantity =
          (existingItem.quantity || 0) + 1

      } else {

        state.items.push({
          ...action.payload,
          id: foodId,
          quantity: 1,
        })

      }
    },

    increaseQuantity: (state, action) => {

      const item =
        state.items.find(
          (item) => item.id === action.payload
        )

      if (item) {
        item.quantity =
          (item.quantity || 0) + 1
      }
    },

    decreaseQuantity: (state, action) => {

      const item =
        state.items.find(
          (item) => item.id === action.payload
        )

      if (item) {

        item.quantity =
          (item.quantity || 0) - 1

        if (item.quantity <= 0) {

          state.items =
            state.items.filter(
              (item) =>
                item.id !== action.payload
            )

        }
      }
    },

    removeFromCart: (state, action) => {

      state.items =
        state.items.filter(
          (item) =>
            item.id !== action.payload
        )
    },

    clearCart: (state) => {
      state.items = []
    },

  },
})

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer