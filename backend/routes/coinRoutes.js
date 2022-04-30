import axios from "axios";
import express from "express";
import { getCoins } from "../controllers/coinControllers.js";

const router = express.Router();

router.route("/").get(getCoins);

export default router;
