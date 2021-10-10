import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedIncome'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedIncome'>;
};

const EachFixedIncome = ({ navigation }: PropsNavigation) => {
  const [fixedIncomes, setFixedIncomes] = useState('');
  const { user, updateUserProps } = UseAuth();

  //   useEffect(() => {
  //     BackHandler.addEventListener('hardwareBackPress', backAction);
  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', backAction);
  //   }, []);

  //   const backAction = () => {
  //     navigation.goBack();
  //     const newUser = user;
  //     newUser.email = '';
  //     updateUserProps(newUser);
  //     return true;
  //   };

  //   async function setUser() {
  //     if (email == '') return;
  //     await AsyncStorage.setItem('@userEachFixedIncome', email);
  //     navigation.navigate('Password');
  //   }

  return <View></View>;
};

export default EachFixedIncome;
