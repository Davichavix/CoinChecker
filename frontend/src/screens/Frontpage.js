import { useEffect, useState } from 'react';
import Coin from "../components/Coin";
import axios from 'axios';

export const Frontpage = () => {

  const [coin, setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h')
    .then(res => {
      setCoins(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const coinList = coin

  return (
    <div className="Frontpage">
      <h1>Coin Data</h1>
      {coinList.map(coin => {
        return <Coin 
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketCap={coin.marketCap}
          price={coin.current_price}
        />}
      )}
    </div>
  );
};