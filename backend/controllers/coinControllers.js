import axios from "axios";
// import mongoose from "mongoose";
import Coin from "../models/coinModel.js";
import Parser from "rss-parser";

const parser = new Parser({
  headers: { "User-Agent": "Chrome" },
});

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

// @desc    Get coin data
// @route   GET /api/coins/:id
// @access  Public
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

// @desc    Get coin news
// @route   GET /api/coins/news
// @access  Public
const getCoinRssFeed = async (req, res) => {
  const URL = `https://cointelegraph.com/rss`;

  const feed = await parser.parseURL(URL);

  console.log(feed);

  if (feed) {
    res.json(feed);
  } else {
    res.json("No news available");
  }
};

export { getCoins, getCoinData, getCoinRssFeed };
