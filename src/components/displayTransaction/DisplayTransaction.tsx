import "./DisplayTransaction.scss";
import PropTypes from "prop-types";

function DisplayTransaction(props) {
  const transaction = props.transaction;

  return (
    <>
      {transaction && (
        <div className="displayTransaction">
          <div className="details">
            <div className="productCode">
              <span className="label"> Product Code - </span>{" "}
              {transaction.productCode}
            </div>
            <div className="sellPrice">
              <span className="label">Sell Price - </span>
              {transaction.sellPrice}
            </div>
            <div className="units">
              <span className="label">units - </span>
              {transaction.units}
            </div>
            <div className="desc">
              <span className="label">Description - </span>
              {transaction.desc}
            </div>
            <div className="phoneNo">
              <span className="label">Phone No - </span>
              {transaction.phoneNo}
            </div>
          </div>
          <div className="colorAndSizes">
            <div className="color">
              <span className="label">Color - </span>
              {transaction.colorAndSizes.color}
            </div>
            <div className="sizes">
              {Object.entries(transaction.colorAndSizes.sizes).map(
                ([size, quantity], index) => (
                  <div className="size" key={index}>
                    {/* @ts-ignore */}
                    <span className="label">{size}</span> {quantity}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

DisplayTransaction.propTypes = {
  transaction: PropTypes.any,
};

export default DisplayTransaction;
