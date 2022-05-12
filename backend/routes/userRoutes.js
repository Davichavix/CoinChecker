import express from "express";
import {
  addToWatchList,
  authUser,
  createUser,
  deleteFromWatchList,
  getAllUsers,
  getUserById,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/signup").post(createUser);
// .get(getAllUsers); //add auth to this route

router
  .route("/:id/watchlist")
  .post(protect, addToWatchList)
  .delete(protect, deleteFromWatchList);

router.route("/:id").get(getUserById);

export default router;
