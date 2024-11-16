const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors"); // Add CORS middleware if needed

dotenv.config(); // Load environment variables from .env

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS if needed

// Use route files for specific API endpoints
app.use("/api/products", productRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Set the port
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
