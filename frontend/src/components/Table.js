import { useState } from "react";

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
      Developers currently enrolled in this course, column headers are
      sortable.
     </caption>
     <TableHead columns={columns} />
     <TableBody columns={columns} tableData={tableData} />
    </table>
   </>
  );
 };