import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { List } from "@ui5/webcomponents-react/lib/List";

function TodoList({ items, selectionChange, remove, edit }) {

  return (
    <List id="todo-list" mode="MultiSelect" onSelectionChange={selectionChange}>
      {items.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            deadline={todo.deadline}
            done={todo.done}
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
