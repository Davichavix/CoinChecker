import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

import "./Search.css";
import "./Table.css";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
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
        setTableData(res.data);
        setOriginalList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .get(`/api/users/${userInfo._id}/watchlist`, config)
      .then((res) => {
        const watchListObj = {};
        for (const coin of res.data[0]["coins"]) {
          watchListObj[coin["id"]] = true;
        }
        setInWatchList(watchListObj);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { label: "Coin Name", accessor: "name", sortable: true },
    { label: "Symbol", accessor: "symbol", sortable: false },
    { label: "Price", accessor: "current_price", sortable: true },
    { label: "Market Cap", accessor: "market_cap", sortable: true },
    {
      label: "% Move",
      accessor: "price_change_percentage_24h",
      sortable: true,
    },
    { label: "Volume (24h)", accessor: "total_volume", sortable: true },
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

  const handleSearch = (e) => {
    const searchCoin = e.target.value;
    setSearch(searchCoin);
  };

  const resetSearchField = () => {
    setSearch("");
  };

  useEffect(() => {
    const filteredData = originalList.filter((coin) => {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    });
    setTableData(filteredData);
  }, [search]);

  const showWatchList = () => {
    const filteredData = originalList.filter((coin) => {
      return inWatchList[coin.id];
    });
    setTableData(filteredData);
  };

  const showTopCoins = () => {
    setTableData(originalList);
  };

  const handleWatchListCheck = (currency) => {
    //  Update check watchlist.
    const name = currency.name;
    const id = currency.id;
    const newInWatchList = { ...inWatchList };
    // 1. Grab the symbol and make a post request to update db.
    if (!newInWatchList[id]) {
      newInWatchList[id] = true;
      //post add to watchlist
    } else {
      delete newInWatchList[id];
      //delete to watchlist
    }
    setInWatchList(newInWatchList);
  };

  return (
    <>
      <div className="wrapper">
        <div className="search-wrapper">
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
        </div>
        <div className="coin-watchlist-button-container">
          <Button className="coin-watchlist-button" onClick={showWatchList}>
            My WatchList
          </Button>
          <Button className="coin-watchlist-button" onClick={showTopCoins}>
            Top Coins
          </Button>
        </div>
      </div>
      <table className="table">
        <caption></caption>
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody
          columns={columns}
          tableData={tableData}
          inWatchList={inWatchList}
          handleWatchListCheck={handleWatchListCheck}
        />
      </table>
    </>
  );
};

export default Table;
