import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter: React.FC = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
          ))}
          {publicRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
  );
};

export default AppRouter;
