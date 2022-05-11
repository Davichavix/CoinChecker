import dotenv from "dotenv";
import connectDB from "./config/db.js";
import coins from "./data/coins.js";
import transactions from "./data/transactions.js";
import users from "./data/users.js";
import Coin from "./models/coinModel.js";
import Transaction from "./models/transactionModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.remove();
    await Coin.remove();
    await Transaction.remove();
    const createdUsers = await User.insertMany(users);
    // const sampleAccount = createdUsers[0]._id;
    const { _id } = await User.findOne({ name: "Lenil Samuel" });

    await Coin.insertMany(coins);

    const newTransactions = await Promise.all(
      transactions(_id.toString()).map(async (transaction) => {
        const symbol = transaction.symbol;
        const { _id } = await Coin.findOne({ symbol });
        return { ...transaction, coin: _id.toString() };
      })
    );

    // insert transactions
    const createdTransaction = await Transaction.insertMany(newTransactions);

    //update user document
    // await Promise.all(
    //   createdTransaction.map(async (transaction) => {
    //     const userId = transaction.user.toString();
    //     const coinId = transaction.coin.toString();
    //     await User.updateOne(
    //       { _id: userId },
    //       {
    //         $addToSet: {
    //           holdings: {
    //             coin_id: coinId.toString(),
    //             open_date: transaction.open_date,
    //           },
    //         },
    //       }
    //     );
    //   })
    // );

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
