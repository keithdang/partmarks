import axios from "axios";

export const fetchGet = ({
  endpoint,
  FETCH_TYPE,
  SUCCESS_TYPE,
  param,
}) => async (dispatch) => {
  dispatch({ type: FETCH_TYPE });
  const res = await axios({
    method: "get",
    url: endpoint,
    params: param,
  });
  dispatch({ type: SUCCESS_TYPE, payload: res.data });
};

export const fetchPost = ({
  endpoint,
  param,
  bodyPost,
  FETCH_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE,
}) => async (dispatch) => {
  dispatch({ type: FETCH_TYPE });
  //   await axios({
  //     method: "post",
  //     url: endpoint,
  //     params: param,
  //     data: JSON.stringify(param),
  //     headers: { "Content-Type": "application/json; charset=UTF-8" },
  //     credentials: "include",
  //   })
  //     .then(({ res }) => {
  //       console.log(res);
  //       dispatch({ type: SUCCESS_TYPE, payload: res.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log(JSON.stringify(error));
  //       dispatch({ type: ERROR_TYPE, message: error.message });
  //     });
  // };
  try {
    const res = await axios({
      method: "post",
      url: endpoint,
      params: param,
      data: JSON.stringify(param),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      credentials: "include",
    });
    dispatch({ type: SUCCESS_TYPE, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR_TYPE, message: error.message });
  }
};
