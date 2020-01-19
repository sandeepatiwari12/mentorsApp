import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));
function Alert({ alerts }) {
  const classes = useStyles();
  return (
    <Fragment>
      {alerts !== null && alerts.length > 0 && (
        <div className={classes.root}>
          {alerts.map(alert => (
            <Snackbar
              key={String(alert.id)}
              open={true}
              autoHideDuration={6000}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              message={alert.msg}
            ></Snackbar>
          ))}
        </div>
      )}
    </Fragment>
  );
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
