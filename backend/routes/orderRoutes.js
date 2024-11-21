import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/", authMiddleware, validateRequest("createOrder"), createOrder); // Authenticated users
router.get("/:id", authMiddleware, getOrderById); // Authenticated users
//router.get("/", authMiddleware, adminAuth, getAllOrders); // Admin only
router.put("/:id", authMiddleware, adminAuth, updateOrderStatus); //Admin Only
//router.delete("/:id", authMiddleware, adminAuth, deleteOrder); // Admin only

export default router;
