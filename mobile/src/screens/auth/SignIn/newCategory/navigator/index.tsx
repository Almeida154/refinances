import React, { useState, useEffect } from 'react';

import { View, StatusBar, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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

const TopBarNavigator = ({ route, navigation }: PropsNavigation) => {
  const [currentRoute, setCurrentRoute] = useState('Despesa');

  useEffect(() => {}, []);

  return (
    <Container
      style={{
        backgroundColor:
          currentRoute == 'Despesa' ? colors.paradisePink : colors.slimyGreen,
      }}>
      <StatusBar
        backgroundColor={
          currentRoute == 'Despesa' ? colors.paradisePink : colors.slimyGreen
        }
      />
      <Header
        onBackButton={() => {}}
        title="Nova categoria"
        color={colors.white}
        isShort
      />
      <Tab.Navigator
        initialRouteName={currentRoute}
        screenOptions={{
          tabBarStyle: {
            backgroundColor:
              currentRoute == 'Despesa'
                ? colors.paradisePink
                : colors.slimyGreen,
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
            setCurrentRoute(route.name);
          },
        })}>
        <Tab.Screen
          listeners={{
            tabPress: e => {
              //console.log(e);
            },
            swipeStart: e => {
              console.log('começou');
            },
          }}
          name="Despesa"
          component={NewExpenseCategory}
        />
        <Tab.Screen
          listeners={{
            tabPress: e => {
              //e.preventDefault();
              //console.log(e);
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
