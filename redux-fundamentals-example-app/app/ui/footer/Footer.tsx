"use client";
import {
  AvailableColor,
  availableColors,
  capitalize,
} from "@/app/lib/redux/filtersSlice/colors";
import {
  FilterStatus,
  StatusFilters,
} from "@/app/lib/redux/filtersSlice/filtersSlice";
import { ReduxState } from "@/app/lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const RemainingTodos = ({ count }: { count: number }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

const StatusFilter = ({
  value: status,
  onChange,
}: {
  value: FilterStatus;
  onChange: (status: FilterStatus) => void;
}) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key as keyof typeof StatusFilters];
    const handleClick = () => onChange(value);
    const className = value === status ? "selected" : "";

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  );
};

const ColorFilters = ({
  value: colors,
  onChange,
}: {
  value: AvailableColor[];
  onChange: (color: AvailableColor, changeType: "added" | "removed") => void;
}) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    );
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  );
};

const Footer = () => {
  // const colors: AvailableColor[] = [];
  // const status = StatusFilters.All;
  // const todosRemaining = 1;
  const todosRemaining = useSelector((state: ReduxState) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed);
    return uncompletedTodos.length;
  });

  const { status, colors } = useSelector((state: ReduxState) => state.filters);

  const onColorChange = (
    color: AvailableColor,
    changeType: "added" | "removed"
  ) => console.log("Color change: ", { color, changeType });
  const onStatusChange = (status: FilterStatus) =>
    console.log("Status change: ", status);

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  );
};

export default Footer;
