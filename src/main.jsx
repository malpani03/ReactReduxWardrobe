import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from './store/store'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider loading={null} store={store}>
      <PersistGate persistor={persistor}>
    <BrowserRouter>
            <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
