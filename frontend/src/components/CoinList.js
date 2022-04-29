import React from "react";

export const CoinList = () => {
  return (
    <div>
      <table style={{width: "90%", marginLeft: "20px"}}>
        <tr style={{borderBottom: "10px solid black", fontSize: "1.5rem"}}>
          <th>Coin</th>
          <th></th>
          <th>Price</th>
          <th>Mkt Cap</th>
          <th>Holdings</th>
          <th>PNL</th>
        </tr>
        <tr>
          <td>Bitcoin</td>
          <td>BTC</td>
          <td>$40000</td>
          <td>1T</td>
        </tr>
        <tr>
          <td>Ethereum</td>
          <td>ETH</td>
          <td>$3000</td>
          <td>300B</td>
        </tr>
        <tr>
          <td>Doge</td>
          <td>DOGE</td>
          <td>$0.16</td>
          <td>20B</td>
        </tr>
        <tr>
          <td>Doge</td>
          <td>DOGE</td>
          <td>$0.16</td>
          <td>20B</td>
        </tr>
        <tr>
          <td>Doge</td>
          <td>DOGE</td>
          <td>$0.16</td>
          <td>20B</td>
        </tr>
        <tr>
          <td>Doge</td>
          <td>DOGE</td>
          <td>20B</td>
        </tr>
      </table>
    </div>
  );
};
