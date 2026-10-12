
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function FoodMenu({ searchTerm = "" }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFoods() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/foods`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }

        const data = await response.json();
        setFoods(data.foods || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching foods:", err);
          setError("Unable to load food menu. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchFoods();

    return () => controller.abort();
  }, []);

  const categories = [
    "All",
    ...new Set(foods.map((food) => food.category).filter(Boolean)),
  ];

  const search = searchTerm.toLowerCase();

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      (food.name || "").toLowerCase().includes(search) ||
      (food.category || "").toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="menu" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
        <div>
          <p className="text-orange-500 font-semibold">OUR MENU</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-1">
            Explore Delicious Food
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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
          <div className="text-5xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold text-gray-700">
            Loading delicious food...
          </h3>
          <p className="text-gray-500 mt-2">Please wait a moment.</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Check the backend connection and try refreshing the page.
          </p>
        </div>
      ) : filteredFoods.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-bold text-gray-700">
            No food found
          </h3>
          <p className="text-gray-500 mt-2">
            Try searching for Pizza, Burger or Biryani.
          </p>
        </div>
      )}
    </section>
  );
}

export default FoodMenu;
