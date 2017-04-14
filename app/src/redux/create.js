import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import rootReducer from './modules';

const configureStore = (preloadedState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  const composed = [applyMiddleware(...middlewares)];

    /*eslint-disable */
  const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  /*eslint-enable */

  const store = createStore(rootReducer, preloadedState, composeSetup(...composed));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./modules', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
