import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { AUTHORIZED, LOADING } from '../actions/constants';
import '../assets/styles/components/PrivateRoute.scss';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authUser = useSelector((state) => state.auth_status);
  if (authUser === LOADING)
    return <p className="app-loading__message">Loading ....</p>;
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser === AUTHORIZED ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
