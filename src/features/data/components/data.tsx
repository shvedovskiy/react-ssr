import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

import * as dataActions from '../actions';
import { useActions } from 'src/common/utils/use-action';

export function Data() {
  const { fetchAppData } = useActions(dataActions);
  const { title = '' } = useSelector((state: RootState) => state.data);

  return <h1>Hello, {title}!</h1>;
}
