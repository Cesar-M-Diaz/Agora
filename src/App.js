import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import HookForm from './pages/Register';
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={HookForm} />
      </Switch>
    </Router>
  );
}

export default App;
