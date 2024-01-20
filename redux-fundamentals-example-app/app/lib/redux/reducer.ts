import { combineReducers, Reducer } from "redux";
import filtersReducer from "./filtersSlice/filtersSlice";
import todosReducer from "./todosSlice/todosSlice";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducer;
