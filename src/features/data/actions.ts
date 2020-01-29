import { Dispatch } from 'redux';
import { createAction } from 'typesafe-actions';

import { DataState } from 'app-models';

export const dataReady = createAction('DATA_READY', (data: DataState = {}) => ({ data }))();

function getData(): Promise<DataState> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ user: 'Test' });
    }, 30);
  });
}

export const fetchGlobalAppData = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const data = await getData();
    dispatch(dataReady(data));
  };
};
