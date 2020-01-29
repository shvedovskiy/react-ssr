import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

export function Data() {
  const { user = '' } = useSelector((state: RootState) => state.data);

  return <h1>Hello, {user}!</h1>;
}
