import React, { useState, useEffect } from 'react';

import { StatusBar, BackHandler, View } from 'react-native';
import { useTheme } from 'styled-components/native'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import NewExpenseCategory from '../NewExpenseCategory';
import NewIncomeCategory from '../NewIncomeCategory';

import { Container } from './styles';
import { colors, fonts } from '../../../../../styles';
import Header from '../../../components/Header';
import Toast from '@zellosoft.com/react-native-toast-message';
import global from '../../../../../global';

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
  const theme: any = useTheme()

  return (
    <Container
      style={{
        backgroundColor:
          routeName == 'Despesa' ? theme.colors.paradisePink : theme.colors.slimyGreen,
      }}>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <View style={{ elevation: 0 }}>
        <Header
          onBackButton={() => backNavAction()}
          title="Nova categoria"
          color={theme.colors.white}
          isShort
        />
      </View>
      <Tab.Navigator
        initialRouteName={routeName}
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor:
              routeName == 'Despesa' ? theme.colors.paradisePink : theme.colors.slimyGreen,
          },
          tabBarLabelStyle: {
            fontSize: fonts.size.medium,
            fontFamily: fonts.familyType.bold,
            textTransform: 'capitalize',
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.white,
          },
          tabBarActiveTintColor: theme.colors.white,
        }}
        screenListeners={({ route }) => ({
          state: e => setRouteName(route.name),
        })}>
        <Tab.Screen
          listeners={{
            tabPress: e => {
              e.preventDefault();
              var clickedRoute = e.target?.toString();
              clickedRoute = clickedRoute?.substring(
                0,
                clickedRoute.indexOf('-'),
              );

              if (routeName != clickedRoute) {
                // Toast.show({
                //   type: 'niceToast',
                //   position: 'top',
                //   props: {
                //     type: 'warning',
                //     title: 'Ei!',
                //     message: 'Já fez isso antes!',
                //   },
                // });
              }
            },
          }}
          name="Despesa"
          component={NewExpenseCategory}
        />
        <Tab.Screen
          listeners={{
            tabPress: e => {
              e.preventDefault();
              var clickedRoute = e.target?.toString();
              clickedRoute = clickedRoute?.substring(
                0,
                clickedRoute.indexOf('-'),
              );

              if (routeName != clickedRoute) {
                // Toast.show({
                //   type: 'niceToast',
                //   position: 'top',
                //   props: {
                //     type: 'warning',
                //     title: 'Ei!',
                //     message: 'Não pode fazer isso ainda!',
                //   },
                // });
              }
            },
          }}
          name="Receita"
          component={NewIncomeCategory}
        />
      </Tab.Navigator>

      {/* <Toast
        ref={ref => Toast.setRef(ref)}
        topOffset={0}
        config={global.TOAST_CONFIG}
      /> */}
    </Container>
  );
};

export default TopBarNavigator;
