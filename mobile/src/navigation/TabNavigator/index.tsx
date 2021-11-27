import React, { useLayoutEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, fonts, metrics } from '../../styles';
import { widthPixel, heightPixel } from '../../helpers/responsiveness';

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
// import Variados from '../../screens/dashboard/Sundry';
import Extrato from '../../screens/dashboard/Extract';
// import FormLancamentos from '../../screens/dashboard/Entries';
// import AddCategory from '../../screens/dashboard/Entries/components/AddCategory';
// import ManageAccount from '../../screens/dashboard/Home/components/ManageAccount';
import DashboardGoals from '../../screens/dashboard/Goals/screens/DashboardGoals';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { GestureResponderEvent, TouchableOpacity, Animated } from 'react-native';

import { StackActions } from '@react-navigation/native';
import hexToRGB from '../../helpers/hexToRgba';
import shadowBox from '../../helpers/shadowBox';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import FabButton from './components/FabButton';

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

/*const CustomTabBarButton = ({ children, onPress }: PropsCustomBar) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          width: widthPixel(200),
          height: widthPixel(200),
          borderRadius: widthPixel(200 / 2),
          backgroundColor: colors.white,
          marginTop: widthPixel(-(200 / 2)),
        },
        shadowBox(14, 0.5),
      ]}>
      <Animated.View style={{position: 'absolute'}}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};*/

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
          title="Inserção por formulário"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('Lancamentos', { screen: 'Main' }),
            )
          }
          backgroundColor={colors.platinum}
          color={colors.darkGray}
        />
        <Button
          title="Inserção por voz"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('Lancamentos', { screen: 'RecognizeVoice' }),
            )
          }
          style={{ marginBottom: heightPixel(170) }}
          backgroundColor={colors.platinum}
          color={colors.darkGray}
        />
      </Modalize>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.white,
            paddingBottom: 10,
            paddingTop: 10,
            height: heightPixel(200),
          },
          tabBarLabelStyle: {
            fontFamily: fonts.familyType.bold,
            fontSize: fonts.size.small,
            marginTop: 0,
          },
          headerShown: false,
          tabBarActiveTintColor: colors.redCrayola,
          tabBarInactiveTintColor: colors.silver,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="md-home"
                color={hexToRGB(color, 0.4)}
                size={widthPixel(65)}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Extrato"
          component={Extrato}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather
                name="file-text"
                color={hexToRGB(color, 0.4)}
                size={widthPixel(65)}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Lancamentos"
          component={LancamentosStackNavigation}
          options={{
            tabBarLabel: () => null,
            headerShown: false,
            tabBarIcon: () => (
              <Entypo
                name="plus"
                color={colors.redCrayola}
                size={widthPixel(65)}
              />
            ),
            tabBarButton: props => {
              return (
                <FabButton/>
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
              <Ionicons
                name="stats-chart"
                color={hexToRGB(color, 0.4)}
                size={widthPixel(65)}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Metas"
          component={DashboardGoals}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="rocket"
                color={hexToRGB(color, 0.4)}
                size={widthPixel(65)}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
