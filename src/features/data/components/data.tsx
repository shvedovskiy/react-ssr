import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

export function Data() {
  const { title = '' } = useSelector((state: RootState) => state.data);

  return <h1>Hello, {title}!</h1>;
}
