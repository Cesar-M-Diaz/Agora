import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import HookForm from './pages/Register';
import Register from './pages/Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
      <Layout>
        <Switch>
          <Route exact path="/" component={} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
