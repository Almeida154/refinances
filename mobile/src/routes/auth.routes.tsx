import * as React from 'react';
import Entrar from '../screens/Entrar';
import Cadastrar from '../screens/Cadastrar';
import InserirNome from '../screens/InserirNome';
import ConfigConta from '../screens/ConfigConta';
import Ganhos from '../screens/Ganhos';
import ConfigCategorias from '../screens/ConfigCategorias';

import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Entrar" component={Entrar} />
            <AuthStack.Screen name="Cadastrar" component={Cadastrar} />
            <AuthStack.Screen name="InserirNome" component={InserirNome} />
            <AuthStack.Screen name="ConfigConta" component={ConfigConta} />
            <AuthStack.Screen name="ConfigCategorias" component={ConfigCategorias} />
            <AuthStack.Screen name="Ganhos" component={Ganhos} />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;