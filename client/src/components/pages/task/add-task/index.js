import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { createTask } from '../../../../redux/actions/tasks';

export class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  onSubmit = async e => {
    e.preventDefault();
    const { createTask } = this.props;
    const { name, description } = this.state;
    await createTask({ name, description });
    this.setState({ name: '', description: '' });
  };

  onChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    const { name, description } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          fullWidth
          label="Enter The Task Name"
          variant="outlined"
          type="text"
          name="name"
          onChange={this.onChange}
          value={name}
          required
        />
        <TextField
          fullWidth
          label="Describe the task"
          variant="outlined"
          type="text"
          name="description"
          onChange={this.onChange}
          value={description}
          required
        />
        <div className="col-2">
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

// PropTypes
AddTask.propTypes = {
  createTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps, { createTask })(AddTask);
