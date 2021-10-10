import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Password'>;
  route: RouteProp<RootStackParamAuth, 'Password'>;
};

const Password = ({ route, navigation }: PropsNavigation) => {
  const [password, setPassword] = useState('');
  const { user, updateUserProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.goBack();
    const newUser = user;
    newUser.password = '';
    updateUserProps(newUser);
    return true;
  };

  async function setUser() {
    if (password == '') return;
    navigation.navigate('ConfirmPassword');
  }

  return <View></View>;
};

export default Password;
