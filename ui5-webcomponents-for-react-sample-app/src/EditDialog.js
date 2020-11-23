import { Label } from "@ui5/webcomponents-react/lib/Label";
import { TextArea } from "@ui5/webcomponents-react/lib/TextArea";
import { Dialog } from "@ui5/webcomponents-react/lib/Dialog";
import { Button } from "@ui5/webcomponents-react/lib/Button";
import { DatePicker } from "@ui5/webcomponents-react/lib/DatePicker";

import PropTypes from "prop-types";
import React, { Component, createRef } from "react";

class EditDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      text: "",
      deadline: ""
    };
    this.editDialog = createRef();
  }

  open() {
    this.editDialog.current.open();
  }

  onBeforeOpen = () => {
    this.setState({
      id: this.props.todoBeingEditted.id,
      text: this.props.todoBeingEditted.text,
      deadline: this.props.todoBeingEditted.deadline
    });
  }

  handleTextChange = event => {
    this.setState({ text: event.target.value });
  };

  handleDateChange = event => {
    this.setState({ deadline: event.target.value });
  };

  render() {
    return <Dialog header-text="Edit Todo item" ref={this.editDialog} onBeforeOpen={this.onBeforeOpen} >
      <div className="dialog-content">
        <div className="edit-wrapper">
          <Label>Title:</Label>
          <TextArea className="title-textarea" max-length="24" show-exceeded-text value={this.state.text} onChange={this.handleTextChange} ></TextArea>
        </div>

        <div className="edit-wrapper date-edit-fields">
          <Label>Date:</Label>
          <DatePicker format-pattern="dd/MM/yyyy" value={this.state.deadline} onChange={this.handleDateChange} ></DatePicker>
        </div>
      </div>
      <div className="dialog-footer" >
        <Button design="Transparent" onClick={() => { this.editDialog.current.close(); }}>Cancel</Button>
        <Button design="Emphasized" onClick={() => { this.props.saveItem(this.state); this.editDialog.current.close(); }}>Save</Button>
      </div>
    </Dialog>;
  }

}

EditDialog.propTypes = {
  todoBeingEditted: PropTypes.object,
  saveItem: PropTypes.func,
};

export default EditDialog;