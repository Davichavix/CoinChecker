import axios from "axios";
import Coin from "../models/coinModel.js";
import User from "../models/userModel.js";

// @desc    Get user porfolio of coins
// @route   GET /api/portfolio/user/:id
// @access  Private

const getPortfolio = async (req, res) => {
  const { id } = req.params;
  console.log(id);
};

export { getPortfolio };
