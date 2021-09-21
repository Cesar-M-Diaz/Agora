import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { LandingPage } from './pages/LandingPage';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import getUserData from './actions/getUserData';
import { useEffect } from 'react';
import { errorPage } from './pages/errorPage'
import HomePage from './pages/HomePage';

function App() {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch();
  useEffect(() => {
    if(token !== null) {
      dispatch(getUserData(token));
    }
  }, [dispatch, token])
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/error" component={errorPage} />
          <Route exact path="/home" component={HomePage} />
          <Route path="*" component={errorPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
