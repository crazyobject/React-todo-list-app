import React, { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import PushNotifier from "../util/PushNotifier";
import Favourite from "./Favourite";
import {
  BsCheckCircle,
  BsXCircle,
  BsFillCheckCircleFill,
  BsArrowClockwise,
} from "react-icons/bs";
import "./TodoItem.css";
import { toast } from "react-toastify";

// todo - bring this fom schema file
const validation = Yup.object({
  todoTitle: Yup.string().min(5).max(100).required("Task title is required"),
  key: Yup.number().required("key required"),
});

const TodoItem = (props) => {
  const { todo, deleteTodo, updateData, todoData } = props;
  const [mode, setMode] = useState("view");

  // formik and yup validation
  const initialValues = {
    todoTitle: todo.todoTitle,
    key: todo.key,
  };

  // complete the task
  const updateTaskStatus = (key, status) => {
    const updatedAfterStatusChange = todoData.map((todo) => {
      let obj =
        todo.key === key
          ? {
              ...todo,
              status: status,
            }
          : todo;
      return obj;
    });
    updateData(updatedAfterStatusChange);
    toast(`Task marked as ${status}`);
  };

  // add to favourite
  const updateFavouriteStatus = (key, status) => {
    const updatedAfterStatusChange = todoData.map((todo) => {
      let obj =
        todo.key === key
          ? {
              ...todo,
              favourite: status,
            }
          : todo;
      return obj;
    });
    updateData(updatedAfterStatusChange);
    const msg =
      status === "true"
        ? "Task added to favourites"
        : "Task removed from favourites";
    toast(msg);
  };

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues,
      validationSchema: validation,
      onSubmit: (values, action) => {
        const updatedTodo = todoData.map((todo) => {
          let obj =
            todo.key === values.key
              ? {
                  ...todo,
                  todoTitle: values.todoTitle,
                  dateTime: new Date().toLocaleString(),
                }
              : todo;
          return obj;
        });
        updateData(updatedTodo);
        setMode("view");
        toast("Task edited successfully!");
      },
    }
  );

  return (
    <>
      <PushNotifier />
      {todo.status === "complete" ? (
        <>
          <div className="itemContainer">
            <del>{todo.todoTitle}</del>
            <Favourite
              updateFavouriteStatus={updateFavouriteStatus}
              todo={todo}
            />
            <br />
            <small>{todo.dateTime}</small>
          </div>
        </>
      ) : (
        <>
          <div className="itemContainer">
            {mode === "view" ? (
              <>
                {todo.todoTitle}
                <Favourite
                  updateFavouriteStatus={updateFavouriteStatus}
                  todo={todo}
                />
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  name="todoTitle"
                  id="todoTitle"
                  className="form-control"
                  defaultValue={todo.todoTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input type="hidden" name="key" value={todo.key} />
                <BsXCircle
                  size={20}
                  style={{ color: "red", margin: "10px", cursor: "pointer" }}
                  onClick={() => {
                    setMode("view");
                  }}
                  title="Cancel"
                />
                <BsCheckCircle
                  size={20}
                  style={{
                    color: "green",
                    margin: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                  title="Save"
                />
                {errors.todoTitle && touched.todoTitle ? (
                  <small className="text-danger mt-1">{errors.todoTitle}</small>
                ) : null}
              </form>
            )}
            <br />
            <small>{todo.dateTime}</small>
          </div>
        </>
      )}
      <div class="d-flex justify-content-between">
        <div>
          {todo.status === "incomplete" ? (
            <BsFillCheckCircleFill
              className="custom-icons"
              size={20}
              style={{
                color: "blue",
                marginRight: "10px",
                cursor: "hand",
              }}
              title="Mark Task as complete"
              onClick={() => {
                updateTaskStatus(todo.key, "complete");
              }}
            />
          ) : (
            <BsArrowClockwise
              className="custom-icons"
              size={20}
              style={{
                color: "blue",
                marginRight: "10px",
                cursor: "hand",
              }}
              title="Bring back to in progress"
              onClick={() => {
                updateTaskStatus(todo.key, "incomplete");
              }}
            />
          )}
        </div>
        <div>
          <BsTrash
            className="icons-red custom-icons"
            size={20}
            style={{
              cursor: "hand",
            }}
            title="Delete todo"
            onClick={() => {
              deleteTodo(todo.key);
            }}
          />
        </div>
        <div>
          <BsPencilSquare
            className="icons-blue custom-icons"
            size={20}
            style={{ cursor: "hand" }}
            title={
              todo.status === "complete"
                ? "You can't edit completed task"
                : "Edit task"
            }
            onClick={() => {
              todo.status === "incomplete" ? setMode("edit") : void 0;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TodoItem;
