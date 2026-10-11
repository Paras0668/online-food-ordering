import { useDispatch, useSelector } from "react-redux"

import { addToCart } from "../redux/cartSlice"

function FoodCard({ food }) {
  const dispatch = useDispatch()

  const cart = useSelector(
    (state) => state.cart.items
  )

  // MongoDB uses _id, Redux cart uses id
  const foodId = food._id || food.id

  const cartItem = cart.find(
    (item) => item.id === foodId
  )

  const quantity = cartItem
    ? cartItem.quantity || 1
    : 0

  const handleAddToCart = () => {
    dispatch(addToCart(food))
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">

      {/* Food Image / Emoji */}

      <div className="h-48 bg-orange-50 flex items-center justify-center text-8xl">
        {food.emoji}
      </div>

      {/* Food Details */}

      <div className="p-4">

        <div className="flex justify-between items-start gap-3">

          <div>

            <h3 className="text-lg font-bold text-gray-800">
              {food.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {food.description}
            </p>

          </div>

          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm font-semibold whitespace-nowrap">
            ₹{food.price}
          </span>

        </div>

        {/* Rating + Add */}

        <div className="flex items-center justify-between mt-5">

          <span className="text-sm text-yellow-500 font-medium">
            ⭐ {food.rating}
          </span>

          <div className="flex items-center gap-2">

            {quantity > 0 && (
              <span className="text-sm text-green-600 font-semibold">
                Added: {quantity}
              </span>
            )}

            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
            >
              + Add
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default FoodCard