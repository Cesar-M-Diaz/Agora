import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import { TutorProfile } from './pages/TutorProfile';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/tutor" component={TutorProfile} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
