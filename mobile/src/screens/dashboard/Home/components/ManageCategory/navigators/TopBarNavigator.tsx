import * as React from 'react';

import { View, StatusBar, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Despesas from '../screens/Despesas';
import Receitas from '../screens/Receitas';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function TopBarNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: 10,
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <StatusBar backgroundColor="transparent" />

      <View
        style={{
          height: '10%',
          justifyContent: 'center',
          padding: 32,
        }}>
        <Text
          style={{
            color: '#525252',
            opacity: 0.6,
            fontSize: 30,
          }}>
          
        </Text>
      </View>

      <Tab.Navigator
        initialRouteName="Despesas"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIndicatorStyle: {
            backgroundColor: '#525252',
          },
          tabBarActiveTintColor: '#525252',
        }}>
        <Tab.Screen name="Despesas" component={Despesas} />
        <Tab.Screen name="Receitas" component={Receitas} />
      </Tab.Navigator>
    </View>
  );
}
