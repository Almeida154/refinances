import * as React from 'react';
import Main from '../screens/main';
import FormLancamento from '../screens/FormLancamento'
import SelectionCategorias from '../screens/FormLancamento/components/SelectionCategorias'

import RootStackParamApp, {RootStackParamAppFormLancamento} from '../@types/RootStackParamApp'

import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator<RootStackParamApp>();
const Tab = createStackNavigator<RootStackParamAppFormLancamento>();

function FormLancamentosNavigators() {
    return (
        <Tab.Navigator > 
            <Tab.Screen name="Main" component={FormLancamento} />                
            <Tab.Screen name="SelectionCategorias" component={SelectionCategorias} />
        </Tab.Navigator>
    )
}
const MainRoutes: React.FC = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Main" component={Main} />
            <MainStack.Screen name="FormLancamento" component={FormLancamentosNavigators} />                
        </MainStack.Navigator>
    );
}

export default MainRoutes