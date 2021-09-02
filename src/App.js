import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
