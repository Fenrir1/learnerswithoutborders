// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
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

/*ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <UsersServiceProvider value={usersService} >
        <Router>
          <App />
        </Router>
      </UsersServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root'));*/


document.addEventListener('DOMContentLoaded', () => {
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
    document.body.appendChild(document.createElement('div')),
  )
})
  



/*-------------------------------------------

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
*/