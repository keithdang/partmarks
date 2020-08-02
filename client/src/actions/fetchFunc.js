import axios from "axios";

export const fetchGet = ({ endpoint, FETCH_TYPE, SUCCESS_TYPE }) => async (
  dispatch
) => {
  dispatch({ type: FETCH_TYPE });
  const res = await axios.get(endpoint);
  dispatch({ type: SUCCESS_TYPE, payload: res.data });
};

export const fetchPost = ({
  endpoint,
  param,
  bodyPost,
  FETCH_TYPE,
  SUCCESS_TYPE,
}) => async (dispatch) => {
  dispatch({ type: FETCH_TYPE });
  console.log(bodyPost);
  const res = await axios({
    method: "post",
    url: endpoint,
    params: param,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
  dispatch({ type: SUCCESS_TYPE, payload: res.data });
};
