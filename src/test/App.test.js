import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import history from './utils/history';
import axios from './utils/axios';
import createStore from './store';
import { TOKEN } from './actions/constants';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

jest.mock('./utils/axios');

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test('renders register component', () => {
  history.push('/register');
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByTestId('register-title')).toBeInTheDocument();
});

test('renders login component', () => {
  history.push('/login');
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByTestId('login-title')).toBeInTheDocument();
});

test('redirects to login if not authenticated', () => {
  history.push('/home');
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(screen.getByTestId('login-title')).toBeInTheDocument();
});
