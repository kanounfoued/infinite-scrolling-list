import { combineReducers } from "redux";
import listItemReducer from "../listItem";

const root = combineReducers({
  listItems: listItemReducer,
});
export default root;
