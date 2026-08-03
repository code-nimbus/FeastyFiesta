import express from "express";
import { createRazorPayOrder, verifyRazorpayPayment } from "../controllers/payment.js";
const router = express.Router();
router.post("/create", createRazorPayOrder);
router.post("/verify", verifyRazorpayPayment);
export default router;
