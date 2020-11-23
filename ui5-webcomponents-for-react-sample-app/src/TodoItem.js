import React from "react";
import PropTypes from "prop-types";
import { Button } from "@ui5/webcomponents-react/lib/Button";
import { CustomListItem } from "@ui5/webcomponents-react/lib/CustomListItem";

function TodoItem({ id, done, text, deadline, handleDelete, handleEdit }) {

  return (
    <CustomListItem
      key={id}
      data-key={id}
      type="Active"
      selected={done || undefined}
    >
      <span className="li-content-text">{text} - finish before: {deadline}</span>
      < Button className="edit-btn" onClick={() => handleEdit(id)}>Edit</Button>
      <Button design="Negative" onClick={() => handleDelete(id)}>Delete</Button>
    </CustomListItem>
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