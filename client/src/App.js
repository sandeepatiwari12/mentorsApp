import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Header';
import Landing from './components/pages/Layouts/Landing';
import Login from './components/pages//auth/Login';
import Register from './components/pages/auth/Register';
import Alert from './components/pages/Layouts/Alert';
import Todos from './components/pages/task';
import PrivateRoute from './components/pages/PrivateRoute';
import jwt_decode from 'jwt-decode';
// redux
import { Provider } from 'react-redux';
import store from './store';
import { setCurrentUser, logoutUser } from './redux/actions/auth';
import setAuthToken from './utils';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Todos} />
              </Switch>
            </div>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
