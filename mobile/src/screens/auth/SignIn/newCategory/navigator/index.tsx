import React, { useState, useEffect } from 'react';

import { StatusBar, BackHandler, ToastAndroid } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import NewExpenseCategory from '../NewExpenseCategory';
import NewIncomeCategory from '../NewIncomeCategory';

import { Container } from './styles';
import { colors, fonts } from '../../../../../styles';
import Header from '../../../components/Header';

const Tab = createMaterialTopTabNavigator();

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'NewCategory'>;
  route: RouteProp<RootStackParamAuth, 'NewCategory'>;
};

const TopBarNavigator = ({ navigation, route }: PropsNavigation) => {
  const [routeName, setRouteName] = useState<string>();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backNavAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backNavAction);
  }, [routeName]);

  const backNavAction = () => {
    if (routeName == 'Despesa') {
      navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
      return true;
    }
    navigation.dispatch(StackActions.replace('EachFixedIncomeCategory'));
    return true;
  };

  return (
    <Container
      style={{
        backgroundColor:
          routeName == 'Despesa' ? colors.paradisePink : colors.slimyGreen,
      }}>
      <StatusBar
        backgroundColor={
          routeName == 'Despesa' ? colors.paradisePink : colors.slimyGreen
        }
      />
      <Header
        onBackButton={() => backNavAction()}
        title="Nova categoria"
        color={colors.white}
        isShort
      />
      <Tab.Navigator
        initialRouteName={routeName}
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor:
              routeName == 'Despesa' ? colors.paradisePink : colors.slimyGreen,
          },
          tabBarLabelStyle: {
            fontSize: fonts.size.medium,
            fontFamily: fonts.familyType.bold,
            textTransform: 'capitalize',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarActiveTintColor: colors.white,
        }}
        screenListeners={({ route }) => ({
          state: e => {
            setRouteName(route.name);
          },
        })}>
        <Tab.Screen
          listeners={{
            tabPress: e => {
              if (routeName == 'Receita') e.preventDefault();
              ToastAndroid.show(
                'Desculpe, você não pode fazer isso agora!',
                ToastAndroid.SHORT,
              );
            },
          }}
          name="Despesa"
          component={NewExpenseCategory}
        />
        <Tab.Screen
          listeners={{
            tabPress: e => {
              if (routeName == 'Despesa') e.preventDefault();
              ToastAndroid.show(
                'Desculpe, você não pode fazer isso agora!',
                ToastAndroid.SHORT,
              );
            },
          }}
          name="Receita"
          component={NewIncomeCategory}
        />
      </Tab.Navigator>
    </Container>
  );
};

export default TopBarNavigator;
