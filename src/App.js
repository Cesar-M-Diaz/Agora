import { Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import TutorDetailsPage from './pages/TutorDetailsPage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import getUserData from './actions/getUserData';
import { useEffect } from 'react';
import { errorPage } from './pages/errorPage';
import HomePage from './pages/HomePage';
import history from './utils/history';
import TutorProfilePage from './pages/TutorProfilePage';
import { SearchPage } from './pages/searchPage';
import { AUTH_FAILED } from './actions/constants';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== null) {
      dispatch(getUserData(token));
    } else {
      dispatch({ type: AUTH_FAILED });
    }
  }, [dispatch, token]);

  return (
    <Router history={history}>
      <ScrollToTop />
      <Layout>
        <Switch>
          <PrivateRoute exact path="/home" component={HomePage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/error" component={errorPage} />
          <Route exact path="/tutor-profile" component={TutorProfilePage} />
          <Route exact path="/tutor" component={TutorDetailsPage} />
          <Route path="*" component={errorPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
