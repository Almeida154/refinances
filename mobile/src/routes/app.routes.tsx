import * as React from 'react';
import Main from '../screens/main';
import FormLancamento from '../screens/dashboard/Entries';
import AddCategory from '../screens/dashboard/Entries/components/AddCategory';
import RecognizeVoice from '../screens/dashboard/Entries/components/RecognizeVoice';

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
import ManageCategory from '../screens/dashboard/Home/components/ManageCategory/navigators/TopBarNavigator'
import NewCategory from '../screens/dashboard/Home/components/newCategory/navigator/'
import EditCategory from '../screens/dashboard/Home/components/EditCategory';


import GoalsList from '../screens/dashboard/Goals/navigators/TopBarNavigator';
import InvestGoals from '../screens/dashboard/Goals/screens/Invest';
import EditGoal from '../screens/dashboard/Goals/screens/EditGoal';
import GoalDetails from '../screens/dashboard/Goals/screens/GoalDetails';
import CreateGoal from '../screens/dashboard/Goals/screens/CreateGoal';
import GoalsDashboard from '../screens/dashboard/Goals/screens/DashboardGoals';

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();

export const HomeAccountStackNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>

      <HomeStack.Screen 
      name="ManageAccount"
      component={ManageAccount} 
      options={{headerShown: false}}/>

      <HomeStack.Screen 
      name="CreateAccount"
      component={CreateAccount} 
      options={{headerShown: false}}/>

      <HomeStack.Screen
        name="AddCategoryAccount"
        component={AddCategoryAccount}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="ManageCategory"
        component={ManageCategory}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="NewCategory"
        component={NewCategory}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="EditCategory"
        component={EditCategory}
        options={{headerShown: false}}
      />

    </HomeStack.Navigator>
  );
};

const GoalStack = createStackNavigator<GoalsStack>();
const GoalsStackNavigation = () => {
  return (
    <GoalStack.Navigator screenOptions={{ headerShown: false }}>

      <GoalStack.Screen 
      name="GoalsList"
      component={GoalsList} />

      <GoalStack.Screen 
      name="CreateGoals" 
      component={CreateGoal} />

      <GoalStack.Screen 
      name="InvestGoals" 
      component={InvestGoals} />

      <GoalStack.Screen 
      name="GoalDetails" 
      component={GoalDetails} />

      <GoalStack.Screen 
      name="EditGoals" 
      component={EditGoal} />

    </GoalStack.Navigator>
  );
};

const LancamentosStack = createStackNavigator();
export const LancamentosStackNavigation = () => {
  return (
    <LancamentosStack.Navigator screenOptions={{ headerShown: false }}>

      <LancamentosStack.Screen 
      name="Main" 
      component={FormLancamento} />

      <LancamentosStack.Screen 
      name="AddCategory" 
      component={AddCategory} />

      <LancamentosStack.Screen 
      name="RecognizeVoice" 
      component={RecognizeVoice} />

    </LancamentosStack.Navigator>
  );
};

const MainRoutes: React.FC = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>

      <MainStack.Screen 
      name="Main" 
      component={Main} 
      options={{headerShown: false}}/>

      <MainStack.Screen
        name="StackAccount"
        component={HomeAccountStackNavigation}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="Lancamentos"
        component={LancamentosStackNavigation}
        options={{headerShown: false}}
      />
      <MainStack.Screen 
      name="GoalsStack" 
      component={GoalsStackNavigation}
      options={{headerShown: false}} />
      {/* <MainStack.Screen name="CreateCategory" component={newCategory} /> */}
    </MainStack.Navigator>
  );
};


export default MainRoutes;
