import { Dispatch } from 'redux';
import { createAction } from 'typesafe-actions';

import { DataState } from 'app-models';
import { FetchingRoute } from 'src/api/types';

export const dataReady = createAction('DATA_READY', (data: DataState = {}) => ({ data }))();

export const fetchAppData = (currentRoute: FetchingRoute, prevRoute: FetchingRoute | null) => {
  return async (dispatch: Dispatch): Promise<void> => {
    let data: DataState;
    try {
      const response = await fetch('http://jsonplaceholder.typicode.com/todos/1');
      data = await response.json();
    } catch (err) {
      data = {};
    }
    dispatch(dataReady(data));
  };
};
