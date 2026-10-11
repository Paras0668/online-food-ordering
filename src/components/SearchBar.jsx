function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">

      <div className="bg-white rounded-2xl shadow-lg p-5">

        <div className="flex items-center gap-3">

          <span className="text-2xl">
            🔍
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search for pizza, burger, biryani..."
            className="w-full outline-none text-gray-700"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-gray-400 hover:text-red-500 text-xl"
            >
              ×
            </button>
          )}

        </div>

      </div>

    </section>
  )
}

export default SearchBar