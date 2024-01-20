"use client";
import React from "react";
import TodoListItem from "./TodoListItem";
import { useSelector } from "react-redux";
import { ReduxState } from "@/app/lib/redux/store";

const selectTodos = (state: ReduxState) => state.todos;

const TodoList = () => {
  // const todos: Todo[] = [];
  const todos = useSelector(selectTodos);

  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
