import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTasks } from '../../../redux/actions/tasks';

import TaskItem from './task-item';

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { loadTasks } = this.props;
    loadTasks();
  }
  render() {
    const { tasks } = this.props;
    return (
      <Fragment>
        {tasks && tasks.length > 0 && (
          <Fragment>
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                // markComplete={this.props.markComplete}
                // deltask={this.props.deltask}
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
  loadTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

export default connect(mapStateToProps, { loadTasks })(Tasks);
