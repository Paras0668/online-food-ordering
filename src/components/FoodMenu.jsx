import { useEffect, useState } from "react"
import FoodCard from "./FoodCard"

function FoodMenu({ searchTerm }) {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Fetch foods from MongoDB through backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/foods")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch foods")
        }

        return response.json()
      })
      .then((data) => {
        // Backend returns foods inside data.foods
        setFoods(data.foods || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching foods:", error)
        setLoading(false)
      })
  }, [])

  const categories = [
    "All",
    ...new Set(
      foods.map((food) => food.category)
    ),
  ]

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      food.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <section
      id="menu"
      className="max-w-7xl mx-auto px-6 py-16"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div>
          <p className="text-orange-500 font-semibold">
            OUR MENU
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-1">
            Explore Delicious Food
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 border hover:border-orange-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {searchTerm && (
        <p className="text-gray-500 mb-6">
          Search results for{" "}
          <span className="font-semibold text-orange-500">
            "{searchTerm}"
          </span>
        </p>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">
            🍽️
          </div>

          <h3 className="text-xl font-bold text-gray-700">
            Loading delicious food...
          </h3>

          <p className="text-gray-500 mt-2">
            Please wait a moment.
          </p>
        </div>
      ) : filteredFoods.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {filteredFoods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
            />
          ))}

        </div>
      ) : (
        <div className="text-center py-16">

          <div className="text-6xl mb-4">
            😕
          </div>

          <h3 className="text-xl font-bold text-gray-700">
            No food found
          </h3>

          <p className="text-gray-500 mt-2">
            Try searching for Pizza, Burger or Biryani.
          </p>

        </div>
      )}
    </section>
  )
}

export default FoodMenu
