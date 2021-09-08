import { SET_USER_INFO } from "./action";

let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
const initState = {
  userInfo,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return Object.assign({}, state, { userInfo: action.userInfo });
    default:
      return state;
  }
}

export default reducer;
