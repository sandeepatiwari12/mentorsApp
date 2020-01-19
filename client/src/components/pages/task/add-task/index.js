import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { addTask } = this.props;
    addTask(this.state.title);
    this.setState({ title: '' });
  };

  onChange = title => {
    this.setState({ title });
  };

  render() {
    const { title } = this.state;
    return (
      <div style={{ margin: '1rem 0' }}>
        <form className="row" onSubmit={this.onSubmit}>
          <div className="col-10">
            <input
              name="title"
              placeholder="Enter The Task Name"
              onChange={this.onChange}
              value={title}
            />
          </div>
          <div className="col-2">
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

// PropTypes
AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};
export default AddTask;
