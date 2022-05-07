const TableBody = ({ tableData, columns }) => {
  const setPriceColor = (data) => {
    const priceChange = data["price_change_percentage_24h"];
    return priceChange <= 0 ? "percent-change-red" : "percent-change-green";
  };

  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            <td key="image">
              <img className="coin-img" src={data["image"]} alt="coin"></img>
            </td>
            <td className="coin-name" key="name">{data["name"]}</td>
            <td className="coin-symbol" key="symbol">{data["symbol"]}</td>
            <td key="price">${data["current_price"]}</td>
            <td key="market-cap">
              ${(data["market_cap"] / 1000000000).toFixed(2)}B
            </td>
            <td key="percent-move">
              <div className="percent-move">
                <div className={setPriceColor(data)}>
                  {data["price_change_percentage_24h"].toFixed(2)}%
                </div>
              </div>
            </td>
            <td key="total-volume">
              ${(data["total_volume"] / 1000000000).toFixed(2)}B
            </td>
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
