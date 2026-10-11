import { categories } from "../data/foodData"

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      <div className="text-center mb-8">

        <p className="text-orange-500 font-semibold">
          Explore
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-1">
          Browse Categories
        </h2>

        <p className="text-gray-500 mt-2">
          Choose what you are craving today
        </p>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer border border-gray-100"
          >
            <div className="text-4xl mb-3">
              {category.emoji}
            </div>

            <p className="font-semibold text-gray-700">
              {category.name}
            </p>
          </div>
        ))}

      </div>

    </section>
  )
}

export default Categories