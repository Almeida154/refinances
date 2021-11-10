import * as React from 'react';

import Login from '../screens/auth/LogIn';

import PasswordRecovery from '../screens/auth/PasswordRecovery';

import Name from '../screens/auth/SignIn/Name';
import Email from '../screens/auth/SignIn/Email';
import Password from '../screens/auth/SignIn/Password';
import ConfirmPassword from '../screens/auth/SignIn/ConfirmPassword';
import Photo from '../screens/auth/SignIn/Photo';

import NewCategory from '../screens/auth/SignIn/newCategory/navigator';

import FixedExpenses from '../screens/auth/SignIn/FixedExpenses';
import EachFixedExpense from '../screens/auth/SignIn/EachFixedExpense';
import EachFixedExpenseCategory from '../screens/auth/SignIn/EachFixedExpenseCategory';

import FixedIncomes from '../screens/auth/SignIn/FixedIncomes';
import EachFixedIncome from '../screens/auth/SignIn/EachFixedIncome';
import EachFixedIncomeCategory from '../screens/auth/SignIn/EachFixedIncomeCategory';

import StatsInitial from '../screens/auth/SignIn/StatsInitial';

import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="PasswordRecovery" component={PasswordRecovery} />

      <AuthStack.Screen name="Name" component={Name} />
      <AuthStack.Screen name="Email" component={Email} />
      <AuthStack.Screen name="Password" component={Password} />
      <AuthStack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <AuthStack.Screen name="Photo" component={Photo} />

      <AuthStack.Screen name="NewCategory" component={NewCategory} />

      <AuthStack.Screen name="FixedExpenses" component={FixedExpenses} />
      <AuthStack.Screen name="EachFixedExpense" component={EachFixedExpense} />
      <AuthStack.Screen
        name="EachFixedExpenseCategory"
        component={EachFixedExpenseCategory}
      />

      <AuthStack.Screen name="FixedIncomes" component={FixedIncomes} />
      <AuthStack.Screen name="EachFixedIncome" component={EachFixedIncome} />
      <AuthStack.Screen
        name="EachFixedIncomeCategory"
        component={EachFixedIncomeCategory}
      />

      <AuthStack.Screen name="StatsInitial" component={StatsInitial} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
