import { Input } from "@ui5/webcomponents-react/lib/Input";
import { Panel } from "@ui5/webcomponents-react/lib/Panel";
import { Button } from "@ui5/webcomponents-react/lib/Button";
import { DatePicker } from "@ui5/webcomponents-react/lib/DatePicker";
import { ShellBar } from "@ui5/webcomponents-react/lib/ShellBar";
import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";

import React, { useRef, useCallback, useState } from "react";
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

  const todoInput = useRef(),
    todoDeadline = useRef(),
    editDialog = useRef();

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
    const selectedItem = event.detail.selectedItems[0];
    const selectedId = selectedItem.getAttribute("data-key");

    setTodos((newTodos) => newTodos.map(todo => {
      return { ...todo, done: (todo.done || (selectedId === todo.id.toString())) };
    }));
  }, [setTodos]);

  const handleUnDone = useCallback(event => {
    const selectedItems = event.detail.selectedItems;

    setTodos((newTodos) => newTodos.map((todo) => {
      const unselectedItem = selectedItems.filter(item => item.getAttribute("data-key") === todo.id.toString());
      todo.done = !!unselectedItem[0];
      return todo;
    }));

  }, [setTodos]);

  const handleAdd = useCallback(() => {
    setTodos(newTodos => [
      ...newTodos,
      {
        text: todoInput.current.value,
        id: newTodos.length + 1,
        deadline: todoDeadline.current.value,
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


  return (
    (
      <ThemeProvider>
        <ShellBar primaryTitle="UI5 Web Components for React Sample Application"
          logo={<img alt="SAP" height="32px" src="/logo.png" />}> </ShellBar>
        <section className="app-content">
          <div className="create-todo-wrapper">
            <Input placeholder="My Todo ..." onSubmit={handleAdd} ref={todoInput} className="add-todo-element-width" id="add-input"></Input>
            <DatePicker format-pattern="dd/MM/yyyy" className="add-todo-element-width" ref={todoDeadline} id="date-picker"></DatePicker>
            <Button className="add-todo-element-width" onClick={handleAdd} design="Emphasized">Add Todo</Button>
          </div>

          <div className="list-todos-wrapper">
            <TodoList
              items={todos.filter(todo => !todo.done)}
              selectionChange={handleDone}
              remove={handleRemove}
              edit={handleEdit}
            >
            </TodoList>

            <Panel header-text="Completed Tasks" collapsed={!todos.filter(todo => todo.done).length || undefined}>
              <TodoList
                items={todos.filter(todo => todo.done)}
                selectionChange={handleUnDone}
                remove={handleRemove}
                edit={handleEdit}
              >
              </TodoList>
            </Panel>
          </div>
        </section>
        <EditDialog ref={editDialog} todoBeingEditted={todoBeingEditted} saveItem={handleSave} />
      </ThemeProvider>
    )

  );

}


export default App;