import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet"; // Security headers
import cors from "cors"; // Add CORS middleware if needed
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoute from "./routes/adminRoute.js";
//import paymentRoutes from "./routes/paymentRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config(); // Load environment variables from .env

mongoose.set("strictQuery", true);
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
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); //  Allow cross-origin requests
app.use(helmet());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
//app.use("/api/payment", paymentRoutes);
app.use("/api/customers", customerRoutes);
//app.use("/api/featured-products", featuredProductsRoutes);

// Admin login
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Set port and start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
