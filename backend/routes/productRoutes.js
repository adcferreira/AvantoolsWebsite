const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

// Route to create a new product
router.post("/", async (req, res) => {
  const { name, price, description, imageUrl, stockQuantity } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      stockQuantity,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).send("Error creating product");
  }
});

// Route to update a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, stockQuantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl, stockQuantity },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).send("Error updating product");
  }
});

// Route to delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
});

module.exports = router; // Export the router
