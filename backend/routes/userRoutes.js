import express from "express";
import { getAllUsers, getUserById } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getAllUsers); //add auth to this route

router.route("/:id").get(getUserById);

export default router;
