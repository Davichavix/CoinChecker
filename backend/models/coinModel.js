import mongoose from "mongoose";

const coinModel = mongoose.Schema({
  coinGeckoId: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Coin = mongoose.model("Coin", coinModel);

export default Coin;
