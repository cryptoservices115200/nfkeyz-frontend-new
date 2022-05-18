import { createStore } from "redux";

const initialState = {
  adress: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ADDRESS": {
      return {
        address: [...state.adress, ...action.payload],
      };
    }
    case "REMOVE_ADDRESS": {
      return {
        ...state,
        address: state.address.filter((ad) => ad === action.payload),
      };
    }

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
