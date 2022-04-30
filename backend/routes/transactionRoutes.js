import express from "express";
import { createTransaction } from "../controllers/transactionControllers.js";

const router = express.Router();

router.route("/").post(createTransaction);

export default router;
