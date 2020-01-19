import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../../redux/actions/alert';
import { registerUser } from '../../../redux/actions/auth';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 700
    }
  }
}));
const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const classes = useStyles();
  const [fromData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = fromData;

  const onChange = e =>
    setFromData({ ...fromData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('password should be same', 'danger');
    } else {
      registerUser({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">Create Your Account</p>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={e => onSubmit(e)}
      >
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => onChange(e)}
          required
        />

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => onChange(e)}
          name="email"
          required
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
          value={password}
          onChange={e => onChange(e)}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          type="password"
          placeholder="Confirm Password"
          name="password2"
          minLength="6"
          value={password2}
          onChange={e => onChange(e)}
        />
        <Button type="submit" color="primary" variant="contained">
          Register
        </Button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

Register.defaultProps = {
  isAuthenticated: false
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
