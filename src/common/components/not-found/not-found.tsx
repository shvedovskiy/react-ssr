import React from 'react';
import { StaticRouterContext } from 'react-router';

type Props = {
  staticContext?: StaticRouterContext;
};

export const NotFound = ({ staticContext = {} }: Props) => {
  staticContext.statusCode = 404;

  return <h1>Not Found</h1>;
};
