"use client";
import React from "react";
import TodoListItem from "./TodoListItem";
import { useSelector } from "react-redux";
import { ReduxState } from "@/app/lib/redux/store";

// const selectTodos = (state: ReduxState) => state.todos;
const selectTodoIds = (state: ReduxState) => state.todos.map((todo) => todo.id);

const TodoList = () => {
  // const todos: Todo[] = [];
  // const todos = useSelector(selectTodos);

  // const renderedListItems = todos.map((todo) => {
  //   return <TodoListItem key={todo.id} todo={todo} />;
  // });
  const todoIds = useSelector(selectTodoIds);

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
