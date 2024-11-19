import express from "express";
import {
  createStockProduct,
  createCustomProduct,
  getAllProducts,
  getProductsByType,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/stock",
  authMiddleware,
  adminAuth,
  validateRequest("createProduct"),
  createStockProduct
); // Admin only
router.post(
  "/custom",
  authMiddleware,
  adminAuth,
  validateRequest("createProduct"),
  createCustomProduct
); // Admin only
router.get("/", getAllProducts); // Public
router.get("/:id", getProductById); // Public
router.put(
  "/:id",
  authMiddleware,
  adminAuth,
  validateRequest("updateProduct"),
  updateProduct
); // Admin only
router.delete("/:id", authMiddleware, adminAuth, deleteProduct); // Admin only

export default router;
