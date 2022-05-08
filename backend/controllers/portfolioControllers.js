import axios from "axios";
import Coin from "../models/coinModel.js";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

// @desc    Get user porfolio of coins
// @route   GET /api/portfolio/user/:id
// @access  Private

const getPortfolio = async (req, res) => {
  const { id } = req.params;

  const { name } = await User.findOne({ _id: id });

  const data = await User.aggregate([
    { $match: { name } },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "user",
        as: "holdings",
      },
    },
    { $unwind: { path: "$holdings" } },
    { $unwind: { path: "$holdings.coin" } },
    {
      $group: {
        _id: {
          user: "$holdings.user",
          coin: "$holdings.coin",
          symbol: "$holdings.symbol",
        },
        open_date: {
          $min: "$holdings.open_date",
        },
        totalCoin: {
          $sum: "$holdings.coin_amount",
        },
        totalCost: {
          $sum: "$holdings.cash_amount",
        },
        averageCost: {
          $avg: { $divide: ["$holdings.cash_amount", "$holdings.coin_amount"] },
        },
      },
    },
  ]);

  res.json(data);
};

export { getPortfolio };
