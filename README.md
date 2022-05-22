CoinChecker
=========
### Crypto Portfolio Application

## Project Scope
The Coinchecker application enable users to keep track of their gain/loss when investing in cryptocurrencies. Users are able to input their 
transactions, afterwards their cost basis and cumulative gain/loss per coin is automatically calculated. The front page allows users to see live trading data of the 
top cryptocurrencies while the dashboard displays the user's actual portfolio. In addition a news tab shows users the latest crypto news.

## App Features


### Home Page
- Users see live cryptocurrency trading data including price, market cap, % move, volume for top 50 coins.
- Cryptocurrency data can be sorted by Name, Price, Volume, Market Cap.
- Users can search for specific cryptocurrencies.
- The color for "% Move" dynamically changes between green and red based on increases or decreases in 24h price.

!["screenshot of CoinChecker Front Page"](https://github.com/Davichavix/CoinChecker/blob/feature/README/docs/CoinChecker_FrontPage.png)

### Watchlist Page
- Users are able to add and remove coins from their watchlist by toggling the green checkmark.

!["screenshot of CoinChecker Watchlist"](https://github.com/Davichavix/CoinChecker/blob/feature/README/docs/Watch_list_screenshot.png)

### Dashboard Page
- Portfolio displays Total Balance, Total Profit/Loss numerically
- User Portfolio is also broken down by individual crypto holdings where each position's size, cost basis and gain/loss is displayed.
- Pie Chart is used to visualize overall holdings and dynamically renders upon new transactions.

!["screenshot of CoinChecker Dashboard"](https://github.com/Davichavix/CoinChecker/blob/feature/README/docs/Crypto_portfolio_dashboard_screenshot.png)

### News Page
- Displays latest crypto news 

!["screenshot of CoinChecker News"](https://github.com/Davichavix/CoinChecker/blob/feature/README/docs/Crypto_news_screenshot.png)

### Record Transactions
- Users input their past transaction including cost basis, coin quantity. This transaction is then stored utilizing MongoDB.

!["screenshot of CoinChecker Buy/Sell Button"](https://github.com/Davichavix/CoinChecker/blob/feature/README/docs/Add_Sell_Button_screenshot.png)


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

### Dependencies
- Node 10.x or above
- NPM 5.x or above
- axios
- express
- mongoose
- react