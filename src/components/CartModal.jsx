import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice"

function CartModal({
  isOpen,
  closeCart,
  openCheckout,
}) {
  const dispatch = useDispatch()

  const cart = useSelector(
    (state) => state.cart.items
  )

  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] =
    useState("")
  const [message, setMessage] = useState("")

  if (!isOpen) {
    return null
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * (item.quantity || 1),
    0
  )

  const totalItems = cart.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  )

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()

    if (!code) {
      setMessage("Please enter a coupon code")
      return
    }

    if (code === "WELCOME20") {
      const discountAmount = subtotal * 0.20

      setDiscount(discountAmount)
      setAppliedCoupon(code)
      setMessage("20% discount applied! 🎉")
    }

    else if (code === "SAVE50") {
      const discountAmount = Math.min(
        50,
        subtotal
      )

      setDiscount(discountAmount)
      setAppliedCoupon(code)
      setMessage("₹50 discount applied! 🎉")
    }

    else if (code === "FOODIE10") {
      const discountAmount = subtotal * 0.10

      setDiscount(discountAmount)
      setAppliedCoupon(code)
      setMessage("10% discount applied! 🎉")
    }

    else {
      setDiscount(0)
      setAppliedCoupon("")
      setMessage("Invalid coupon code ❌")
    }
  }

  const finalTotal = Math.max(
    0,
    subtotal - discount
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between border-b pb-4">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Your Cart 🛒
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {totalItems} item
              {totalItems !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={closeCart}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Empty Cart */}

        {cart.length === 0 ? (

          <div className="text-center py-12">

            <div className="text-6xl mb-4">
              🛒
            </div>

            <h3 className="text-xl font-bold text-gray-700">
              Your cart is empty
            </h3>

            <p className="text-gray-500 mt-2">
              Add some delicious food first!
            </p>

            <button
              onClick={closeCart}
              className="mt-5 bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <>
            {/* Cart Items */}

            <div className="mt-6 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id || item._id}
                  className="border rounded-xl p-4"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <span className="text-4xl">
                        {item.emoji}
                      </span>

                      <div>
                        <h3 className="font-bold text-gray-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          ₹{item.price}
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCart(
                            item.id || item._id
                          )
                        )
                      }
                      className="text-red-500 text-sm font-medium hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>

                  {/* Quantity */}

                  <div className="flex items-center justify-between mt-4">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          dispatch(
                            decreaseQuantity(
                              item.id || item._id
                            )
                          )
                        }
                        className="w-8 h-8 rounded-lg bg-gray-100 font-bold hover:bg-gray-200"
                      >
                        −
                      </button>

                      <span className="font-bold">
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(
                            increaseQuantity(
                              item.id || item._id
                            )
                          )
                        }
                        className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600"
                      >
                        +
                      </button>

                    </div>

                    <span className="font-bold text-gray-800">
                      ₹
                      {item.price *
                        (item.quantity || 1)}
                    </span>

                  </div>

                </div>

              ))}

            </div>

            {/* Coupon */}

            <div className="mt-6">

              <h3 className="font-bold mb-3">
                Apply Coupon 🎟️
              </h3>

              <div className="flex gap-2">

                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(e.target.value)
                  }
                  className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                />

                <button
                  onClick={applyCoupon}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900"
                >
                  Apply
                </button>

              </div>

              {message && (
                <p className="text-sm text-green-600 mt-2">
                  {message}
                </p>
              )}

              {appliedCoupon && (
                <p className="text-xs text-gray-500 mt-1">
                  Applied: {appliedCoupon}
                </p>
              )}

            </div>

            {/* Bill Summary */}

            <div className="border-t mt-6 pt-5">

              <h3 className="font-bold text-lg mb-4">
                Bill Summary
              </h3>

              <div className="space-y-2">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹{subtotal}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount
                    </span>

                    <span>
                      -₹{discount}
                    </span>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between text-xl font-bold">

                  <span>
                    Total
                  </span>

                  <span className="text-orange-500">
                    ₹{finalTotal}
                  </span>

                </div>

              </div>

            </div>

            {/* Checkout Button */}

            <button
              onClick={openCheckout}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold mt-5 hover:bg-orange-600 transition"
            >
              Proceed to Checkout
            </button>

          </>

        )}

      </div>

    </div>
  )
}

export default CartModal