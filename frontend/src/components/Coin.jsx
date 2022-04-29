import React from 'react';

import './Coin.css';

const Coin = (props) => {
  return (
    <div className ='coin-container'>
      <div className='coin-row'>
        <div className='coin-type'>
          <img src={props.image} alt='coin'></img>
          <h1>{props.name}</h1>
          <p className='symbol'>{props.symbol}</p>
        </div>
        <div className='coin-data'>
          <div className='coin-price'>${props.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Coin;