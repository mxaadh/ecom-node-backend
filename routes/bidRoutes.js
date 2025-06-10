import express from "express";
import {
  createBid,
  createWishlist,
  getBids,
  getBidsByProductId,
} from "../controllers/bidController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getBids);
router.get("/:productId", getBidsByProductId);

// Protected routes (only logged-in users)
router.post("/wishlist", protect, createWishlist);
router.post("/", protect, createBid);

export default router;
