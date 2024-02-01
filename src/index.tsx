import React from "react";

import RootStack from './navigation';

import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

import authReducer from '~/features/auth/Auth.slice'

interface Props {}

const reducer = {
  "auth": authReducer,
};

const store = configureStore({
  reducer,
});

const App: React.FC<Props> = (props: Props) => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;
