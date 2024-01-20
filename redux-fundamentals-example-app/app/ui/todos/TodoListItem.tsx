"use client";
import {
  availableColors,
  capitalize,
} from "@/app/lib/redux/filtersSlice/colors";
import React from "react";
import { Todo } from "@/app/lib/redux/todosSlice/todosSlice";
// import { ReactComponent as TimesSolid } from "./times-solid.svg"; // error
import Image from "next/image";
import svgTimesSolid from "./times-solid.svg";

type Props = {
  todo: Todo;
  onColorChange?: (color: string) => void;
  onCompletedChange?: (completed: boolean) => void;
  onDelete?: () => void;
};

const TodoListItem = ({
  todo,
  onColorChange,
  onCompletedChange,
  onDelete,
}: Props) => {
  const { text, completed, color } = todo;

  const handleCompletedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompletedChange && onCompletedChange(e.target.checked);
  };

  const handleColorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onColorChange && onColorChange(e.target.value);
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
          <button className="destroy" onClick={onDelete}>
            {/* <TimesSolid /> */}
            <Image src={svgTimesSolid} alt="times-solid" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
