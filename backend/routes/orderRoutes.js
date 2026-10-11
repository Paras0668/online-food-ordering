
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      address,
      items,
      subtotal,
      discount = 0,
      total,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !address ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all order details",
      });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      address,
      items,
      subtotal,
      discount,
      total,
      status: "Placed",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE ORDER STATUS AND NOTIFY SOCKET CLIENTS
router.patch("/:id/status", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const allowedStatuses = [
      "Placed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const io = req.app.get("io");

    if (io) {
      io.to(`order:${order._id}`).emit("order:status", {
        orderId: order._id.toString(),
        status: order.status,
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Status Update Error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
