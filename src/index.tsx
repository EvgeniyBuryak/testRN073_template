import React from "react";

import RootStack from './navigation';

import { Provider } from 'react-redux';
import { applyMiddleware, configureStore, Turple, createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

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

// const middleware = __DEV__ ? applyMiddleware(require("redux-flipper").default()) : [];
// const middleware = applyMiddleware(require("redux-flipper").default());

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   middleware,
// });

const store = configureStore({
  reducer,
  middlewares: applyMiddleware(...middlewares),
});
  // middleware: () => new Turple(serializableMiddleware),
// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),

const App: React.FC<Props> = (props: Props) => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;
