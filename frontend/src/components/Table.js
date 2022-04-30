import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
  const [tableData, setTableData] = useState(mockdata);
 
  const columns = [
   { label: "Coin Name", accessor: "coin_name", sortable: true },
   { label: "Price", accessor: "price", sortable: false },
   { label: "Market Cap", accessor: "market_cap", sortable: true },
   { label: "% Move", accessor: "%_move", sortable: true },
   { label: "Volume (24h)", accessor: "volume_24h", sortable: true },
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