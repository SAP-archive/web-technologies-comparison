import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { List, Button } from "fundamental-react/lib";


function TodoItem({ id, done, text, deadline, handleClick, handleDelete, handleEdit }) {

  const editButton = useRef(),
    deleteButton = useRef();

  useEffect(() => {
    editButton.current.addEventListener("click", (oEvent) => {
      oEvent.stopPropagation();
      handleEdit(id);
    });
    return () => {
      editButton.current && editButton.current.removeEventListener("click", () => {
        handleEdit(id);
      });
    };
  }, [handleEdit]);

  useEffect(() => {
    deleteButton.current.addEventListener("click", (oEvent) => {
      oEvent.stopPropagation();
      handleDelete(id);
    });
    return () => {
      deleteButton.current && deleteButton.current.removeEventListener("click", () => {
        handleDelete(id);
      });
    };
  }, [handleDelete]);


  return (
    <List.Item key={id} data-key={id} selected={done || false} onClick={handleClick}>
      <List.Selection>
        <List.Text>{text} - finish before: {deadline}</List.Text>
        <Button className="edit-btn" ref={editButton} >Edit</Button>
        <Button type="negative" ref={deleteButton}  >Delete</Button>
      </List.Selection>
    </List.Item>
  );
}

TodoItem.propTypes = {
  id: PropTypes.number,
  done: PropTypes.bool,
  text: PropTypes.string,
  deadline: PropTypes.string,
  handleClick: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func
};

export default TodoItem;