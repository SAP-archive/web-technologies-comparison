import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { List } from "fundamental-react/lib/List";
import TodoItem from "./TodoItem";


function TodoList({ items, selectionChange, remove, edit }) {
  const list = useRef();

  useEffect(() => {
    list.current.addEventListener("selectionChange", selectionChange);
    return () => {
      list.current.removeEventListener("selectionChange", selectionChange);
    };
  }, [selectionChange]);

  return (
    <List ref={list} selectable>
      {items.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            deadline={todo.deadline}
            done={todo.done}
            handleClick={selectionChange}
            handleDelete={remove}
            handleEdit={edit}
          ></TodoItem>
        );
      })}
    </List>
  );
}

TodoList.propTypes = {
  items: PropTypes.string,
  selectionChange: PropTypes.func,
  remove: PropTypes.func,
  edit: PropTypes.func
};

export default TodoList;