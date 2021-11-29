import React, { useEffect } from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { UseAuth, User } from '../contexts/AuthContext';
import { UseConfig } from '../contexts/ConfigContext';
import { ThemeProvider } from 'styled-components/native';
import Dark from '../themes/dark'
import Light from '../themes/light'

const Routes: React.FC = () => {
  const { user = {} as User } = UseAuth();
  const {isDark} = UseConfig()

  useEffect(() => console.debug(
    '[Routes/index] User logged: ',
    JSON.stringify(user).substr(0, 150),
  ), [user])
  return (
    <>
    <ThemeProvider theme={{colors: isDark ? Dark : Light}}>      
      {user.signed ? <AppRoutes /> : <AuthRoutes />}
    </ThemeProvider>
    </>
  );
};

export default Routes;
