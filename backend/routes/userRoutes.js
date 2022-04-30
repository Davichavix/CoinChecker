import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers); //add auth to this route

router.route("/:id").get(getUserById);

export default router;
