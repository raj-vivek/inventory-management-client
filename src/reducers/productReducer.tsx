export const INITIAL_STATE = {
  name: "",
  buyPrice: "",
  mrp: "",
  colorAndSizes: [],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };

    case "ADD_COLOR": {
      // Check if there are any empty fields in the colorAndSize object

      const { color, sizes } = action.payload;
      const hasEmptyFields =
        color === "" ||
        Object.values(sizes).some((quantity) => {
          // @ts-ignore
          return quantity === "" || isNaN(quantity);
        });

      // If there are empty fields, don't add the colorAndSize
      if (hasEmptyFields) {
        alert("Enter empty feilds!");
        return state;
      }

      // Check if the color already exists in the array
      const colorExists = state.colorAndSizes.some(
        (existingColorAndSize: { color: string }) =>
          existingColorAndSize.color === color
      );

      if (colorExists) {
        // If the color already exists, return the state as it is
        alert("Enter a different color!");
        return state;
      }
      // If the color doesn't exist, add it to the array
      return {
        ...state,
        colorAndSizes: [...state.colorAndSizes, action.payload],
      };
    }

    case "REMOVE_COLOR":
      return {
        ...state,
        colorAndSizes: state.colorAndSizes.filter(
          (colorAndSize) => colorAndSize.color !== action.payload.color
        ),
      };

    case "RESET_FORM":
      return INITIAL_STATE;

    default:
      return state;
  }
};
