import React, { useEffect, useState } from 'react';

import { BackHandler } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  ScrollContainer,
  ButtonContainer,
  TagContainer,
  Tag,
} from './styles';
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
  const [tags, setTags] = useState([]);
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
    let tags = global.FIXED_EXPENSES_TAGS as [];
    // let add = [null];
    // let fuckyou = [...tags, ...add];
    // setTags(fuckyou as []);
    setTags(tags);
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  async function next() {
    console.log(selectedTags);
    //navigation.navigate('Password');
  }

  return (
    <Container>
      <ScrollContainer>
        <Header
          onBackButton={() => backAction()}
          title="Selecione os gastos fixos"
          subtitle="Seus gastos mensais."
        />

        <TagContainer>
          {tags.map(tag => (
            <Tag
              onPress={() => {
                if (!selectedTags.includes(tag)) {
                  let newArr = [...selectedTags, tag];
                  setSelectedTags(newArr);
                  return;
                }
                let newArr = selectedTags.filter(
                  tagTouched => tagTouched !== tag,
                );
                setSelectedTags(newArr);
              }}
              style={[
                {
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.08,
                  shadowRadius: 20,
                  elevation: 20,
                },
                selectedTags.includes(tag)
                  ? {
                      backgroundColor: colors.paradisePink,
                      color: colors.white,
                    }
                  : {},
              ]}>
              {tag}
            </Tag>
          ))}
        </TagContainer>

        <ButtonContainer>
          <Button
            onPress={() => {}}
            title="Outro"
            backgroundColor={colors.platinum}
            color={colors.davysGrey}
          />
        </ButtonContainer>
      </ScrollContainer>

      <BottomNavigation onPress={() => next()} description={'Já selecionei!'} />
    </Container>
  );
};

export default FixedExpenses;
