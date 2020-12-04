import {
  FETCH_LIST_ITEM,
  ADD_ITEM,
  REMOVE_ITEM,
  IS_LOADING,
  UPDATE_ERROR,
  UPDATE_LIST_PROP,
} from "../../types";
import { spliceArray } from "../../../utils";

const listItemAction = (payload) => {
  return { type: FETCH_LIST_ITEM, payload };
};

export const addItemAction = (payload) => {
  return { type: ADD_ITEM, payload };
};

export const removeItemAction = (payload) => {
  return { type: REMOVE_ITEM, payload };
};

const isLoadingAction = (payload) => {
  return { type: IS_LOADING, payload };
};

const updateErrorAction = (payload) => {
  return { type: UPDATE_ERROR, payload };
};

// const updateListItemInfoAction = (payload) => {
//   return { type: UPDATE_LIST_PROP, payload };
// };

export const fetchListItem = (page) => (dispatch) => {
  dispatch(isLoadingAction({ isLoading: true }));
  dispatch(updateErrorAction({ error: "" }));

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((response) => {
      const listItem = spliceArray(response, page, 10);

      dispatch(listItemAction({ listItem }));
      dispatch(updateErrorAction({ error: "" }));
      dispatch(isLoadingAction({ isLoading: false }));
    })
    .catch((error) => {
      dispatch(updateErrorAction({ error }));
      dispatch(isLoadingAction({ isLoading: false }));
    });
};
