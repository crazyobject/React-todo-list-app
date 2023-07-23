import React, { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import PushNotifier from "../util/PushNotifier";
import {
  BsCheckCircle,
  BsXCircle,
  BsFillCheckCircleFill,
  BsArrowClockwise,
} from "react-icons/bs";
import "./TodoItem.css";

// todo - bring this fom schema file
const validation = Yup.object({
  todoTitle: Yup.string().min(5).max(100).required("Task title is required"),
  key: Yup.number().required("key required"),
});

const TodoItem = (props) => {
  const { todo, deleteTodo, updateData, todoData } = props;
  const [mode, setMode] = useState("view");
  const [notificationMsg, setNotificationMsg] = useState("");

  // notifier
  const [showNotifier, setShowNotifier] = useState(false);
  const toggleShowNotifier = () => setShowNotifier(!showNotifier);

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
    showMsg(`Task marked as ${status}`);
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
        showMsg("Task edited successfully!");
      },
    }
  );

  const showMsg = (text) => {
    setNotificationMsg(text);
    setShowNotifier(true);
  };

  return (
    <>
      <PushNotifier
        show={showNotifier}
        toggleShowNotifier={toggleShowNotifier}
        text={notificationMsg}
      />
      {todo.status === "complete" ? (
        <>
          <div className="itemContainer">
            <del>{todo.todoTitle}</del>
            <br />
            <small>{todo.dateTime}</small>
          </div>
        </>
      ) : (
        <>
          <div className="itemContainer">
            {mode === "view" ? (
              todo.todoTitle
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
                  style={{ color: "red", margin: "10px" }}
                  onClick={() => {
                    setMode("view");
                  }}
                />
                <BsCheckCircle
                  size={20}
                  style={{
                    color: "green",
                    margin: "10px",
                  }}
                  onClick={handleSubmit}
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
      <div>
        {todo.status === "incomplete" ? (
          <BsFillCheckCircleFill
            size={20}
            style={{
              color: "blue",
              margin: "10px",
              cursor: "hand",
            }}
            title="Mark Task as complete"
            onClick={() => {
              updateTaskStatus(todo.key, "complete");
            }}
          />
        ) : (
          <BsArrowClockwise
            size={20}
            style={{
              color: "blue",
              margin: "10px",
              cursor: "hand",
            }}
            title="Bring back to in progress"
            onClick={() => {
              updateTaskStatus(todo.key, "incomplete");
            }}
          />
        )}
        <BsTrash
          className="icons-red"
          size={20}
          style={{ cursor: "hand" }}
          title="Delete todo"
          onClick={() => {
            deleteTodo(todo.key);
          }}
        />
        <BsPencilSquare
          className="icons-blue"
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
    </>
  );
};

export default TodoItem;
