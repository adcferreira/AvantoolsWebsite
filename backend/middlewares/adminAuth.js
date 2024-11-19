import { verify } from "jsonwebtoken";

// Admin Authentication Middleware
export function adminAuth(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = verify(token, process.env.JWT_ADMIN_SECRET); // Verify the token
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied, admin only" });
    }
    req.admin = decoded; // Add decoded info to request for future use
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
