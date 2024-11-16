const express = require("express");
const router = express.Router();

// API route to create an order (dummy for now)
router.post("/", async (req, res) => {
  const { customerName, products, totalAmount } = req.body;

  try {
    res.json({ message: "Order created", customerName, totalAmount, products });
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

module.exports = router; // Export the router
