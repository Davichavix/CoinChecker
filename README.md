Crypto Portfolio and Market Checking App
=========

# CoinChecker

## Project Scope
The Coinchecker application enable users to keep track of their gain/loss when investing in cryptocurrencies. Users are able to input their 
transactions and their cost basis and cumulative gain/loss per coin is calculated. The front page allows users to see live trading data of the 
top cryptocurrencies while the dashboard displays the user's actual portfolio. In addition a news tab shows users the latest crypto news.

## App Features


### Home Page
- Users see live cryptocurrency trading data including price, market cap, % move, volume for top 50 coins.
- Cryptocurrency data can be sorted by Name, Price, Volume, Market Cap.
- Users can search for specific cryptocurrencies.
- Users are able to add and remove coins from their watchlist.
- The color for "% Move" dynamically changes between green and red based on increases or decreases in price.

!["screenshot of CoinChecker Front Page"](https://github.com/Davichavix/CoinChecker/blob/feature/README/docs/CoinChecker_FrontPage.png)


# Instruction
* Before running anything, cd into root directory. Do not go into either backend or front end directory.
* Install packages
  ``` 
  npm install 
  cd frontend 
  npm install
  cd ..
  ```
  Make sure to go back to root directory

* To run server
  ` npm run server `
* To run client
  ` npm run client `
* To run server and client concurrently
  ` npm run dev `