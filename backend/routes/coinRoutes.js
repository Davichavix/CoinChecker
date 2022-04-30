import axios from "axios";
import express from "express";
import { getCoinData, getCoins } from "../controllers/coinControllers.js";

const router = express.Router();

router.route("/:id").get(getCoinData);

router.route("/").get(getCoins);

export default router;
