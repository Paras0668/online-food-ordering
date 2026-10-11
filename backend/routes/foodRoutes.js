const express = require("express");
const router = express.Router();

const Food = require("../models/Food");

// GET all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch foods",
    });
  }
});

// GET food by ID
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid food ID",
    });
  }
});

// POST new food
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, emoji, rating } = req.body;

    // Basic validation
    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price and category are required",
      });
    }

    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    const food = await Food.create({
      name,
      description,
      price,
      category,
      emoji,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add food",
    });
  }
});

// DELETE food
router.delete("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid food ID",
    });
  }
});

module.exports = router;