import api from "../../apiService";
import * as types from "../constants/user.constants";
import { toast } from "react-toastify";

const getAllUser = (pageNum) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_REQUEST });
    const res = await api.get(`/leads?page=${pageNum}&limit=100`);
    dispatch({
      type: types.GET_ALL_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_FAILURE, payload: error.message });
    toast.error(error.error);
  }
};

const createUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_NEW_REQUEST, payload: null });
    const res = await api.post(`/leads`, data);
    dispatch({
      type: types.CREATE_NEW_SUCCESS,
      payload: { data: res, status: "Create user" },
    });
    toast.success(res.data.status);
  } catch (error) {
    dispatch({ type: types.CREATE_NEW_FAILURE, payload: error.error });
    toast.error(error.error);
  }
};

const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_REQUEST, payload: null });
    const res = await api.delete(`/leads/${id}`);
    dispatch({
      type: types.DELETE_SUCCESS,
      payload: { data: res, status: "Delete user" },
    });
    toast.success(res.data.status);
  } catch (error) {
    dispatch({ type: types.DELETE_FAILURE, payload: error.message });
    toast.error(error.error);
  }
};

const updateUser = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_REQUEST, payload: null });
    const res = await api.put(`/mark_lead/${id}`, data);
    dispatch({
      type: types.UPDATE_SUCCESS,
      payload: { data: res, status: "Update user" },
    });
    toast.success(res.data.status);
  } catch (error) {
    dispatch({ type: types.UPDATE_FAILURE, payload: error.message });
    toast.error(error.error);
  }
};

export const userActions = {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
};
