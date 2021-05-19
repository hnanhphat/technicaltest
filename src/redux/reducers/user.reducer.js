import * as types from "../constants/user.constants";

const initialState = {
  users: [],
  loading: false,
  status: "",
  error: "",
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_REQUEST:
    case types.CREATE_NEW_REQUEST:
    case types.DELETE_REQUEST:
    case types.UPDATE_REQUEST:
      state.loading = true;
      break;
    case types.GET_ALL_FAILURE:
    case types.CREATE_NEW_FAILURE:
    case types.DELETE_FAILURE:
    case types.UPDATE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.GET_ALL_SUCCESS:
      state.users = payload;
      state.loading = false;
      break;
    case types.CREATE_NEW_SUCCESS:
    case types.DELETE_SUCCESS:
    case types.UPDATE_SUCCESS:
      state.status = payload.status;
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default userReducer;
