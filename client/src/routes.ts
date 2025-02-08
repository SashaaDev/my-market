import React from 'react';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
  ORDER_ROUTE,
  PRODUCT_ROUTE,
  ADMIN_ROUTE,
  MANAGER_ROUTE,
  PRODUCT_UPDATE_ROUTE,
  PRODUCT_CREATE_ROUTE
} from './utils/constants';

interface RouteType {
  path: string;
  Component: React.LazyExoticComponent<React.FC>;
}

export const authRoutes: RouteType[] = [
  {
    path: ADMIN_ROUTE,
    Component: React.lazy(() => import('./pages/AdminPage'))
  },
  {
    path: BASKET_ROUTE,
    Component:React.lazy(() => import('./pages/BasketPage')),
  },
  {
    path: MANAGER_ROUTE,
    Component:React.lazy(() => import('./pages/ManagerPage'))
  },
  {
    path: PRODUCT_UPDATE_ROUTE,
    Component:React.lazy(() => import('./pages/UpdateProductPage'))
  },
  {
    path: PRODUCT_CREATE_ROUTE,
    Component:React.lazy(() => import('./pages/CreateProductPage'))
  }
];

export const publicRoutes: RouteType[] = [
  {
    path: LOGIN_ROUTE,
    Component: React.lazy(() => import('./pages/LoginPage')),
  },
  {
    path: REGISTRATION_ROUTE,
    Component: React.lazy(() => import('./pages/RegistrationPage')),
  },
  {
    path: SHOP_ROUTE,
    Component: React.lazy(() => import('./pages/ShopPage')),
  },
  {
    path: BASKET_ROUTE,
    Component: React.lazy(() => import('./pages/BasketPage')),
  },
  {
    path: ORDER_ROUTE,
    Component: React.lazy(() => import('./pages/OrderPage')),
  },
  {
    path: PRODUCT_ROUTE,
    Component: React.lazy(() => import('./pages/ProductPage')),
  },
];
