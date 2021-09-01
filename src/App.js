import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './pages/LoginPage';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
