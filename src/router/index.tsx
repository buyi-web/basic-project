import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazyLoad } from './LazyLoad';

const router = [
    {
        path: '/home',
        element: lazyLoad(React.lazy(() => import('@/pages/home'))),
    },
    {
        path: '/login',
        element: lazyLoad(React.lazy(() => import('@/pages/login'))),
    }
]

export default createBrowserRouter(router);