import axios from "axios";

const URL = `https://api.coingecko.com/api/v3/coins/list
`;
const { data } = await axios.get(URL);

const uniqueIds = new Set();
const uniqueSymbols = new Set();

const coins = data.filter((coin) => {
  const isDuplicate = uniqueIds.has(coin.id) || uniqueSymbols.has(coin.symbol);
  const isNull = !coin.id || !coin.symbol;

  uniqueIds.add(coin.id);
  uniqueSymbols.add(coin.symbol);

  if (!isDuplicate && !isNull) {
    return true;
  }
  return false;
});

console.log(coins);

export default coins;
