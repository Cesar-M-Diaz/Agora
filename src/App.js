import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import Layout from './components/Layout';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
