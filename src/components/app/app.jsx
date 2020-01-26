import { hot } from 'react-hot-loader/root';
import React from 'react';

import { ReactRouter } from 'src/components/react-router/react-router';

const AppComponent = () => <ReactRouter />;

export const App = hot(AppComponent);
