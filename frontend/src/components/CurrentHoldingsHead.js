import { useState } from "react";

const CurrentHoldingsHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc")

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
   };

  return (
   <thead>
    <tr>
      <th></th>
      <th></th>
     {columns.map(({ label, accessor, sortable }) => {
           const cl = sortable
           ? sortField && sortField === accessor && order === "asc"
            ? "up"
            : sortField && sortField === accessor && order === "desc"
            ? "down"
            : "default"
           : "";
      return <th 
        key={accessor}
        onClick={sortable ? () => handleSortingChange(accessor) : null}
        className={cl}
        >
        {label}
        </th>;
     })}
     <th>Gain/Loss</th>
     <th>Unrealized P/L</th>
    </tr>
   </thead>
  );
 };
 
 export default CurrentHoldingsHead;