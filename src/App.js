import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
