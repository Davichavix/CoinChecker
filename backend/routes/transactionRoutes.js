import express from "express";
import { createTransaction } from "../controllers/transactionControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createTransaction);

export default router;
