import * as React from 'react';
import PasswordRecovery from '../screens/auth/PasswordRecovery';
import Login from '../screens/auth/LogIn';
import ConfigAccount from '../screens/auth/SignIn/ConfigAccount';
import RegisterMain from '../screens/auth/SignIn/RegisterMain';
import RegisterName from '../screens/auth/SignIn/RegisterName';
import RegisterEarnings from '../screens/auth/SignIn/RegisterEarnings';
import RegisterCategories from '../screens/auth/SignIn/RegisterCategories';

import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Entrar" component={Login} />
            <AuthStack.Screen name="Cadastrar" component={RegisterMain} />
            <AuthStack.Screen name="InserirNome" component={RegisterName} />
            <AuthStack.Screen name="ConfigConta" component={ConfigAccount} />
            <AuthStack.Screen name="ConfigCategorias" component={RegisterCategories} />
            <AuthStack.Screen name="Ganhos" component={RegisterEarnings} />
            <AuthStack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;