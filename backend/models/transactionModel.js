import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  coin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Coin",
  },
  coin_amount: {
    type: Number,
    required: true,
  },
  cash_amount: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
