import { Product } from "../models/productModel";
import Order from "../models/orderModel";

// Create new order
export async function createOrder(req, res) {
  try {
    const { customerName, customerEmail, products, totalAmount } = req.body;

    // Check if all products are of type "stock"
    const isStockProductValid = await Promise.all(
      products.map(async (product) => {
        const productFromDb = await Product.findById(product.productId);
        if (productFromDb && productFromDb.type !== "stock") {
          return false; // If any product is not of type "stock", return false
        }
        return true; // If product is of type "stock", return true
      })
    );

    // If any product is not of type "stock", return error
    if (isStockProductValid.includes(false)) {
      return res.status(400).json({
        error: "Only 'stock' type products can be processed through checkout.",
      });
    }

    // Create the order if all products are valid
    const order = new Order({
      customerName,
      customerEmail,
      customerContact,
      products,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: "Failed to create order" });
  }
}

// Get an order by ID
export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
}

// Update order status (e.g., from 'pending' to 'completed')
export async function updateOrderStatus(req, res) {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status || order.status;
    order.paymentStatus = paymentStatus || order.paymentStatus;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
}
