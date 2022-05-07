import express from "express";
import { getPortfolio } from "../controllers/portfolioControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/user/:id").get(protect, getPortfolio);

export default router;
