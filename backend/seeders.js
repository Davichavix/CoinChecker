import dotenv from "dotenv";
import connectDB from "./config/db.js";
import coins from "./data/coins.js";
import users from "./data/users.js";
// import Account from "./models/accountModel.js";
import Coin from "./models/coinModel.js";
import Transaction from "./models/transactionModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Coin.deleteMany();
    // await Account.deleteMany();
    await Transaction.deleteMany();

    const createdUsers = await User.insertMany(users);

    // const sampleAccount = createdUsers[0]._id;

    await Coin.insertMany(coins);

    console.log("Data imported!");

    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Coin.deleteMany();
    await Account.deleteMany();
    await Transaction.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
