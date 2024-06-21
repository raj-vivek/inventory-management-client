import { useLocation } from "react-router-dom";
import "./AddProductSuccess.scss";

function AddProductSuccess() {
  const location = useLocation();

  // Extract state from the location object
  const { state } = location;

  // Access specific data from the state if it exists
  const { responseData } = state;

  return (
    <div className="addProductSuccess">
      <div className="container">
        {responseData ? (
          <div className="productData">
            <h2>Your Product Code is</h2>
            <div className="code">{responseData.code}</div>
            <h3>Product Details:</h3>
            <div className="productDetails">
              <div className="name">
                <span className="label">Name - </span> {responseData.name}
              </div>
              <div className="buyPrice">
                <span className="label">Buy Price - </span>
                {responseData.buyPrice}
              </div>
              <div className="mrp">
                <span className="label">MRP - </span>
                {responseData.mrp}
              </div>
              <div className="colorAndSizes">
                {responseData.colorAndSizes.map((colorAndSize) => (
                  <div className="colorAndSize">
                    <span className="label">Color - </span>
                    {colorAndSize.color}
                    <div className="sizes">
                      {Object.entries(colorAndSize.sizes).map(
                        ([size, quantity]) => (
                          <div className="size">
                            {/* @ts-ignore */}
                            <span className="label">{size}</span> {quantity}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No response data available</p>
        )}
      </div>
    </div>
  );
}

export default AddProductSuccess;
