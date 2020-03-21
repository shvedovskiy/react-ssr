import { createReducer } from 'typesafe-actions';

import { DataState } from 'app-models';
import * as actions from './actions';

const initialState: DataState = {};

export const reducer = createReducer(initialState).handleAction(
  actions.dataReady,
  (state, action) => action.payload.data,
);
