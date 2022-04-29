function ProductTable(props) {
  const { products } = props;
  return (
    <table>
      <caption>Our products</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>In Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}