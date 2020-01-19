import React, { Component } from 'react';
import PropTypes from 'prop-types';
// for Icon Button
import { IconButton, Checkbox } from '@material-ui/core';
// for icons
import { DeleteForeverOutlined } from '@material-ui/icons';
export class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyle = () => {
    const { task } = this.props;
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      display: 'flow-root',
      textDecoration: task.completed ? 'line-through' : 'none'
    };
  };

  render() {
    const { task, markComplete, delTask } = this.props;
    const { name, description, completed } = task;
    console.log('desc', description);
    return (
      <div style={this.getStyle()}>
        <p>
          <Checkbox
            checked={completed}
            onChange={markComplete}
            value={completed}
            color="primary"
          />
          {name} <strong> {description}</strong>
          <IconButton
            variant="extended"
            color="secondary"
            className="float-right"
            onClick={delTask}
          >
            <DeleteForeverOutlined />
          </IconButton>
        </p>
      </div>
    );
  }
}

// PropTypes
TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired
};
export default TaskItem;
