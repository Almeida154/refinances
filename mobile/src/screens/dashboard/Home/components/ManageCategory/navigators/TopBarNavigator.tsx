import * as React from 'react';

import { View, StatusBar, Text } from 'react-native';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components/native'; 
import Despesas from '../screens/Despesas';
import Receitas from '../screens/Receitas';

import Header from '../../../../components/Header';
import { colors, fonts, metrics } from '../../../../../../styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PropsMainRoutes, {
  HomeAccountStack,
} from '../../../../../../@types/RootStackParamApp';
import ShortHeader from '../../../../../../components/ShortHeader';

export type PropsNavigation = {
  navigation: StackNavigationProp<HomeAccountStack, 'ManageCategory'>;
  route: RouteProp<HomeAccountStack, 'ManageCategory'>;
};

export default function TopBarNavigator({ navigation }: PropsNavigation) {
  const insets = useSafeAreaInsets();
  const theme: any = useTheme()

  return (
    <View
      style={{
        paddingTop: metrics.default.statusBarHeight,
        backgroundColor: theme.colors.white,
        flex: 1,
      }}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <Header
        onBackButton={() =>
          navigation.dispatch(StackActions.replace('Main', { screen: 'Home' }))
        }
        title="Categorias"
        isShort
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
          tabBarStyle: {
            backgroundColor: theme.colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.davysGrey,
          },
          tabBarActiveTintColor: theme.colors.davysGrey,
        }}>
        <Tab.Screen name="Despesas" component={Despesas} />
        <Tab.Screen name="Receitas" component={Receitas} />
      </Tab.Navigator>
    </View>
  );
}
