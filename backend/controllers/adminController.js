import Admin from "../models/adminModel.js";
import { sign } from "jsonwebtoken";

// Admin Login
export async function adminLogin(req, res) {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.isValidPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token
    const token = sign({ id: admin._id, role: "admin" }, "your_jwt_secret", {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

// Create Admin (first-time admin creation)
export async function createAdmin(req, res) {
  const { username, password } = req.body;

  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating admin user" });
  }
}
