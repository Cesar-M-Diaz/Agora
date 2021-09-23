import { Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import getUserData from './actions/getUserData';
import {AUTH_FAILED} from './actions/constants';
import { useEffect } from 'react';
import { errorPage } from './pages/errorPage';
import HomePage from './pages/HomePage';
import history from './utils/history';
import ProfileRouteComponent from './utils/ProfileRouteComponent';

function App() {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch();

  useEffect(() => {
    if(token !== null) {
      dispatch(getUserData(token));
    } else {
      dispatch({ type: AUTH_FAILED })
    }
  }, [dispatch, token])
  
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/home" component={HomePage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/error" component={errorPage} />
          <PrivateRoute exact path="/profile" component={ProfileRouteComponent} />
          <Route path="*" component={errorPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
