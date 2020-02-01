import React from 'react';
import { Provider } from "react-redux";
import setupStore from "./redux/setupStore";
import AppRouter from './router/AppRouter';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
