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
        coinBought: {
          $sum: {
            $cond: [
              {
                $eq: ["$holdings.buy", true],
              },
              "$holdings.coin_amount",
              0,
            ],
          },
        },
        coinSold: {
          $sum: {
            $cond: [
              {
                $eq: ["$holdings.sell", true],
              },
              "$holdings.coin_amount",
              0,
            ],
          },
        },
        cashBought: {
          $sum: {
            $cond: [
              {
                $eq: ["$holdings.buy", true],
              },
              "$holdings.cash_amount",
              0,
            ],
          },
        },
        cashSold: {
          $sum: {
            $cond: [
              {
                $eq: ["$holdings.sell", true],
              },
              "$holdings.cash_amount",
              0,
            ],
          },
        },
      },
    },
    {
      $addFields: {
        avgCost: { $divide: ["$cashBought", "$coinBought"] },
        currentCoinAmount: { $subtract: ["$coinBought", "$coinSold"] },
      },
    },
    {
      $sort: {
        "_id.symbol": 1,
      },
    },
  ]);

  res.json(data);
};

export { getPortfolio };
