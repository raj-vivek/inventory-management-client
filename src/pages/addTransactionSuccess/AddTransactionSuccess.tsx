import { useLocation } from "react-router-dom";
import "./AddTransactionSuccess.scss";
import DisplayProduct from "../../components/displayProduct/DisplayProduct";
import DisplayTransaction from "../../components/displayTransaction/DisplayTransaction";

function AddTransactionSuccess() {
  const location = useLocation();

  // Extract state from the location object
  const { state } = location;

  // Access specific data from the state if it exists
  const { responseData } = state;

  return (
    <div className="addTransactionSuccess">
      <div className="container">
        <div className="box">
          <h2>Transaction Saved Successfully!</h2>
          <h3>Transaction -</h3>
          <DisplayTransaction transaction={responseData.transaction} />
          <h3>Updated Product - </h3>
          <DisplayProduct product={responseData.product} />
        </div>
      </div>
    </div>
  );
}

export default AddTransactionSuccess;
