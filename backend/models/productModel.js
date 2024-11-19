import { Schema, model } from "mongoose";

// Define the product schema
const baseProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    productType: { type: String, required: true, enum: ["stock", "custom"] }, // Discriminator key
  },
  { discriminatorKey: "productType", timestamps: true }
);

// Create the Product model
export const Product = model("Product", baseProductSchema);

// Stock Product Schema
export const StockProduct = Product.discriminator(
  "stock",
  new Schema({
    stockQuantity: { type: Number, required: true, default: 0 },
  })
);

// Custom Product Schema
export const CustomProduct = Product.discriminator(
  "custom",
  new Schema({
    contactDetails: { type: String, required: true }, // Instructions for contacting
  })
);
