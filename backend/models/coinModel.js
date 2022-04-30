import mongoose from "mongoose";

const coinModel = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Coin = mongoose.model("Coin", coinModel);

export default Coin;
