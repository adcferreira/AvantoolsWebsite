// controllers/paymentController.js
import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Process payment for an order
export async function processPayment(req, res) {
  try {
    const { orderId, paymentToken } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if the order is of type "stock" and payment is pending
    if (order.paymentStatus !== "pending") {
      return res
        .status(400)
        .json({ error: "Payment has already been processed" });
    }

    // Calculate total amount from the order (assuming the totalAmount field)
    const amount = order.totalAmount * 100; // Convert to smallest currency unit (e.g., cents)

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur", // Change this to your desired currency
      payment_method: paymentToken,
      confirmation_method: "manual",
      confirm: true,
    });

    // Update the order status after payment is successful
    if (paymentIntent.status === "succeeded") {
      order.paymentStatus = "completed";
      order.status = "completed";
      await order.save();
      res.status(200).json({ message: "Payment successful", order });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Payment processing failed" });
  }
}
