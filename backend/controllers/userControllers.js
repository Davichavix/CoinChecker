import User from "../models/userModel.js";
import "express-async-errors";

// @desc    Get user info
// @route   GEt /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc    Get all user info
// @route   GEt /api/users
// @access  Private
const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json(users);
};

export { getUserById, getAllUsers };
