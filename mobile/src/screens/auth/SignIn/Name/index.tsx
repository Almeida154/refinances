import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Name'>;
  route: RouteProp<RootStackParamAuth, 'Name'>;
};

const Name = ({ navigation }: PropsNavigation) => {
  const [name, setName] = useState('');
  const { user, updateUserProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.goBack();
    const newUser = user;
    newUser.name = '';
    updateUserProps(newUser);
    return true;
  };

  async function setUser() {
    if (name == '') return;
    await AsyncStorage.setItem('@userName', name);
    navigation.navigate('Email');
  }

  return <View></View>;
};

export default Name;
