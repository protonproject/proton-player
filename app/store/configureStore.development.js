import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import {
  routerMiddleware,
  push
} from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import * as playerActions from '../actions/playerActions';
import playerMiddleware from '../lib/playerMiddleware';

let fire;
try {
  fire = require('../actions/fireSomeActions'); //eslint-disable-line global-require
} catch (e) {
  fire = {};
}

const actionCreators = {
  playerActions,
  fire,
  push
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, playerMiddleware, router, logger)
);

export default function configureStore(initialState: Object | void) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
