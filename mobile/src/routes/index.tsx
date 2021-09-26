import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { UseAuth, User } from '../contexts/AuthContext';

const Routes: React.FC = () => {
    const { user = {} as User} = UseAuth();
    return user.signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;