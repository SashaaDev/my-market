import React from 'react';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, BASKET_ROUTE, ORDER_ROUTE, PRODUCT_ROUTE } from './utils/constants';

interface RouteType {
  path: string;
  Component: React.LazyExoticComponent<React.FC>;
}

export const authRoutes: RouteType[] = [
  {
    path: LOGIN_ROUTE,
    Component: React.lazy(() => import('./pages/LoginPage')),
  },
  {
    path: REGISTRATION_ROUTE,
    Component: React.lazy(() => import('./pages/RegistrationPage')),
  },
];

export const publicRoutes: RouteType[] = [
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
