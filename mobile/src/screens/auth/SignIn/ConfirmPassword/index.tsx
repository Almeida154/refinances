import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'ConfirmPassword'>;
  route: RouteProp<RootStackParamAuth, 'ConfirmPassword'>;
};

const ConfirmPassword = ({ route, navigation }: PropsNavigation) => {
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (confirmPassword == '') return;
    await AsyncStorage.setItem('@userPassword', confirmPassword);
    navigation.navigate('Photo');
  }

  return <View></View>;
};

export default ConfirmPassword;
