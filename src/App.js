import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import { errorPage } from './pages/errorPage'
import HomePage from './pages/HomePage';

function App() {
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
