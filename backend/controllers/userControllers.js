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

// @desc    Create user
// @route   POST /api/users
// @access  Private
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    holdings: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export { getUserById, getAllUsers, createUser };