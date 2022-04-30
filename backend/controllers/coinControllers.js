import mongoose from "mongoose";
import Coin from "../models/coinModel.js";

// @desc    Get a list of COIN
// @route   GET /api/coins
// @access  Public
const getCoins = async (req, res) => {
  const { symbol } = req.query;

  if (symbol) {
    const coin = await Coin.find({ symbol });
    res.json(coin);
  } else {
    const coins = await Coin.find({});
    res.json(coins);
  }
};

export { getCoins };
