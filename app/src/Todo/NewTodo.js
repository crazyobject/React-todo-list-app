import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsPlusSquareFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import PushNotifier from "../util/PushNotifier";
import { toast } from "react-toastify";

const initialValues = {
  todoTitle: "",
};

const validation = Yup.object({
  todoTitle: Yup.string().min(5).max(100).required("todo is required"),
});

const NewTodo = (props) => {
  const { todoData, updateData } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveNewTodo = (newTodoTitle) => {
    let nextKey = todoData.length > 0 ? todoData[0].key + 1 : 1;
    const dateTime = new Date().toLocaleString();
    const updatedToDo = [
      {
        key: nextKey,
        todoTitle: newTodoTitle,
        dateTime: dateTime,
        status: "incomplete",
        favourite: "false",
      },
      ...todoData,
    ];
    updateData(updatedToDo);
    toast("Task added to the list!");
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validation,
      onSubmit: (values, action) => {
        saveNewTodo(values.todoTitle);
        action.resetForm();
        handleClose();
      },
    });

  return (
    <>
      <PushNotifier />
      <BsPlusSquareFill
        size={30}
        color={"blue"}
        onClick={handleShow}
        style={{ cursor: "hand" }}
        title="Create new todo"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col text-left">
                <label htmlFor="todoTitle" className="form-label">
                  Todo Title
                </label>
                <input
                  id="todoTitle"
                  name="todoTitle"
                  className="form-control"
                  value={values.todoTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.todoTitle && touched.todoTitle ? (
                  <small className="text-danger mt-1">{errors.todoTitle}</small>
                ) : null}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewTodo;
