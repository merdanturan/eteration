import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './stores/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import renderAppRoutes from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
            <Outlet />
        }
      >
        {renderAppRoutes()}
      </Route>
    </>
  )
);

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);