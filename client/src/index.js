/**
 * @author Rohan Gajjar
 */

//////// Load Module start //////////////////////
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { Provider } from 'react-redux';
import store from '../src/store'
////////// Load module End //////////////////////

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root'));

