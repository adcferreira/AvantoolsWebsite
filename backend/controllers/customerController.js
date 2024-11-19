import jwt from "jsonwebtoken";
import Customer from "../models/customerModel.js";
import { validationResult } from "express-validator"; // To validate inputs
import dotenv from "dotenv";
dotenv.config();

// Register a new user
export const registerCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    // Check if customer already exists
    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const customer = new Customer({
      email,
      password,
      name,
    });

    await customer.save();

    // Generate JWT token
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login an existing user
export const loginCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await customer.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const updateCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  const customerId = req.user.id; // Extract customer ID from the authenticated token

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Update fields if provided
    if (name) customer.name = name;
    if (email) customer.email = email;

    // Hash the new password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      customer.password = hashedPassword;
    }

    await customer.save();
    res.status(200).json({ message: "Profile updated successfully", customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Delete a user account
export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
