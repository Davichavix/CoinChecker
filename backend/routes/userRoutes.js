import express from "express";
import {
  addToWatchList,
  authUser,
  createUser,
  deleteFromWatchList,
  getUserById,
  getWatchList,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/signup").post(createUser);

router
  .route("/:id/watchlist")
  .put(protect, addToWatchList)
  .get(protect, getWatchList)
  .delete(protect, deleteFromWatchList);

router.route("/:id").get(getUserById);

export default router;
