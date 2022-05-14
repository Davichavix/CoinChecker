import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";

import "./Search.css";
import "./Table.css";
import Meta from "./Meta";
import CurrentHoldingsHead from "./CurrentHoldingsHead";
import CurrentHoldingsBody from "./CurrentHoldingsBody";

const CurrentHoldings = ({coinPort, gainLossObject}) => {
  const [tableData, setTableData] = useState([]);
  // const [search, setSearch] = useState("");
  const [originalList, setOriginalList] = useState([]);

  const [inWatchList, setInWatchList] = useState({});
  const user = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(user);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((res) => {
        const HoldingsListObj = {};
        for (const coin of coinPort) {
          HoldingsListObj[coin["_id"]["symbol"]] = true;
        }
        setInWatchList(HoldingsListObj);
        console.log(coinPort, "coinPort");
        console.log(HoldingsListObj, "HoldingsListObj");
        const filteredData = res.data.filter((coin) => {
          return HoldingsListObj[coin.symbol];
        });
        console.log(filteredData, "filteredData")
        filteredData.forEach((element) => {
          return element['gain_loss'] = gainLossObject[element["symbol"]]
        })

        console.log(filteredData, "portfolioData")
        setOriginalList(filteredData);
        setTableData(filteredData);
        // setTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //       const HoldingsListObj = {};
  //       for (const coin of coinPort) {
  //         HoldingsListObj[coin["_id"]["symbol"]] = true;
  //       }
  //       setInWatchList(HoldingsListObj);
  //       console.log(coinPort, "coinPort");
  //       console.log(HoldingsListObj, "HoldingsListObj");
  // }, []);

  const columns = [
    { label: "Coin Name", accessor: "name", sortable: true },
    { label: "Symbol", accessor: "symbol", sortable: false },
    { label: "Price", accessor: "current_price", sortable: true },
    { label: "Cost Basis", accessor: "market_cap", sortable: true },
    {
      label: "% Move",
      accessor: "price_change_percentage_24h",
      sortable: true,
    },
    { label: "Coin Hodlings", accessor: "total_volume", sortable: true },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  // const handleSearch = (e) => {
  //   const searchCoin = e.target.value;
  //   setSearch(searchCoin);
  // };

  // const resetSearchField = () => {
  //   setSearch("");
  // };

  // useEffect(() => {
  //   const filteredData = originalList.filter((coin) => {
  //     return coin.name.toLowerCase().includes(search.toLowerCase());
  //   });
  //   setTableData(filteredData);
  // }, [search]);

  const showWatchList = () => {
    const filteredData = originalList.filter((coin) => {
      return inWatchList[coin.symbol];
    });
    setTableData(filteredData);
  };

  const showTopCoins = () => {
    setTableData(originalList);
  };

  // const handleWatchListCheck = async (currency) => {
  //   //  Update check watchlist.
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userInfo.token}`,
  //     },
  //   };

  //   const userId = userInfo._id;
  //   const { symbol, id } = currency;
  //   const newInWatchList = { ...inWatchList };

  //   const URL = `/api/users/${userId}/watchlist?symbol=${symbol}`;

  //   if (!newInWatchList[symbol]) {
  //     newInWatchList[symbol] = true;

  //     await axios.put(URL, {}, config);
  //   } else {
  //     delete newInWatchList[symbol];

  //     await axios.delete(URL, config);
  //   }
  //   setInWatchList(newInWatchList);
  // };

  return (
    <>
      <Meta />
      <div className="wrapper">
        {/* <div className="search-wrapper">
          <img
            className="search-icon"
            src={require("./images/149852.png")}
            alt="search-icon"
          />
          <input
            placeholder="Search"
            type="text"
            onChange={handleSearch}
            className="search"
            value={search}
          />
          {search.length > 0 ? (
            <img
              className="clear-icon"
              src={require("./images/3082404.png")}
              onClick={resetSearchField}
              alt="clear-icon"
            />
          ) : (
            ""
          )}
        </div> */}
        <div className="coin-watchlist-button-container">
          <Button className="coin-watchlist-button" onClick={showWatchList}>
            My Hodlings
          </Button>
          {/* <Button className="coin-watchlist-button" onClick={showTopCoins}>
            Top Coins
          </Button> */}
        </div>
      </div>
      <table className="table">
        <caption></caption>
        <CurrentHoldingsHead columns={columns} handleSorting={handleSorting} />
        <CurrentHoldingsBody
          columns={columns}
          tableData={tableData}
          inWatchList={inWatchList}
          // handleWatchListCheck={handleWatchListCheck}
        />
      </table>
    </>
  );
};

export default CurrentHoldings;