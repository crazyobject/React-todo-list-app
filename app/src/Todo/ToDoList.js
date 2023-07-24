import React, { useState } from "react";
import PushNotifier from "../util/PushNotifier";
import "./ToDoList.css";
import TodoItem from "./TodoItem";
import { toast } from "react-toastify";

const ToDoList = (props) => {
  const { filteredData, updateData, todoData } = props;

  const deleteTodo = (todoId) => {
    const afterDeleting = filteredData.filter((todo) => todo.key !== todoId);
    updateData(afterDeleting);
    toast("Task deleted successfully!");
  };

  return (
    <>
      <PushNotifier />
      <div class="container listContainer">
        <div class="row">
          <div class="add-item text-center">
            <ul id="list" class="list-group">
              {filteredData.length ? (
                filteredData.map((todo) => {
                  return (
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center"
                      key={todo.key}
                    >
                      <TodoItem
                        todo={todo}
                        deleteTodo={deleteTodo}
                        updateData={updateData}
                        todoData={todoData}
                      />
                    </li>
                  );
                })
              ) : (
                <li class="list-group-item">No To do yet</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
