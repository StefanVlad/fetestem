import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import ProductsListPage from "./pages/ProductsListPage";
import AdminPage from "./pages/AdminPage";
import AddFundsPage from "./pages/AddFundsPage";

export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,
                path: '/',
                exact: true
            },
            {
                ...ProductsListPage,
                path: '/products'
            },
            {
                ...AdminPage,
                path: '/admin'
            },
            {
                ...AddFundsPage,
                path: '/payment'
            }
        ]
    }
];