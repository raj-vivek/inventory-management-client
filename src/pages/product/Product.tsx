import { useReducer, useState } from "react";
import "./Product.scss";
import { useMutation } from "@tanstack/react-query";
import newAxiosRequest from "../../utils/newAxiosRequest";
import DisplayProduct from "../../components/displayProduct/DisplayProduct";
import transactionReducer, {
  TRANSACTION_INITIAL_STATE,
} from "../../reducers/transactionReducer";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
  const [code, setCode] = useState("");
  const [option, setOption] = useState("none");

  const [transactionState, dispatch] = useReducer(
    transactionReducer,
    TRANSACTION_INITIAL_STATE
  );

  const navigate = useNavigate();

  console.log(transactionState.colorAndSizes.color);

  const mutation = useMutation({
    mutationFn: () => {
      return newAxiosRequest.get(`/products/${code}`).then((res) => res.data);
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch({
        type: "UPDATE_FIELD",
        payload: { productCode: data.code },
      });
    },
  });

  const handleProductCodeSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const checkMax = (e) => {
    if (!isNaN(e.target.value) && e.target.value > e.target.max) {
      e.target.value = e.target.max;
    }
  };

  const transactionSubmitMutation = useMutation({
    mutationFn: () => {
      return newAxiosRequest
        .post("/transactions", transactionState)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/addtransactionsuccess", { state: { responseData: data } });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transactionState);
    transactionSubmitMutation.mutate();
  };

  return (
    <div className="addTransaction">
      <div className="container">
        <h2>View Product</h2>
        <form className="form" onSubmit={handleProductCodeSubmit}>
          <label htmlFor="">Product Code: </label>
          <input
            type="text"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button type="submit">Search</button>
        </form>

        {mutation.isIdle ? (
          ""
        ) : mutation.isPending ? (
          "Loading"
        ) : mutation.isError ? (
          "Something went wrong!"
        ) : (
          <div className="product">
            <DisplayProduct product={mutation.data} />

            <div className="optionButtons">
              <button onClick={() => setOption("showTransaction")}>
                Show Transactions
              </button>
              <button onClick={() => setOption("addTransaction")}>
                Add Transaction
              </button>
            </div>

            {option == "none" ? (
              ""
            ) : option == "addTransaction" ? (
              <form className="transactionForm" onSubmit={handleSubmit}>
                <div className="code">
                  <label htmlFor="code">Product Code - </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={transactionState.productCode}
                    disabled
                  />
                </div>
                <div className="desc">
                  <label htmlFor="desc">Description - </label>
                  <textarea
                    name="desc"
                    id="desc"
                    cols={50}
                    rows={4}
                    value={transactionState.desc}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        payload: {
                          desc: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="sellPrice">
                  <label htmlFor="sellPrice">Sell Price - </label>
                  <input
                    type="number"
                    id="sellPrice"
                    name="sellPrice"
                    value={transactionState.sellPrice}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        payload: {
                          sellPrice: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="phoneNo">
                  <label htmlFor="phoneNo">Phone no - </label>
                  <input
                    type="number"
                    id="phoneNo"
                    name="phoneNo"
                    value={transactionState.phoneNo}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        payload: {
                          phoneNo: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="colorSelect">
                  <label htmlFor="color">Color - </label>
                  <select
                    name="colors"
                    id="colors"
                    value={transactionState.color}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_COLOR",
                        payload: {
                          color: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="select">Select Color</option>
                    {mutation.data.colorAndSizes.map((colorAndSize, index) => (
                      <option value={colorAndSize.color} key={index}>
                        {colorAndSize.color}
                      </option>
                    ))}
                  </select>
                </div>
                {transactionState.colorAndSizes.color != "select" && (
                  <div className="units">
                    <label htmlFor="units">Total units - </label>
                    <input
                      type="number"
                      name="units"
                      id="units"
                      value={transactionState.units}
                      disabled
                    />
                  </div>
                )}
                {transactionState.colorAndSizes.color != "select" &&
                  mutation.data.colorAndSizes
                    .filter(
                      (colorAndSize) =>
                        colorAndSize.color ==
                        transactionState.colorAndSizes.color
                    )
                    .map((colorAndSize, index) => (
                      <div className="sizes" key={index}>
                        {Object.entries(colorAndSize.sizes).map(
                          ([size, quantity], index) => (
                            <div className="size" key={index}>
                              <label htmlFor={size}>
                                {size} - {" ".repeat(5 - size.length)}
                              </label>
                              <input
                                type="number"
                                name={size}
                                id={size}
                                // @ts-ignore
                                max={quantity}
                                onInput={checkMax}
                                value={
                                  transactionState.colorAndSizes.sizes[size]
                                }
                                onChange={(e) =>
                                  dispatch({
                                    type: "UPDATE_SIZE",
                                    payload: { [size]: e.target.value },
                                  })
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    ))}
                <button type="submit">Submit</button>
              </form>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTransaction;
