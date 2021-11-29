import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { UseAuth, User } from '../contexts/AuthContext';
import { ThemeProvider } from 'styled-components/native';
import Dark from '../themes/dark'
import Light from '../themes/light'

const Routes: React.FC = () => {
  const { user = {} as User } = UseAuth();
  console.debug(
    '[Routes/index] User logged: ',
    JSON.stringify(user).substr(0, 150),
  );
  return (
    <>
    <ThemeProvider theme={{colors: user.config?.theme == 'light' ? Light : Dark}}>
      
      {user.signed ? <AppRoutes /> : <AuthRoutes />}
    </ThemeProvider>
    </>
  );
};

export default Routes;
