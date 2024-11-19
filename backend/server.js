import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet"; // Security headers
import cors from "cors"; // Add CORS middleware if needed
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config(); // Load environment variables from .env

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
const app = express();
app.use(json()); // Middleware to parse JSON
app.use(cors()); //  Allow cross-origin requests
app.use(helmet());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/customers", customerRoutes);

// Admin login
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Set port and start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
