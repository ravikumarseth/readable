import { GET_ALL_CATEGORIES } from "./../actions";

const defaultState = [];
const categories = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return defaultState.concat(action.categories);
    default:
      return state;
  }
};

export default categories;
