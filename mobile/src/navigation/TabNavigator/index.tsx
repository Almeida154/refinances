import React, { useLayoutEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, fonts, metrics } from '../../styles';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import Modalize from '../../components/Modalize';
import Button from '../../components/Button';

import { Modalize as Modal } from 'react-native-modalize';

import {
  HomeAccountStackNavigation,
  LancamentosStackNavigation,
} from '../../routes/app.routes';

import RootStackParamApp, {
  FormLancamentoStack,
} from '../../@types/RootStackParamApp';

import { UseDadosTemp } from '../../contexts/TemporaryDataContext';

import Home from '../../screens/dashboard/Home';
import Charts from '../../screens/dashboard/Charts';
import Variados from '../../screens/dashboard/Sundry';
import Extrato from '../../screens/dashboard/Extract';
import FormLancamentos from '../../screens/dashboard/Entries';
import AddCategory from '../../screens/dashboard/Entries/components/AddCategory';
import ManageAccount from '../../screens/dashboard/Home/components/ManageAccount';
import DashboardGoals from '../../screens/dashboard/Goals/screens/DashboardGoals';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';

import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { StackActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator<RootStackParamApp>();

type PropsCustomBar = {
  children: React.ReactNode;
  onPress:
    | ((
        e:
          | React.MouseEvent<HTMLAnchorElement, MouseEvent>
          | GestureResponderEvent,
      ) => void)
    | undefined;
};

const CustomTabBarButton = ({ children, onPress }: PropsCustomBar) => {
  return (
    <TouchableOpacity
      style={{
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const { navigation } = UseDadosTemp();

  const modalizeRef = useRef<Modal>(null);

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  const closeModalize = () => {
    modalizeRef.current?.close();
  };

  return (
    <>
      <Modalize
        ref={modalizeRef}
        title="Escolha uma opção para adicionar o lançamento"
        hasBodyBoundaries>
        <Button
          title="Adição por formulário"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('Lancamentos', { screen: 'Main' }),
            )
          }
          backgroundColor={colors.platinum}
          color={colors.darkGray}
        />
        <Button
          title="Adição por voz"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('Lancamentos', { screen: 'RecognizeVoice' }),
            )
          }
          backgroundColor={colors.platinum}
          color={colors.darkGray}
        />
      </Modalize>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            zIndex: 999,
            padding: 5,
            height: '8%',
          },
          headerShown: false,
          tabBarActiveTintColor: '#EE4266',
          tabBarInactiveTintColor: '#bbb',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon3 name="md-home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Extrato"
          component={Extrato}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon2 name="file-text" color={color} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Lancamentos"
          component={LancamentosStackNavigation}
          options={{
            tabBarLabel: () => null,
            headerShown: false,
            tabBarIcon: () => <Icon4 name="plus" color={'#EE4266'} size={24} />,
            tabBarButton: props => {
              return (
                <CustomTabBarButton
                  children={props.children}
                  onPress={openModalize}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Gráficos"
          component={Charts}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon3 name="stats-chart" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Metas"
          component={DashboardGoals}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon3 name="rocket" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
