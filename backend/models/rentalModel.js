const mongoose = require("mongoose");

// Define the rental schema
const rentalSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  rentalStartDate: { type: Date, required: true },
  rentalEndDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["rented", "returned", "cancelled"],
    default: "rented",
  },
});

// Create the Rental model
const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental; // Export the Rental model
