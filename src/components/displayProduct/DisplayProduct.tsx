import "./DisplayProduct.scss";
import PropTypes from "prop-types";

function DisplayProduct(props) {
  const product = props.product;

  return (
    <>
      {product && (
        <div className="displayProduct">
          <div className="details">
            <div className="name">
              <span className="label">Name - </span> {product.name}
            </div>
            <div className="code">
              <span className="label">Code - </span> {product.code}
            </div>
            <div className="buyPrice">
              <span className="label">Buy Price - </span>
              {product.buyPrice}
            </div>
            <div className="mrp">
              <span className="label">MRP - </span>
              {product.mrp}
            </div>
          </div>
          <div className="colorAndSizes">
            {product.colorAndSizes.map((colorAndSize, index) => (
              <div className="colorAndSize" key={index}>
                <div className="color">
                  <span className="label">Color - </span>
                  {colorAndSize.color}
                </div>
                <div className="sizes">
                  {Object.entries(colorAndSize.sizes).map(
                    ([size, quantity], index) => (
                      <div className="size" key={index}>
                        <span className="label">{size}</span> {quantity}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

DisplayProduct.propTypes = {
  product: PropTypes.any,
};

export default DisplayProduct;
