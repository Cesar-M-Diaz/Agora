import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
