import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './pages/Register';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
      <Layout>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
