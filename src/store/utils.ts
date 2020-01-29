import { compose } from 'redux';

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
};

const isReduxDevtoolsExist = (arg: Window | WindowWithDevTools): arg is WindowWithDevTools => {
  return '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in arg;
};

export const composeEnhancers =
  !IS_SERVER && isReduxDevtoolsExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
