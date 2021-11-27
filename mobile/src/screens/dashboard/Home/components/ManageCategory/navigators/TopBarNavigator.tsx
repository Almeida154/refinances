import * as React from 'react';

import { View, StatusBar, Text } from 'react-native';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Despesas from '../screens/Despesas';
import Receitas from '../screens/Receitas';

import Header from '../../../../components/Header';
import { colors, fonts } from '../../../../../../styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PropsMainRoutes, {
  HomeAccountStack,
} from '../../../../../../@types/RootStackParamApp';

export type PropsNavigation = {
  navigation: StackNavigationProp<HomeAccountStack, 'ManageCategory'>;
  route: RouteProp<HomeAccountStack, 'ManageCategory'>;
};

export default function TopBarNavigator({ navigation }: PropsNavigation) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: 0,
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <StatusBar backgroundColor="transparent" />

      <Header
        onBackButton={() =>
          navigation.dispatch(StackActions.replace('Main', { screen: 'Home' }))
        }
        title="Categorias"
      />

      <Tab.Navigator
        initialRouteName="Despesas"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: fonts.size.medium,
            fontFamily: fonts.familyType.bold,
            textTransform: 'capitalize',
            justifyContent: 'center',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.davysGrey,
          },
          tabBarActiveTintColor: colors.davysGrey,
        }}>
        <Tab.Screen name="Despesas" component={Despesas} />
        <Tab.Screen name="Receitas" component={Receitas} />
      </Tab.Navigator>
    </View>
  );
}
