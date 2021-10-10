import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

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
        top: -30,
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
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          zIndex: 999,
          padding: 5,
          height: '8%',
        },
        tabBarActiveTintColor: '#EE4266',
        tabBarInactiveTintColor: '#bbb',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon3 name="md-home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Extrato"
        component={Extrato}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon2 name="file-text" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Lancamentos"
        component={() => <View />}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: () => <Icon4 name="plus" color={'#EE4266'} size={24} />,
          tabBarButton: props => {
            return (
              <CustomTabBarButton
                children={props.children}
                onPress={() =>
                  navigation.navigate('Lancamentos', { screen: 'Main' })
                }
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Gráficos"
        component={Charts}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon3 name="stats-chart" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Otimizar"
        component={Variados}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon3 name="rocket" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
