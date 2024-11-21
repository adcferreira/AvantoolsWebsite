import mongoose from "mongoose";
import Admin from "../models/adminModel.js";
import dotenv from "dotenv";
dotenv.config();

const seedAdmin = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const username = process.env.USER_ADMIN;
    const password = process.env.ADMIN_PASSWORD; // Replace with your desired admin password

    // Validate environment variables
    if (!username || !password) {
      throw new Error(
        "Missing USER_ADMIN or ADMIN_PASSWORD in environment variables"
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("Admin already exists!");
      mongoose.connection.close();
      return;
    }

    // Save to the database
    const admin = new Admin({ username, password });
    await admin.save();

    console.log("Admin user created successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin user:", error.message);
    mongoose.connection.close();
  }
};

seedAdmin();
