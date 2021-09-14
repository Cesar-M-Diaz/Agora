import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import getUserData from './actions/getUserData';
import { useEffect } from 'react';

function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  useEffect(() => {
    if(state.token !== null) {
      dispatch(getUserData(state.token));
    }
  }, [dispatch, state.token])
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
