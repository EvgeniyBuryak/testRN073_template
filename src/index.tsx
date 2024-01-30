import React from "react";

import RootStack from './navigation';

import { Provider } from 'react-redux';
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

import authReducer from '~/features/auth/Auth.slice'

interface Props {}

const reducer = {
  "auth": authReducer,
};

const middlewares = [
  // other middlewares
];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger);
}

const store = configureStore({
  reducer,
  middlewares: applyMiddleware(...middlewares),
});

const App: React.FC<Props> = (props: Props) => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;
