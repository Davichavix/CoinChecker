import { useState, useEffect } from "react";
import axios from 'axios';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import './Table.css';

const Table = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h')
    .then(res => {
      setTableData(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
 
  const columns = [
   { label: "Coin Name", accessor: "id", sortable: true },
   { label: "Symbol", accessor: "symbol", sortable: false },
   { label: "Price", accessor: "current_price", sortable: false },
   { label: "Market Cap", accessor: "market_cap", sortable: true },
   { label: "% Move", accessor: "price_change_percentage_24h", sortable: true },
   { label: "Volume (24h)", accessor: "total_volume", sortable: true },
  ];
 
  return (
   <>
    <table className="table">
     <caption>
      Cryptocurrency
     </caption>
     <TableHead columns={columns} />
     <TableBody columns={columns} tableData={tableData} />
    </table>
   </>
  );
 };

 export default Table;