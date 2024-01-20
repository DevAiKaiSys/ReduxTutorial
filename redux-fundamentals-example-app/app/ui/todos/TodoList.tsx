"use client";
import React from "react";
import TodoListItem from "./TodoListItem";
import { useSelector } from "react-redux";

const selectTodos = (state: any) => state.todos;

const TodoList = () => {
  // const todos: Todo[] = [];
  const todos: any[] = useSelector(selectTodos);

  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
