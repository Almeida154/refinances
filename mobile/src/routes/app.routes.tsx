import * as React from 'react';
import Main from '../screens/main';
import FormLancamento from '../screens/dashboard/Entries'
import AddCategory from '../screens/dashboard/Entries/components/AddCategory'

import RootStackParamApp, {HomeAccountStack, PropsMainRoutes, FormLancamentoStack} from '../@types/RootStackParamApp'

import { createStackNavigator } from '@react-navigation/stack';

import ManageAccount from '../screens/dashboard/Home/components/ManageAccount';
import CreateAccount from '../screens/dashboard/Home/components/CreateAccount';
import AddCategoryAccount from '../screens/dashboard/Home/components/CreateAccount/components/AddCategoryAccount';

import DashboardGoal from '../screens/dashboard/Goals/screens/Dashboard/index'

const MainStack = createStackNavigator<PropsMainRoutes>();

const HomeStack = createStackNavigator<HomeAccountStack>()
const HomeAccountStackNavigation = () => {
    return (
        <HomeStack.Navigator>            
            <HomeStack.Screen name="ManageAccount" component={ManageAccount}/>
            <HomeStack.Screen name="CreateAccount" component={CreateAccount}/>
            <HomeStack.Screen name="AddCategoryAccount" component={AddCategoryAccount}/>
        </HomeStack.Navigator>
    )
}

const LancamentosStack = createStackNavigator<FormLancamentoStack>()
export const LancamentosStackNavigation = () => {
    return (
        <LancamentosStack.Navigator>            
            <LancamentosStack.Screen name="Main" component={FormLancamento}/>
            <LancamentosStack.Screen name="AddCategory" component={AddCategory}/>
        </LancamentosStack.Navigator>
    )
}

const MainRoutes: React.FC = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Main" component={Main} />
            <MainStack.Screen name="StackAccount" component={HomeAccountStackNavigation} />                
            <MainStack.Screen name="Lancamentos" component={LancamentosStackNavigation} />   
            <MainStack.Screen name="Goals" component={DashboardGoal} />             
        </MainStack.Navigator>
    );
}

export default MainRoutes