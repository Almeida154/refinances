import * as React from 'react';
import Main from '../screens/main';
import FormLancamento from '../screens/dashboard/Entries';
import AddCategory from '../screens/dashboard/Entries/components/AddCategory';

import RootStackParamApp, {
  HomeAccountStack,
  PropsMainRoutes,
  FormLancamentoStack,
  GoalsStack,
} from '../@types/RootStackParamApp';

import { createStackNavigator } from '@react-navigation/stack';

import ManageAccount from '../screens/dashboard/Home/components/ManageAccount';
import CreateAccount from '../screens/dashboard/Home/components/CreateAccount';
// import newCategory from '../screens/dashboard/Home/components/newCategory';
import Home from '../screens/dashboard/Home';
import AddCategoryAccount from '../screens/dashboard/Home/components/CreateAccount/components/AddCategoryAccount';

import GoalsList from '../screens/dashboard/Goals/navigators/TopBarNavigator';
import InvestGoals from '../screens/dashboard/Goals/screens/Invest';
import GoalDetails from '../screens/dashboard/Goals/screens/GoalDetails';
import CreateGoal from '../screens/dashboard/Goals/screens/CreateGoal';

const MainStack = createStackNavigator<PropsMainRoutes>();
const HomeStack = createStackNavigator<HomeAccountStack>();

export const HomeAccountStackNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ManageAccount" component={ManageAccount} />
      <HomeStack.Screen name="CreateAccount" component={CreateAccount} />
      <HomeStack.Screen
        name="AddCategoryAccount"
        component={AddCategoryAccount}
      />
    </HomeStack.Navigator>
  );
};

const GoalStack = createStackNavigator<GoalsStack>();
const GoalsStackNavigation = () => {
  return (
    <GoalStack.Navigator>
      <GoalStack.Screen name="GoalsList" component={GoalsList} />
      <GoalStack.Screen name="CreateGoals" component={CreateGoal} />
      <GoalStack.Screen name="InvestGoals" component={InvestGoals} />
      <GoalStack.Screen name="GoalDetails" component={GoalDetails} />
    </GoalStack.Navigator>
  );
};

const LancamentosStack = createStackNavigator<FormLancamentoStack>();
export const LancamentosStackNavigation = () => {
  return (
    <LancamentosStack.Navigator>
      <LancamentosStack.Screen name="Main" component={FormLancamento} />
      <LancamentosStack.Screen name="AddCategory" component={AddCategory} />
    </LancamentosStack.Navigator>
  );
};

const MainRoutes: React.FC = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Main" component={Main} />
      <MainStack.Screen
        name="StackAccount"
        component={HomeAccountStackNavigation}
      />
      <MainStack.Screen
        name="Lancamentos"
        component={LancamentosStackNavigation}
      />
      <MainStack.Screen name="GoalsStack" component={GoalsStackNavigation} />
      {/* <MainStack.Screen name="CreateCategory" component={newCategory} /> */}
    </MainStack.Navigator>
  );
};

export default MainRoutes;
