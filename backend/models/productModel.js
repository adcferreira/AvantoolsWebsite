const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  imageUrl: String,
  stockQuantity: { type: Number, default: 0 },
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product; // Export the Product model
