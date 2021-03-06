import User from "../models/userModel.js";
import "express-async-errors";
import generateToken from "../utils/generateToken.js";
import Coin from "../models/coinModel.js";
import mongoose from "mongoose";

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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

// @desc    Add coin to watch list
// @route   POST /api/users/:id/watch?symbol
// @access  Private
const addToWatchList = async (req, res) => {
  const { id } = req.params;
  const { symbol } = req.query;

  console.log(id, symbol);

  try {
    const coin = await Coin.findOne({ symbol });

    const coinId = coin._id;

    const user = await User.updateOne(
      {
        _id: id,
      },
      {
        $addToSet: {
          watchlist: coinId,
        },
      }
    ).lean();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Invalid symbol or user id");
  }
};

// @desc    Delet coin in watch list
// @route   DELETE /api/users/:id/watch?symbol
// @access  Private
const deleteFromWatchList = async (req, res) => {
  const { id } = req.params;
  const { symbol } = req.query;

  try {
    const coin = await Coin.findOne({ symbol });

    const coinId = coin._id;

    const user = await User.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          watchlist: coinId,
        },
      }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Invalid symbol or user id");
  }
};

// @desc    Get watch list
// @route   GET /api/users/:id/watchlist
// @access  Private
const getWatchList = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "coins",
          localField: "watchlist",
          foreignField: "_id",
          as: "coins",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          coins: 1,
        },
      },
    ]);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Invalid user id");
  }
};

export {
  getUserById,
  getAllUsers,
  createUser,
  authUser,
  addToWatchList,
  deleteFromWatchList,
  getWatchList,
};
