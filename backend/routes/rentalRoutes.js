const express = require("express");
const Rental = require("../models/rentalModel");
const Product = require("../models/productModel");
const router = express.Router();

// Route to rent a product
router.post("/", async (req, res) => {
  const { productId, customerId, rentalStartDate, rentalEndDate } = req.body;

  try {
    // Check if the product is available
    const existingRental = await Rental.findOne({
      productId,
      rentalEndDate: { $gte: rentalStartDate },
      rentalStartDate: { $lte: rentalEndDate },
      status: "rented",
    });

    if (existingRental) {
      return res
        .status(400)
        .json({ message: "Product is not available during this period." });
    }

    // Create the rental record
    const rental = new Rental({
      productId,
      customerId,
      rentalStartDate,
      rentalEndDate,
    });
    await rental.save();
    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ message: "Error renting the product" });
  }
});

// Route to check if a product is available for a given date range
router.get("/check-availability", async (req, res) => {
  const { productId, rentalStartDate, rentalEndDate } = req.query;

  try {
    const existingRental = await Rental.findOne({
      productId,
      rentalEndDate: { $gte: new Date(rentalStartDate) },
      rentalStartDate: { $lte: new Date(rentalEndDate) },
      status: "rented",
    });

    if (existingRental) {
      return res.json({
        available: false,
        message: "Product is not available.",
      });
    }

    res.json({ available: true, message: "Product is available for rental." });
  } catch (err) {
    res.status(500).json({ message: "Error checking availability" });
  }
});

// Route to get a customer's rental history
router.get("/history/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const rentals = await Rental.find({ customerId })
      .populate("productId")
      .exec();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rental history" });
  }
});

module.exports = router; // Export the router
