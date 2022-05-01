import axios from "axios";
import mongoose from "mongoose";
import Coin from "../models/coinModel.js";

// @desc    Get a list of COIN
// @route   GET /api/coins
// @access  Public
const getCoins = async (req, res) => {
  const { symbol, name } = req.query;

  const query = {};

  if (symbol) {
    query.symbol = symbol;
  }

  if (name) {
    query.name = name;
  }

  if (query) {
    const coin = await Coin.find(query);
    if (coin.length > 0) {
      res.json(coin);
    } else {
      res.json("No result found");
    }
  } else {
    const coins = await Coin.find({});
    res.json(coins);
  }
};

const getCoinData = async (req, res) => {
  const id = req.params.id;

  console.log(id);

  const URL = `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;

  const { data } = await axios.get(URL);

  if (data) {
    res.json(data);
  } else {
    res.status(400);
    throw new Error("No data available");
  }
};

const getCoinRssFeed = async (req, res) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/xml; charset=utf-8",
    },
  };
  const URL = `https://cointelegraph.com/rss`;

  const { data } = await axios.get(URL, config);

  console.log(data);

  if (data) {
    res.json(data);
  } else {
    res.json("No news available");
  }
};

export { getCoins, getCoinData, getCoinRssFeed };
