import { createStore } from 'redux';

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_STORE':
      return action.payload;
    default:
      return state;
  }
}

export function configureStore(preloadedState) {
  return createStore(reducer, preloadedState);
}
