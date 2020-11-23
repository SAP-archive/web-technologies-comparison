
import React, { useState, useRef, useEffect, useCallback } from "react";

import { Shellbar } from "fundamental-react/lib/Shellbar";
import { Button } from "fundamental-react/lib/Button";
import { DatePicker } from "fundamental-react/lib/DatePicker";
import { FormInput } from "fundamental-react/lib/Forms";

import "./App.css";
import TodoList from "./TodoList";
import EditDialog from "./EditDialog";

function App() {

  const [todos, setTodos] = useState([
    {
      text: "Attend TechEd Global",
      id: 1,
      deadline: "8/12/2020",
      done: false
    },
    {
      text: "Do some magic",
      id: 2,
      deadline: "24/9/2020",
      done: false
    },
    {
      text: "Go to the gym",
      id: 3,
      deadline: "24/7/2020",
      done: true
    },
    {
      text: "Learn about React",
      id: 4,
      deadline: "30/8/2020",
      done: true
    },
    {
      text: "Learn about Fundamentals Library and UI5 Web Components",
      id: 5,
      deadline: "29/12/2020",
      done: false
    }
  ]);
  const [todoBeingEditted, setTodoBeingEditted] = useState({
    id: "",
    text: "",
    date: ""
  });

  let [showDone, setShowDone] = useState(true);

  const addButton = useRef(),
    todoInput = useRef(),
    todoDeadline = useRef(),
    editDialog = useRef(),
    toggleDone = useRef();


  const handleSave = useCallback((newItem) => {

    setTodos(newTodos => newTodos.map((todo) => {
      if (todo.id === newItem.id) {
        todo.text = newItem.text;
        todo.deadline = newItem.deadline;
      }
      return todo;
    }));

  }, [todoBeingEditted, setTodos]);

  const handleDone = useCallback(event => {
    const selectedId = event.currentTarget.getAttribute("data-key");

    setTodos((newTodos) => newTodos.map(todo => {
      todo.done = todo.done || (selectedId == todo.id);
      return todo;
    }));
  }, [setTodos]);

  const handleUnDone = useCallback(event => {
    const deselectedId = event.currentTarget.getAttribute("data-key");

    setTodos((newTodos) => newTodos.map(todo => {
      return { ...todo, done: (todo.done && (deselectedId != todo.id)) };
    }));

  }, [setTodos]);

  const handleAdd = useCallback(() => {
    setTodos(newTodos => [
      ...newTodos,
      {
        text: todoInput.current.value,
        id: newTodos.length + 1,
        deadline: todoDeadline.current.state.formattedDate,
        done: false
      }
    ]);

    todoInput.current.value = "";
    todoDeadline.current.value = "";
  }, [setTodos]);

  const handleRemove = useCallback(id => {
    setTodos(newTodos => newTodos.filter(todo => todo.id !== id));
  }, [setTodos]);

  const handleEdit = useCallback((id) => {
    const todoObj = todos.filter(todo => {
      return todo.id === id;
    })[0];

    setTodoBeingEditted(() => ({
      id: id,
      text: todoObj.text,
      deadline: todoObj.deadline
    }));

    editDialog.current.open();
  }, [todos, setTodoBeingEditted]);

  const handleToggle = useCallback(() => {
    setShowDone(!showDone);
  });

  useEffect(() => {
    todoInput.current.addEventListener("submit", handleAdd);
    return () => {
      todoInput.current.removeEventListener("submit", handleAdd);
    };
  }, [handleAdd]);

  useEffect(() => {
    addButton.current.addEventListener("click", handleAdd);
    return () => {
      addButton.current.removeEventListener("click", handleAdd);
    };
  }, [handleAdd]);


  useEffect(() => {
    toggleDone.current.addEventListener("click", handleToggle);
    return () => {
      toggleDone.current.removeEventListener("click", handleToggle);
    };
  }, [handleToggle]);

  return (
    <div className="app">
      <Shellbar
        logo={<img alt="SAP" height="32px" src="/logo.png" />}
        productTitle="Fundamental Library for React Sample Application" />
      <section className="app-content">
        <div className="create-todo-wrapper">
          <FormInput placeholder="My Todo ..." ref={todoInput} className="add-todo-element-width" id="add-input" />
          <DatePicker dateFormat="DD/MM/YYYY" className="add-todo-element-width" ref={todoDeadline} id="date-picker" />
          <Button className="add-todo-element-width" ref={addButton} option="emphasized" >Add Todo</Button>
        </div>

        <div className="list-todos-wrapper">
          <TodoList
            items={todos.filter(todo => !todo.done)}
            selectionChange={handleDone}
            remove={handleRemove}
            edit={handleEdit}
          >
          </TodoList>


          <div className="panelwrap">
            <Button className="panelbtn"
              ref={toggleDone}
              option="transparent"
              aria-label="Add to cart"
              glyph={showDone ? "slim-arrow-down" : "slim-arrow-right"} />
            <span className="panel" >Completed Tasks</span>
          </div>
          {showDone ? (
            <div className="panelContent">
              <TodoList
                class="doneList"
                visible={showDone}
                items={todos.filter(todo => todo.done)}
                selectionChange={handleUnDone}
                remove={handleRemove}
                edit={handleEdit}
              >
              </TodoList>
            </div>
          ) : (
              <div />
            )}

        </div>
      </section>
      <EditDialog ref={editDialog} todoBeingEditted={todoBeingEditted} saveItem={handleSave} />
    </div>
  );
}

export default App;
