import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // holdings: [
  //   {
  //     coin_id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Coin",
  //     },
  //     amount: Number,
  //     open_date: Date,
  //     close_date: Date,
  //   },
  // ],
  watchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // unique: true,
      ref: "Coin",
    },
  ],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
