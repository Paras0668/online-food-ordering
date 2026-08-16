const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    oldPrice: 299,
    rating: 4.8,
    emoji: "🍕",
    description: "Fresh mozzarella, tomato sauce and basil.",
    discount: "17% OFF",
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 179,
    oldPrice: 219,
    rating: 4.7,
    emoji: "🍔",
    description: "Crispy patty with cheese and fresh vegetables.",
    discount: "18% OFF",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 299,
    oldPrice: 349,
    rating: 4.9,
    emoji: "🍛",
    description: "Aromatic basmati rice with spicy chicken.",
    discount: "14% OFF",
  },
  {
    id: 4,
    name: "White Sauce Pasta",
    category: "Pasta",
    price: 229,
    oldPrice: 269,
    rating: 4.6,
    emoji: "🍝",
    description: "Creamy white sauce pasta with herbs.",
    discount: "15% OFF",
  },
  {
    id: 5,
    name: "French Fries",
    category: "Sides",
    price: 119,
    oldPrice: 149,
    rating: 4.5,
    emoji: "🍟",
    description: "Crispy golden fries with a delicious seasoning.",
    discount: "20% OFF",
  },
  {
    id: 6,
    name: "Chocolate Shake",
    category: "Drinks",
    price: 149,
    oldPrice: 179,
    rating: 4.7,
    emoji: "🥤",
    description: "Rich and creamy chocolate milkshake.",
    discount: "17% OFF",
  },
  {
    id: 7,
    name: "Veg Momos",
    category: "Snacks",
    price: 139,
    oldPrice: 169,
    rating: 4.6,
    emoji: "🥟",
    description: "Steamed momos served with spicy chutney.",
    discount: "18% OFF",
  },
  {
    id: 8,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 199,
    oldPrice: 249,
    rating: 4.9,
    emoji: "🍰",
    description: "Soft chocolate cake with creamy frosting.",
    discount: "20% OFF",
  },
]

