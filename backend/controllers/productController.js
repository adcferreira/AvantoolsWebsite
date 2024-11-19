import { Product, CustomProduct } from "../models/productModel.js";

//import Product from "../models/productModel"; // Import the product model

// Create new stock product
export async function createStockProduct(req, res) {
  try {
    const product = new StockProduct(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to create stock product" });
  }
}

// Create new custom product
export async function CreateCustomProduct(req, res) {
  try {
    const product = new CustomProduct(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to create custom product" });
  }
}

// Update product
export async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to update product" });
  }
}

// Get all products
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

// Get product by ID
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

//Get products by type (stock or custom)
export async function getProductsByType(req, res) {
  const { type } = req.params;

  try {
    const products = await Product.find({ productType: type }); // "stock" or "custom"
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch ${type} products` });
  }
}

// Delete Product
export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
}
