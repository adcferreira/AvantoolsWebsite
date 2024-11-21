import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// Route to create the first admin user (run this once)
// router.post("/create-admin", validateRequest("createAdmin"), createAdmin); // Ensure to disable or protect this after first admin is created

// Route to login an admin
router.post("/login", adminAuth, validateRequest("adminLogin"), adminLogin);

export default router;
