// import { PayloadAction } from "@reduxjs/toolkit";
import filtersReducer, { FilterAction } from "./filtersSlice/filtersSlice";
import todosReducer, { TodoAction } from "./todosSlice/todosSlice";

// const initialState: AppState = {
//   todos: [
//     { id: 0, text: "Learn React", completed: true },
//     { id: 1, text: "Learn Redux", completed: false, color: "purple" },
//     { id: 2, text: "Build something fun!", completed: false, color: "blue" },
//   ],
//   filters: {
//     status: "All",
//     colors: [],
//   },
// };

// function nextTodoId(todos: Todo[]): number {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
//   return maxId + 1;
// }

// // Use the initialState as a default value
// export default function appReducer(state = initialState, action: AppAction) {
//   // The reducer normally looks at the action type field to decide what happens
//   switch (action.type) {
//     // Do something here based on the different types of actions
//     case "todos/todoAdded": {
//       // We need to return a new state object
//       return {
//         // that has all the existing state data
//         ...state,
//         // but has a new array for the `todos` field
//         todos: [
//           // with all of the old todos
//           ...state.todos,
//           // and the new todo object
//           {
//             // Use an auto-incrementing numeric ID for this example
//             id: nextTodoId(state.todos),
//             text: action.payload,
//             completed: false,
//           },
//         ],
//       };
//     }
//     case "todos/todoToggled": {
//       return {
//         // Again copy the entire state object
//         ...state,
//         // This time, we need to make a copy of the old todos array
//         todos: state.todos.map((todo) => {
//           // If this isn't the todo item we're looking for, leave it alone
//           if (todo.id !== action.payload) {
//             return todo;
//           }

//           // We've found the todo that has to change. Return a copy:
//           return {
//             ...todo,
//             // Flip the completed flag
//             completed: !todo.completed,
//           };
//         }),
//       };
//     }
//     case "filters/statusFilterChanged": {
//       return {
//         // Copy the whole state
//         ...state,
//         // Overwrite the filters value
//         filters: {
//           // copy the other filter fields
//           ...state.filters,
//           // And replace the status field with the new value
//           status: action.payload,
//         },
//       };
//     }
//     default:
//       // If this reducer doesn't recognize the action type, or doesn't
//       // care about this specific action, return the existing state unchanged
//       return state;
//   }
// }
export default function rootReducer(
  state: AppState /* = {} */,
  action: AppAction
) {
  // always return a new object for the root state
  return {
    // the value of `state.todos` is whatever the todos reducer returns
    todos: todosReducer(state.todos, action as TodoAction),
    // For both reducers, we only pass in their slice of the state
    filters: filtersReducer(state.filters, action as FilterAction),
  };
}

/* Types */
type AppState = {
  todos: Todo[];
  filters: {
    status: "All";
    colors: string[];
  };
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  color?: string; // Color is optional
};

// Action types
type AppAction =
  // | PayloadAction<string, "todos/todoAdded">
  // | PayloadAction<number, "todos/todoToggled">
  // | PayloadAction<string, "filters/statusFilterChanged">;
  TodoAction | FilterAction;
