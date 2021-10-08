import * as React from 'react';

import { View, StatusBar, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Atuais from '../screens/TabNavigator/Atuais';
import Concluidas from '../screens/TabNavigator/Concluidas';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function TopBarNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: 20,
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <StatusBar translucent backgroundColor="transparent" />

      <View
        style={{
          height: '20%',
          justifyContent: 'center',
          padding: 32,
        }}>
        <Text
          style={{
            color: '#525252',
            opacity: 0.6,
            fontSize: 30,
          }}>
          Metas
        </Text>
      </View>

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
