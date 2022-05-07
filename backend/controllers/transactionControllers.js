import Coin from "../models/coinModel.js";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

// @desc    Create a new transaction
// @route   POST /api/transaction
// @access  Private
const createTransaction = async (req, res) => {
  const symbol = req.body.coin;

  console.log(symbol);

  const { _id } = await Coin.findOne({ symbol: symbol }, "_id");

  console.log(_id.toString());

  const transaction = {
    user: req.body.user,
    coin: _id.toString(),
    coin_amount: req.body.coin_amount,
    cash_amount: req.body.cash_amount,
  };

  const createdTransaction = await Transaction.create(transaction);

  const resUser = await User.updateOne(
    { _id: req.body.user },
    { $addToSet: { holdings: _id.toString() } }
  );

  res.status(201).json({
    id: createdTransaction._id,
    resUser,
  });
};

export { createTransaction };
