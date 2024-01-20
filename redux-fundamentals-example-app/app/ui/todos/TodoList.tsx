import React from "react";
import TodoListItem from "./TodoListItem";
import { Todo } from "@/app/lib/redux/todosSlice/todosSlice";

const TodoList = () => {
  const todos: Todo[] = [];

  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
