import React, { useEffect, useState } from 'react';

import { BackHandler, StatusBar, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';

// Styles
import { Container } from './styles';
import { colors } from '../../../../../styles';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'NewExpenseCategory'>;
  route: RouteProp<RootStackParamAuth, 'NewExpenseCategory'>;
};

const NewExpenseCategory = ({ navigation }: PropsNavigation) => {
  return (
    <Container>
      <Text>Hello world!</Text>
    </Container>
  );
};

export default NewExpenseCategory;
