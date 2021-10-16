import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content, TagContainer, Tag } from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import Modalize from '../../../../components/Modalize';

import { Modalize as Modal } from 'react-native-modalize';

import global from '../../../../global';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'FixedExpenses'>;
  route: RouteProp<RootStackParamAuth, 'FixedExpenses'>;
};

const FixedExpenses = ({ navigation }: PropsNavigation) => {
  const [tags, setTags] = useState(global.FIXED_EXPENSES_TAGS);
  const [selectedTags, setSelectedTags] = useState([
    'Luz',
    'Água',
    'Internet',
    'Despesa do mês',
  ]);

  const { user, updateUserProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    console.log(tags, selectedTags);
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  async function next() {
    //navigation.navigate('Password');
  }

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Selecione os gastos fixos"
        subtitle="Seus gastos mensais."
      />

      <Content>
        <TagContainer>
          <Tag></Tag>
          <Tag></Tag>
          <Tag></Tag>
        </TagContainer>

        <Button
          onPress={() => {}}
          title="Outro"
          backgroundColor={colors.platinum}
          color={colors.davysGrey}
        />
      </Content>

      <BottomNavigation onPress={() => next()} description={'Já selecionei!'} />
    </Container>
  );
};

export default FixedExpenses;
