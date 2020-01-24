import { createStore } from 'redux';

const preloadedState = JSON.parse(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_STORE':
      return action.payload;
    default:
      return state;
  }
}

export const store = createStore(reducer, preloadedState);
