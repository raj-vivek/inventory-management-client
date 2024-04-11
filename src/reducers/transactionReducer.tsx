export const TRANSACTION_INITIAL_STATE = {
  productCode: "",
  sellPrice: "",
  units: 0,
  desc: "",
  phoneNo: "",
  colorAndSizes: {
    color: "select",
    sizes: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
      XXXXL: 0,
    },
  },
};

const transactionReducer = (
  state = TRANSACTION_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case "UPDATE_FIELD":
      return { ...state, ...payload };
    case "UPDATE_COLOR":
      return {
        ...state,
        colorAndSizes: { ...state.colorAndSizes, ...payload },
      };
    case "UPDATE_SIZE": {
      let updatedState = {
        ...state,
        colorAndSizes: {
          ...state.colorAndSizes,
          sizes: { ...state.colorAndSizes.sizes, ...payload },
        },
      };
      updatedState.units = Object.entries(
        updatedState.colorAndSizes.sizes
      ).reduce(
        (accumulator, [size, quantity]) =>
          Number(accumulator) + Number(quantity),
        0
      );
      return updatedState;
    }
    default:
      return state;
  }
};

export default transactionReducer;
