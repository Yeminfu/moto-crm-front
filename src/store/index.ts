export const store = (
  state = "initialState",
  action: { type: any; filter: any }
) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return Object.assign({}, state, {
        visibilityFilter: action.filter,
      });
    default:
      return state;
  }
};
