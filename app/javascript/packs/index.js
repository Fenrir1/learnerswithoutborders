import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import UsersService from './services/users-service';
import {UsersServiceProvider} from './components/users-service-context';

import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer);

const usersService = new UsersService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <UsersServiceProvider value={usersService} >
        <Router>
          <App />
        </Router>
      </UsersServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root'));
