import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

// @desc    Create a new transaction
// @route   POST /api/transaction
// @access  Private
const createTransaction = async (req, res) => {
  const transaction = {
    user: req.body.user,
    coin: req.body.coin,
    coin_amount: req.body.coin_amount,
    cash_amount: req.body.cash_amount,
  };

  const createdTransaction = await Transaction.create(transaction);

  const resUser = await User.updateOne(
    { _id: req.body.user },
    { $addToSet: { holdings: req.body.coin } }
  );

  res.status(201).json({
    id: createdTransaction._id,
    resUser,
  });
};

export { createTransaction };
