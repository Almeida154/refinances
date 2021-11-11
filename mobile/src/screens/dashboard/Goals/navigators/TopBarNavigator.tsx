import * as React from 'react';

import { View, StatusBar, Text } from 'react-native';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Atuais from '../screens/TabNavigator/Atuais';
import Concluidas from '../screens/TabNavigator/Concluidas';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PropsMainRoutes, { GoalsStack } from '../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';

import Header from '../../components/Header';

export type PropsNavigation = {
  navigation: StackNavigationProp<GoalsStack, 'GoalsList'>;
  route: RouteProp<GoalsStack, 'GoalsList'>;
};

const Tab = createMaterialTopTabNavigator();

export default function TopBarNavigator({ navigation }: PropsNavigation) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: 20,
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <StatusBar backgroundColor="transparent" />

      <Header 
        onBackButton={() => navigation.dispatch(
          StackActions.replace('Main', 
          {screen: 'Home'})
      )} title="Metas" />

      <Tab.Navigator
        initialRouteName="Atuais"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIndicatorStyle: {
            backgroundColor: '#525252',
          },
          tabBarActiveTintColor: '#525252',
        }}>
        <Tab.Screen name="Atuais" component={Atuais} />
        <Tab.Screen name="Concluidas" component={Concluidas} />
      </Tab.Navigator>
    </View>
  );
}
