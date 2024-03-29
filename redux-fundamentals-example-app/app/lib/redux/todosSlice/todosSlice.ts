import { PayloadAction } from "@reduxjs/toolkit";

// const initialState: TodoSliceState = [
//   { id: 0, text: "Learn React", completed: true },
//   { id: 1, text: "Learn Redux", completed: false, color: "purple" },
//   { id: 2, text: "Build something fun!", completed: false, color: "blue" },
// ];
const initialState: TodoSliceState = [];

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
    case "todos/colorSelected": {
      const { color, todoId } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          color,
        };
      });
    }
    case "todos/todoDeleted": {
      return state.filter((todo) => todo.id !== action.payload);
    }
    case "todos/allCompleted": {
      return state.map((todo) => {
        return { ...todo, completed: true };
      });
    }
    case "todos/completedCleared": {
      return state.filter((todo) => !todo.completed);
    }
    default:
      return state;
  }
}

/* Types */
type TodoSliceState = Todo[];

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  color?: string; // Color is optional
};

// Action types
export type TodoAction =
  | PayloadAction<string, "todos/todoAdded">
  | PayloadAction<number, "todos/todoToggled">
  | PayloadAction<{ color: string; todoId: number }, "todos/colorSelected">
  | PayloadAction<number, "todos/todoDeleted">
  | PayloadAction<void, "todos/allCompleted">
  | PayloadAction<void, "todos/completedCleared">;
