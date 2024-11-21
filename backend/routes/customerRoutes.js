import express from "express";
import {
  registerCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { body } from "express-validator";
import rateLimit from "express-rate-limit"; // For login rate limiting
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// Rate limiting for login attempts (5 requests per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit to 5 requests
  message: "Too many login attempts. Please try again later.",
});

// Validation for email and password
const validateCustomerInput = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

router.post("/register", validateRequest("registerCustomer"), registerCustomer);
router.post("/login", loginCustomer);
router.put(
  "/profile",
  authMiddleware,
  validateRequest("updateCustomer"),
  updateCustomer
); // Authenticated users
router.delete("/profile", authMiddleware, deleteCustomer); // Authenticated users

export default router;
