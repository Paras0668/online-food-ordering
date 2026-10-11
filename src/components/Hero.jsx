function Hero() {
  return (
    <section
      id="home"
      className="bg-orange-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">

        <p className="text-orange-500 font-semibold mb-4">
          Delicious food delivered to your doorstep
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Order Your Favourite Food
          <span className="text-orange-500"> Anytime</span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
          Explore delicious dishes, choose your favourites and enjoy
          fresh food delivered quickly.
        </p>

        <a
          href="#menu"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold mt-8 hover:bg-orange-600 transition"
        >
          Explore Menu
        </a>

      </div>
    </section>
  )
}

export default Hero