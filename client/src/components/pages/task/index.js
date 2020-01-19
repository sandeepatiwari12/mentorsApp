import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadTasks,
  updateTask,
  deleteTask
} from '../../../redux/actions/tasks';

import TaskItem from './task-item';
import AddTask from './add-task';

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { loadTasks } = this.props;
    loadTasks();
  }
  completeTask = async task => {
    const { updateTask } = this.props;
    let postObj = Object.assign({}, task);
    postObj.completed = !task.completed;
    console.log('the final postbody to update task');
    await updateTask(task._id, postObj);
  };
  deleteTask = async id => {
    const { deleteTask } = this.props;
    await deleteTask(id);
  };
  render() {
    const { tasks } = this.props;
    return (
      <Fragment>
        <AddTask />
        {tasks && tasks.length > 0 && (
          <Fragment>
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                markComplete={() => this.completeTask(task)}
                delTask={() => this.deleteTask(task._id)}
              />
            ))}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

// PropTypes
Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any),
  loadTasks: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

export default connect(mapStateToProps, { loadTasks, updateTask, deleteTask })(
  Tasks
);
