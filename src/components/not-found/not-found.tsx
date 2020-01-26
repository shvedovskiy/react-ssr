import React from 'react';

export const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return <h1>Not Found</h1>;
};