const categories = [
  { name: "Pizza", emoji: "🍕" },
  { name: "Burger", emoji: "🍔" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Desserts", emoji: "🍰" },
]

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">
                🍴
              </div>

              <div>
                <h1 className="text-xl font-bold text-orange-500">
                  Foodie
                </h1>

                <p className="text-xs text-gray-500 hidden sm:block">
                  Food at your fingertips
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">

              <a
                href="#home"
                className="text-orange-500 hover:text-orange-600 transition"
              >
                Home
              </a>

              <a
                href="#menu"
                className="text-gray-600 hover:text-orange-500 transition"
              >
                Menu
              </a>

              <a
                href="#offers"
                className="text-gray-600 hover:text-orange-500 transition"
              >
                Offers
              </a>

              <a
                href="#about"
                className="text-gray-600 hover:text-orange-500 transition"
              >
                About
              </a>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

              <button className="hidden sm:block text-gray-600 hover:text-orange-500 transition">
                Login
              </button>

              <button className="relative bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-sm">
                🛒 Cart

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

            </div>

          </div>
        </div>
      </nav>


      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="bg-orange-50"
      >

        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Hero Text */}
            <div>

              <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                🍴 Delicious food, delivered fast
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">

                Your favourite food,

                <span className="text-orange-500">
                  {" "}just a click away!
                </span>

              </h2>

              <p className="mt-5 text-gray-600 text-lg max-w-xl">
                Discover delicious meals from our menu and order your
                favourite food quickly and easily.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button className="bg-orange-500 text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md">
                  Order Now →
                </button>

                <button className="border border-orange-500 text-orange-500 px-7 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition">
                  Explore Menu
                </button>

              </div>

              {/* Small stats */}
              <div className="flex gap-8 mt-10">

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    4.8⭐
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer Rating
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    30+
                  </p>
                  <p className="text-sm text-gray-500">
                    Food Items
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    25 min
                  </p>
                  <p className="text-sm text-gray-500">
                    Avg. Delivery
                  </p>
                </div>

              </div>

            </div>


            {/* Hero Food Visual */}
            <div className="flex justify-center">

              <div className="relative">

                <div className="w-72 h-72 sm:w-96 sm:h-96 bg-white rounded-full shadow-xl flex items-center justify-center">

                  <span className="text-9xl sm:text-[150px]">
                    🍕
                  </span>

                </div>

                <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-xl px-4 py-3">
                  <p className="text-sm font-semibold">
                    ⭐ 4.9 Rating
                  </p>
                  <p className="text-xs text-gray-500">
                    Highly recommended
                  </p>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white shadow-lg rounded-xl px-5 py-3">
                  <p className="text-sm font-bold">
                    🚚 Fast Delivery
                  </p>
                  <p className="text-xs">
                    Within 30 minutes
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SEARCH SECTION ================= */}
      <section className="max-w-5xl mx-auto px-6 -mt-7 relative z-10">

        <div className="bg-white rounded-xl shadow-lg p-4">

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="flex-1 relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search for pizza, burger, biryani..."
                className="w-full border border-gray-200 rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />

            </div>

            <button className="bg-orange-500 text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Search
            </button>

          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}
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


      {/* ================= FOOD MENU ================= */}
      <section
        id="menu"
        className="bg-gray-100 py-14"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">

            <div>

              <p className="text-orange-500 font-semibold">
                Our Menu
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                Popular Dishes
              </h2>

              <p className="text-gray-500 mt-2">
                Freshly prepared and loved by our customers.
              </p>

            </div>

            <button className="text-orange-500 font-semibold hover:text-orange-600 transition">
              View All →
            </button>

          </div>


          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {foods.map((food) => (

              <div
                key={food.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
              >

                {/* Food image area */}
                <div className="relative bg-orange-50 h-48 flex items-center justify-center">

                  <span className="text-7xl hover:scale-110 transition duration-300">
                    {food.emoji}
                  </span>

                  {/* Discount */}
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {food.discount}
                  </span>

                  {/* Favourite */}
                  <button className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full shadow-sm hover:bg-red-50 transition">
                    ♡
                  </button>

                </div>


                {/* Card Content */}
                <div className="p-5">

                  <div className="flex justify-between items-start gap-2">

                    <div>

                      <h3 className="font-bold text-lg text-gray-900">
                        {food.name}
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        {food.category}
                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                      ⭐ {food.rating}
                    </span>

                  </div>


                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    {food.description}
                  </p>


                  <div className="flex items-center justify-between mt-5">

                    <div>

                      <span className="text-xl font-bold text-orange-500">
                        ₹{food.price}
                      </span>

                      <span className="text-sm text-gray-400 line-through ml-2">
                        ₹{food.oldPrice}
                      </span>

                    </div>

                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">
                      + Add
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= SPECIAL OFFER ================= */}
      <section
        id="offers"
        className="max-w-7xl mx-auto px-6 py-14"
      >

        <div className="bg-orange-500 rounded-2xl p-8 sm:p-12 text-white overflow-hidden relative">

          <div className="relative z-10 max-w-2xl">

            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
              🔥 Limited Time Offer
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-5">
              Get 20% OFF on your first order!
            </h2>

            <p className="mt-3 text-orange-50">
              Use the code below while placing your first order
              and enjoy delicious food at a special price.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

              <div className="bg-white text-orange-500 font-bold px-5 py-3 rounded-lg">
                FOODIE20
              </div>

              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Order Now
              </button>

            </div>

          </div>

          <div className="absolute right-8 bottom-2 text-[120px] opacity-20 hidden md:block">
            🍔
          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section
        id="about"
        className="bg-white py-14"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">

            <p className="text-orange-500 font-semibold">
              Why Foodie?
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-1">
              Why Choose Us
            </h2>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="text-center p-6 rounded-xl bg-orange-50 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                🚚
              </div>

              <h3 className="font-bold text-lg">
                Fast Delivery
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Get your favourite food delivered quickly.
              </p>

            </div>


            <div className="text-center p-6 rounded-xl bg-orange-50 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                🥗
              </div>

              <h3 className="font-bold text-lg">
                Fresh Food
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Freshly prepared meals made with quality ingredients.
              </p>

            </div>


            <div className="text-center p-6 rounded-xl bg-orange-50 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                💳
              </div>

              <h3 className="font-bold text-lg">
                Easy Ordering
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Simple and convenient food ordering experience.
              </p>

            </div>


            <div className="text-center p-6 rounded-xl bg-orange-50 hover:shadow-md transition">

              <div className="text-4xl mb-4">
                ⭐
              </div>

              <h3 className="font-bold text-lg">
                Great Quality
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Delicious food with excellent customer satisfaction.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-2">

                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  🍴
                </div>

                <h2 className="text-xl font-bold text-white">
                  Foodie
                </h2>

              </div>

              <p className="text-sm mt-4 leading-relaxed">
                Your simple and convenient online food ordering
                platform for delicious meals.
              </p>

            </div>


            {/* Quick Links */}
            <div>

              <h3 className="text-white font-bold mb-4">
                Quick Links
              </h3>

              <div className="space-y-2 text-sm">

                <p className="hover:text-orange-400 cursor-pointer">
                  Home
                </p>

                <p className="hover:text-orange-400 cursor-pointer">
                  Menu
                </p>

                <p className="hover:text-orange-400 cursor-pointer">
                  Offers
                </p>

                <p className="hover:text-orange-400 cursor-pointer">
                  About Us
                </p>

              </div>

            </div>


            {/* Support */}
            <div>

              <h3 className="text-white font-bold mb-4">
                Support
              </h3>

              <div className="space-y-2 text-sm">

                <p>Help Center</p>

                <p>Contact Us</p>

                <p>Privacy Policy</p>

                <p>Terms & Conditions</p>

              </div>

            </div>


            {/* Contact */}
            <div>

              <h3 className="text-white font-bold mb-4">
                Contact Us
              </h3>

              <div className="space-y-3 text-sm">

                <p>📧 foodie@example.com</p>

                <p>📞 +91 98765 43210</p>

                <p>📍 Mumbai, India</p>

              </div>

            </div>

          </div>


          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">

            <p>
              © 2026 Foodie - Online Food Ordering System
            </p>

          </div>

        </div>

      </footer>

    </div>
  )
}

export default App