import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
