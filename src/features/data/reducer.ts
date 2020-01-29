import { createReducer } from 'typesafe-actions';

import { DataState } from 'app-models';
import { dataReady } from './actions';

const initialState: DataState = {
  user: '',
};

export default createReducer(initialState).handleAction(
  dataReady,
  (state, action) => action.payload.data,
);
