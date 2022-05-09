import * as React from "react";
import { Table } from "./Table"

export default function Watchlist() {
  const watchlist = ['bitcoin', 'ethereum'];
  return (
    <div>
      <Table watchlist={watchlist}/>
    </div>
  );
}
