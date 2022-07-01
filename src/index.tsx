import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
// @ts-ignore
import store from "./Redux/store";

ReactDOM.render(

    <Provider store={store}>
    <BrowserRouter>

        <App />

    </BrowserRouter>
    </Provider>,

  document.getElementById('root')
);
