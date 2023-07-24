import React, { useEffect, useState } from "react";
import "./ToDo.css";
import Dropdown from "react-bootstrap/Dropdown";
import NewTodo from "./NewTodo";
import ToDoList from "./ToDoList";

const ToDoContainer = () => {
  const initialData = function () {
    const dataFromLocalStore = localStorage.getItem("todoData");

    return dataFromLocalStore ? JSON.parse(dataFromLocalStore) : [];
  };
  const [todoData, setToDoData] = useState(initialData);
  const [filterState, setFilterState] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  const updateData = (newDataToReplace) => {
    setToDoData(newDataToReplace);
    localStorage.setItem("todoData", JSON.stringify(newDataToReplace));
  };

  useEffect(() => {
    let filteredTodo;

    if (filterState === "favourite") {
      filteredTodo = todoData.filter((todo) => {
        return todo.favourite === "true";
      });
    } else {
      if (filterState === "all") {
        filteredTodo = todoData;
      } else {
        filteredTodo = todoData.filter((todo) => {
          return todo.status === filterState;
        });
      }
    }
    setFilteredData(filteredTodo);
  }, [filterState, todoData]);

  return (
    <div>
      <section
        class="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div class="row">
          <div class="col-12">
            <div class="card text-black" style={{ borderRadius: "25px" }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-10 order-2 order-lg-1">
                    <div className="buttonContainer">
                      <div class="d-flex justify-content-between">
                        <div>
                          <NewTodo
                            todoData={todoData}
                            updateData={updateData}
                          />
                        </div>
                        <div>
                          <p class="text-center h2 fw-bold">
                            <div className="containerTitle">
                              Todo List - {filterState} ({filteredData.length})
                            </div>
                          </p>
                        </div>
                        <div>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="primary"
                              id="dropdown-basic"
                            >
                              Status
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                href="#/action-1"
                                onClick={() => {
                                  setFilterState("all");
                                }}
                              >
                                All
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#/action-2"
                                onClick={() => {
                                  setFilterState("incomplete");
                                }}
                              >
                                Incomplete
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#/action-3"
                                onClick={() => {
                                  setFilterState("complete");
                                }}
                              >
                                Completed
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#/action-4"
                                onClick={() => {
                                  setFilterState("favourite");
                                }}
                              >
                                Favourite
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                    <ToDoList
                      filteredData={filteredData}
                      updateData={updateData}
                      todoData={todoData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToDoContainer;
