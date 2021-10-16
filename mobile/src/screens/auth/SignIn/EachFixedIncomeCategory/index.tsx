import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Email'>;
  route: RouteProp<RootStackParamAuth, 'Email'>;
};

const EachFixedIncomeCategory = ({ route, navigation }: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const { user, updateUserProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.goBack();
    const newUser = user;
    newUser.emailUsuario = '';
    updateUserProps(newUser);
    return true;
  };

  async function setUser() {
    if (email == '') return;
    await AsyncStorage.setItem('@userEmail', email);
    navigation.navigate('Password');
  }

  return <View></View>;
};

export default EachFixedIncomeCategory;
