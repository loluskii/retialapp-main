import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";
import {Router} from 'react-router-dom';
import history from './Services/history';
import store, { persistor } from "./Redux/store";
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
        <PersistGate persistor={persistor} >
            <Router history={history}>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
