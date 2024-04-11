import { useReducer, useState } from "react";
import "./AddProduct.scss";
import { INITIAL_STATE, productReducer } from "../../reducers/productReducer";
import { useMutation } from "@tanstack/react-query";
import newAxiosRequest from "../../utils/newAxiosRequest";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
  const [colorAndSizeInput, setColorAndSizeInput] = useState({
    color: "",
    sizes: {
      S: "",
      M: "",
      L: "",
      XL: "",
      XXL: "",
      XXXL: "",
      XXXXL: "",
    },
  });

  // console.log(colorAndSizeInput);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (product) => {
      return newAxiosRequest.post("/products", product);
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      navigate("/addproductsuccess", { state: { responseData: data.data } });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      state.name === "" ||
      state.buyPrice === "" ||
      state.mrp === "" ||
      state.colorAndSizes.length == 0
    ) {
      alert("You are missing details! Please fill the missing details");
      return;
    }

    console.log("Form submitted:", state);

    try {
      mutation.mutate(state);
    } catch (error) {
      console.error("Mutation error:", error);
    }
    // dispatch({ type: "RESET_FORM" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", payload: { field: name, value } });
  };

  const handleAddColorAndSize = () => {
    dispatch({ type: "ADD_COLOR", payload: colorAndSizeInput });
  };

  const handleColorInputChange = (e) => {
    const { value } = e.target;
    setColorAndSizeInput((prevState) => ({
      ...prevState,
      color: value,
    }));
  };

  const handleSizeInputChange = (size: string, value: number) => {
    setColorAndSizeInput((prevState) => ({
      ...prevState,
      sizes: {
        ...prevState.sizes,
        [size]: value,
      },
    }));
  };

  const { name, buyPrice, mrp, colorAndSizes } = state;

  return (
    <div className="addProduct">
      <div className="container">
        <div className="form">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <label htmlFor="buyPrice">Buy Price: </label>
            <input
              type="number"
              name="buyPrice"
              value={buyPrice}
              onChange={handleInputChange}
            />
            <label htmlFor="mrp">MRP: </label>
            <input
              type="number"
              name="mrp"
              value={mrp}
              onChange={handleInputChange}
            />
            Colors:
            <div className="colorAndSize">
              <div className="color">
                <label htmlFor="color">Color: </label>
                <input
                  type="text"
                  name="color"
                  value={colorAndSizeInput.color}
                  onChange={handleColorInputChange}
                />
              </div>
              <div className="sizes">
                {Object.entries(colorAndSizeInput.sizes).map(
                  ([size, quantity]) => (
                    <div className="size" key={size}>
                      <label htmlFor={size}>{size}: </label>
                      <input
                        type="number"
                        name={size}
                        id={size}
                        min={0}
                        value={quantity}
                        onChange={(e) =>
                          handleSizeInputChange(size, parseInt(e.target.value))
                        }
                      />
                    </div>
                  )
                )}
              </div>
              <button type="button" onClick={handleAddColorAndSize}>
                Add Color
              </button>
            </div>
            {/* Colors and Sizes */}
            <div className="colorAndSizes">
              {colorAndSizes.map((colorAndSize) => (
                <div className="colorAndSize" key={colorAndSize}>
                  <div className="firstSection">
                    <div className="color">
                      <label htmlFor="color">Color: </label>
                      <input
                        type="text"
                        name="color"
                        value={colorAndSize.color}
                        disabled
                      />
                    </div>

                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_COLOR",
                          payload: colorAndSize,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <div className="sizes">
                    {Object.entries(colorAndSize.sizes).map(
                      ([size, quantity]) => (
                        <div className="size" key={size}>
                          <label htmlFor={size}>{size}: </label>
                          <input
                            type="number"
                            name={size}
                            id={size}
                            value={quantity}
                            disabled
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
