const mongoose = require("mongoose")
const Food = require("./models/Food")

require("dotenv").config()

const foods = [
  {
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    rating: 4.8,
    emoji: "🍕",
    description: "Fresh mozzarella, tomato sauce and basil.",
  },
  {
    name: "Cheese Burger",
    category: "Burger",
    price: 179,
    rating: 4.7,
    emoji: "🍔",
    description: "Crispy patty with cheese and fresh vegetables.",
  },
  {
    name: "Avacado Toast",
    category: "Toast",
    price: 299,
    rating: 4.9,
    emoji: "🥪",
    description:
      "Mashed or sliced ripe avocado spread over toasted bread, perfectly seasoned",
  },
  {
    name: "White Sauce Pasta",
    category: "Pasta",
    price: 229,
    rating: 4.6,
    emoji: "🍝",
    description: "Creamy white sauce pasta with herbs.",
  },
  {
    name: "French Fries",
    category: "Sides",
    price: 119,
    rating: 4.5,
    emoji: "🍟",
    description: "Crispy golden fries with delicious seasoning.",
  },
  {
    name: "Chocolate Shake",
    category: "Drinks",
    price: 149,
    rating: 4.7,
    emoji: "🥤",
    description: "Rich and creamy chocolate milkshake.",
  },
  {
    name: "Veg Momos",
    category: "Snacks",
    price: 139,
    rating: 4.6,
    emoji: "🥟",
    description: "Steamed momos served with spicy chutney.",
  },
  {
    name: "Chocolate Cake",
    category: "Desserts",
    price: 199,
    rating: 4.9,
    emoji: "🍰",
    description: "Soft chocolate cake with creamy frosting.",
  },
]

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB connected")

    await Food.deleteMany()

    await Food.insertMany(foods)

    console.log("8 foods inserted successfully")

    await mongoose.connection.close()
  } catch (error) {
    console.log("Error:", error.message)
  }
}

seedFoods()