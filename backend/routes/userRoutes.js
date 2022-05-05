import express from "express";
import {
  authUser,
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/").post(createUser);

// .get(getAllUsers); //add auth to this route

router.route("/:id").get(getUserById);

export default router;
