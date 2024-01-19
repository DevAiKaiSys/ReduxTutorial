import { PayloadAction } from "@reduxjs/toolkit";

const initialState: TodoSliceState = [
  { id: 0, text: "Learn React", completed: true },
  { id: 1, text: "Learn Redux", completed: false, color: "purple" },
  { id: 2, text: "Build something fun!", completed: false, color: "blue" },
];

function nextTodoId(todos: Todo[]): number {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function todosReducer(state = initialState, action: TodoAction) {
  switch (action.type) {
    case "todos/todoAdded": {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ];
    }
    case "todos/todoToggled": {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }
    default:
      return state;
  }
}

/* Types */
type TodoSliceState = Todo[];

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  color?: string; // Color is optional
};

// Action types
type TodoAction =
  | PayloadAction<string, "todos/todoAdded">
  | PayloadAction<number, "todos/todoToggled">;
