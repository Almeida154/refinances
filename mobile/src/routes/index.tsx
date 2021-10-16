import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { UseAuth, User } from '../contexts/AuthContext';

const Routes: React.FC = () => {
  const { user = {} as User } = UseAuth();
  console.debug(
    '[Routes/index] User logged: ',
    JSON.stringify(user).substr(0, 150),
  );
  return user.signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
