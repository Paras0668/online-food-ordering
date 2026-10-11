function Offer() {
  return (
    <section
      id="offers"
      className="max-w-7xl mx-auto px-6 py-12"
    >

      <div className="bg-orange-500 rounded-3xl px-8 py-14 text-center text-white">

        <p className="font-semibold text-orange-100">
          SPECIAL OFFER
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-3">
          Get 20% OFF on Your First Order 🎉
        </h2>

        <p className="text-orange-100 mt-4 max-w-xl mx-auto">
          Order your favourite food and enjoy delicious meals
          at an amazing price.
        </p>

        <a
          href="#menu"
          className="inline-block mt-7 bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition"
        >
          Order Now
        </a>

      </div>

    </section>
  )
}

export default Offer