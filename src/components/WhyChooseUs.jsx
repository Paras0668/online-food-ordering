function WhyChooseUs() {
  const features = [
    {
      emoji: "⚡",
      title: "Fast Delivery",
      description:
        "Your favourite food delivered quickly and safely.",
    },
    {
      emoji: "🍲",
      title: "Fresh Food",
      description:
        "We focus on fresh ingredients and delicious meals.",
    },
    {
      emoji: "⭐",
      title: "Best Quality",
      description:
        "Enjoy quality food with a smooth ordering experience.",
    },
  ]

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-16"
    >

      <div className="text-center mb-12">

        <p className="text-orange-500 font-semibold">
          WHY CHOOSE US
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          A Better Way To Order Food
        </h2>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="bg-white border border-gray-100 rounded-2xl p-7 text-center shadow-sm hover:shadow-lg transition"
          >

            <div className="text-5xl mb-5">
              {feature.emoji}
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              {feature.title}
            </h3>

            <p className="text-gray-500 mt-3">
              {feature.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  )
}

export default WhyChooseUs