import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", [])

  const addToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === food.id
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: (item.quantity || 0) + 1,
              }
            : item
        )
      }

      return [
        ...prevCart,
        {
          ...food,
          quantity: 1,
        },
      ]
    })
  }

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 0) + 1,
            }
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: (item.quantity || 0) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}