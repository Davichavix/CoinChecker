const TableBody = ({ tableData, columns }) => {
  return (
   <tbody>
    {tableData.map((data) => {
     return (
      <tr key={data.id}>
        <td key='image'><img src={data["image"]} alt = 'coin'></img></td>
        <td key='name'>{data['name']}</td>
        <td key='symbol'>{data['symbol']}</td>
        <td key='price'>{data['current_price']}</td>
        <td key='market-cap'>{(data['market_cap']/1000000000).toFixed(2)}B</td>
        <td key='percent-move'>{data['price_change_percentage_24h']}</td>
        <td key='total-volume'>{data['total_volume']}</td>
       {/* {columns.map(({ accessor }) => {
        const tData = data[accessor] ? data[accessor] : "——";
        return <td key={accessor}>{tData}</td>;
       })} */}
      </tr>
     );
    })}
   </tbody>
  );
 };

 export default TableBody;