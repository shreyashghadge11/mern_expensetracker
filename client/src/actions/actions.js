import axios from "axios";
import {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  GET_EXPENSE,
  SET_ERRORS,
  LOADING,
} from "./type";

export const addexpense = (postData) => (dispatch) => {
  axios
    .post("/api/insert", postData)
    .then((res) => {
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(seterrors(err));
      //dispatch(togglePostLoading());
    });
};

export const deleteexpense = (id) => (dispatch) => {
  axios
    .delete(`/api/delete/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_EXPENSE,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch(seterrors(err));
      //dispatch(togglePostLoading());
    });
};

export const updateexpense = (id, postData) => (dispatch) => {
  axios
    .patch(`/api/update/${id}`, postData)
    .then((res) => {
      dispatch({
        type: UPDATE_EXPENSE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      //dispatch(togglePostLoading());
    });
};
export const getexpense = (month) => (dispatch) => {
  // dispatch(toggleloading());
  axios
    .get(`/api/getall/${month}`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: GET_EXPENSE,
        payload: res.data,
      });
      //dispatch(toggleloading());
    })
    .catch((err) => {
      dispatch(seterrors(err.response.data));
      dispatch(toggleloading());
    });
};

export const seterrors = (error) => {
  return {
    type: SET_ERRORS,
    payload: error,
  };
};

export const toggleloading = () => {
  return {
    type: LOADING,
  };
};
