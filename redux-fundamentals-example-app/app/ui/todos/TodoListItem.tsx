"use client";
import {
  availableColors,
  capitalize,
} from "@/app/lib/redux/filtersSlice/colors";
import React from "react";
// import { ReactComponent as TimesSolid } from "./times-solid.svg"; // error
import Image from "next/image";
import svgTimesSolid from "./times-solid.svg";
import { ReduxState } from "@/app/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";

// type Props = {
//   todo: Todo;
//   onColorChange?: (color: string) => void;
//   onCompletedChange?: (completed: boolean) => void;
//   onDelete?: () => void;
// };

// const TodoListItem = ({
//   todo,
//   onColorChange,
//   onCompletedChange,
//   onDelete,
// }: Props) => {
//   const { text, completed, color } = todo;

//   const handleCompletedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onCompletedChange && onCompletedChange(e.target.checked);
//   };

//   const handleColorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     onColorChange && onColorChange(e.target.value);
//   };

//   const colorOptions = availableColors.map((c) => (
//     <option key={c} value={c}>
//       {capitalize(c)}
//     </option>
//   ));

//   return (
//     <li>
//       <div className="view">
//         <div className="segment label">
//           <input
//             className="toggle"
//             type="checkbox"
//             checked={completed}
//             onChange={handleCompletedChanged}
//           />
//           <div className="todo-text">{text}</div>
//         </div>
//         <div className="segment buttons">
//           <select
//             className="colorPicker"
//             value={color}
//             style={{ color }}
//             onChange={handleColorChanged}
//           >
//             <option value=""></option>
//             {colorOptions}
//           </select>
//           <button className="destroy" onClick={onDelete}>
//             {/* <TimesSolid /> */}
//             <Image src={svgTimesSolid} alt="times-solid" />
//           </button>
//         </div>
//       </div>
//     </li>
//   );
// };

const selectTodoById = (state: ReduxState, todoId: number) => {
  return state.todos.find((todo) => todo.id === todoId);
};

type Props = { id: number };

// Destructure `props.id`, since we just need the ID value
const TodoListItem = ({ id }: Props) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state: ReduxState) => selectTodoById(state, id));

  if (!todo) {
    return null; // Return early if todo is not found
  }

  const { text, completed, color } = todo;

  // const handleColorChanged = () => {};
  // const onDelete = () => {};
  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch({ type: "todos/todoToggled", payload: todo.id });
  };

  const handleColorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const color = e.target.value;
    dispatch({
      type: "todos/colorSelected",
      payload: { todoId: todo.id, color },
    });
  };

  const onDelete = () => {
    dispatch({ type: "todos/todoDeleted", payload: todo.id });
  };

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ));
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button
            className="destroy"
            onClick={onDelete}
            style={{
              alignItems: "center",
              padding: "0px",
              marginBottom: "0px",
            }}
          >
            <Image
              src={svgTimesSolid}
              alt="times-solid"
              width={21}
              height={30}
            />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
