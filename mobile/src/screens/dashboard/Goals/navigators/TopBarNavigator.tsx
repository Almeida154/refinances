import * as React from 'react';

import { View, StatusBar, Text } from 'react-native';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Atuais from '../screens/TabNavigator/Atuais';
import Concluidas from '../screens/TabNavigator/Concluidas';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PropsMainRoutes, {
  GoalsStack,
} from '../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';

import { colors, fonts, metrics } from '../../../../styles';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';

import Header from '../../components/Header';

export type PropsNavigation = {
  navigation: StackNavigationProp<GoalsStack, 'GoalsList'>;
  route: RouteProp<GoalsStack, 'GoalsList'>;
};

const Tab = createMaterialTopTabNavigator();

export default function TopBarNavigator({ navigation }: PropsNavigation) {
  const insets = useSafeAreaInsets();
  const theme: any = useTheme();

  return (
    <View
      style={{
        paddingTop: metrics.default.statusBarHeight,
        backgroundColor: theme.colors.lightGray,
        flex: 1,
      }}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <Header
        onBackButton={() =>
          navigation.dispatch(StackActions.replace('Main', { screen: 'Home' }))
        }
        title="Metas"
        isShort
        color={theme.colors.davysGray}
      />

      <Tab.Navigator
        initialRouteName="Atuais"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.lightGray,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.jet,
          },
          tabBarActiveTintColor: theme.colors.davysGray,
          tabBarLabelStyle: {
            fontSize: fonts.size.medium,
            fontFamily: fonts.familyType.bold,
            textTransform: 'capitalize',
            justifyContent: 'center',
          },
        }}>
        {/* @ts-ignore */}
        <Tab.Screen name="Atuais" component={Atuais} />
        <Tab.Screen name="Concluidas" component={Concluidas} />
      </Tab.Navigator>
    </View>
  );
}
