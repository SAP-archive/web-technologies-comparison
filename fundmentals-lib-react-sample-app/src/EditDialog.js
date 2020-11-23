import { Dialog } from "fundamental-react/lib/Dialog";
import { Button } from "fundamental-react/lib/Button";
import { DatePicker } from "fundamental-react/lib/DatePicker";
import { FormLabel, FormTextarea } from "fundamental-react/lib/Forms";

import PropTypes from "prop-types";
import React, { Component } from "react";

class EditDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      text: "",
      deadline: "",
      showDialog: false
    };
  }

  open() {
    this.setState({
      id: this.props.todoBeingEditted.id,
      text: this.props.todoBeingEditted.text,
      deadline: this.props.todoBeingEditted.deadline,
      showDialog: true
    });
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
    this.setState({ deadline: event.formattedDate });
  };

  render() {
    return <Dialog
      actions={[
        (<Button key="cancelBtn" option="transparent" >Cancel</Button>),
        (<Button key="saveBtn" option="emphasized" onClick={() => { this.props.saveItem(this.state); this.setState({ showDialog: false }); }} >Save</Button>)
      ]}
      onClose={() => { this.setState({ showDialog: false }); }}
      show={this.state.showDialog}
      title="Edit Todo item" >
      <div className="dialog-content">
        <div className="edit-wrapper">
          <FormLabel>Title:</FormLabel>
          <FormTextarea onChange={this.handleTextChange} defaultValue={this.state.text} />
        </div>

        <div className="edit-wrapper date-edit-fields">
          <FormLabel>Date:</FormLabel>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            className="add-todo-element-width"
            onChange={this.handleDateChange}
            defaultValue={this.state.deadline} />
        </div>
      </div>
    </Dialog>;
  }

}

EditDialog.propTypes = {
  todoBeingEditted: PropTypes.object,
  saveItem: PropTypes.func,
};

export default EditDialog;