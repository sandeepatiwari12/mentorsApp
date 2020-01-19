import React, { Component } from 'react';
import PropTypes from 'prop-types';
// for Icon Button
import IconButton from '@material-ui/core/IconButton';
// for icons
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

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
    const { task } = this.props;
    const { name, completed } = task;

    return (
      <div style={this.getStyle()}>
        <p>
          <Checkbox
            checked={completed}
            // onChange={markComplete.bind(this, _id)}
            value={completed}
            color="primary"
          />
          {name}
          <IconButton
            variant="extended"
            color="secondary"
            className="float-right"
            // onClick={delTask.bind(this, _id)}
          >
            <DeleteIcon />
          </IconButton>
        </p>
      </div>
    );
  }
}

// PropTypes
TaskItem.propTypes = {
  task: PropTypes.object.isRequired
  // markComplete: PropTypes.func.isRequired,
  // delTask: PropTypes.func.isRequired
};
export default TaskItem;
