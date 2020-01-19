import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../../redux/actions/auth';
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

const Login = ({ loginUser, isAuthenticated }) => {
  const [fromData, setFromData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = fromData;
  const classes = useStyles();
  const onChange = e =>
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    loginUser({ email, password });
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">Enter User name and password to login</p>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={e => onSubmit(e)}
      >
        <TextField
          fullWidth
          label="Email"
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
          required
        />
        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
Login.defaultProps = {
  isAuthenticated: false
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
