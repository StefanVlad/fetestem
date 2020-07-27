// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(thunk));

//Application has to have the store wrapping the context so that the app has access to the data in the store.
// Provider connects the app to the store defined above
//SSR apps have two stores. This one is for the client (browser)
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
document.querySelector('#root')
);
