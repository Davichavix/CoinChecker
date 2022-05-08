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
  symbol: {
    type: String,
    required: true,
  },
  coin_amount: {
    type: Number,
    required: true,
  },
  cash_amount: {
    type: Number,
    required: true,
  },
  open_date: {
    type: Date,
    required: true,
  },
  buy: {
    type: Boolean,
    default: false,
  },
  sell: {
    type: Boolean,
    default: false,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
