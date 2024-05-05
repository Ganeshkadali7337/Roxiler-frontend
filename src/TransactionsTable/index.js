import "./index.css";

const TransactionTable = (props) => {
  const { data } = props;

  return (
    <div className="table-container">
      <table id="transactionsTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {data.map((each) => (
            <tr key={each.id}>
              <td>{each.id}</td>
              <td>{each.title}</td>
              <td>{each.description}</td>
              <td>{each.price}</td>
              <td>{each.category}</td>
              <td>{each.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
