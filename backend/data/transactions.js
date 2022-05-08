const transactions = (_id) => [
  {
    user: _id.toString(),
    symbol: "btc",
    coin_amount: 1,
    cash_amount: 35000,
    open_date: new Date("01/01/2020"),
  },
  {
    user: _id.toString(),
    symbol: "eth",
    coin_amount: 1,
    cash_amount: 2500,
    open_date: new Date("10/01/2020"),
  },
  {
    user: _id.toString(),
    symbol: "ada",
    coin_amount: 1000,
    cash_amount: 1500,
    open_date: new Date("01/01/2021"),
  },
  {
    user: _id.toString(),
    symbol: "sol",
    coin_amount: 10,
    cash_amount: 1000,
    open_date: new Date("11/01/2021"),
  },
  {
    user: _id.toString(),
    symbol: "eth",
    coin_amount: 2,
    cash_amount: 3500,
    open_date: new Date("01/01/2022"),
  },
];

export default transactions;
