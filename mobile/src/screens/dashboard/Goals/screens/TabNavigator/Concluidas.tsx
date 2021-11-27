import React, { useState, useEffect } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

import { UseMetas } from '../../../../../contexts/GoalsContext';

import { ActivityIndicator } from 'react-native-paper';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import { Title, Subtitle, Loading, TextLoading } from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts, metrics } from '../../../../../styles';

import Button from '../../../../../components/Button';

import GoalItem from '../../../../../components/GoalItem';
import { StackActions } from '@react-navigation/native';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, 'GoalsList'>;
};

const GoalsAccomplished = ({ navigation }: PropsGoals) => {
  const { metas, handleReadByUserMetas } = UseMetas();
  const [stateReload, setStateReload] = useState(false);

  useEffect(() => {
    // Caso nenhuma meta seja carregada, recarregar
    if (!metas)
      (async function () {
        handleReadByUserMetas(await retornarIdDoUsuario());
      })();
  }, []);

  /*const [metasRealizadas, setMetasRealizadas] = useState(
    !metas ? null : metas.filter(metas => metas.realizacaoMeta),
  );*/

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Main', { screen: 'Home' }));
    return true;
  };

  if (metas && metas.length > 0) {
    return (
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={{ margin: '10%' }}>
          <Title>Parabéns!</Title>

          <Subtitle>
            Continue registrando suas metas financeiras para viver uma vida mais
            confortável
          </Subtitle>
          {metas &&
            metas.map((item, index) => {
              console.log('Item: ', UseMetas);
              if (item.saldoAtualMeta >= item.saldoFinalMeta)
                return <GoalItem item={item} key={index} />;
            })}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: colors.cultured }}>
        <View style={{ margin: '10%', alignItems: 'center' }}>
          <Icon
            name="emoticon-sad-outline"
            size={50}
            color={colors.davysGrey}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
            }}
          />

          <Title>Você ainda não concluiu nenhuma meta!</Title>

          <Subtitle>
            Mas não desanime, é importante investir mensalmente em suas metas
            para concluí-las!
          </Subtitle>

          <Button
            title="Criar nova meta"
            backgroundColor={colors.blackSilver}
            onPress={() => {
              navigation.dispatch(StackActions.replace('CreateGoals'));
            }}
          />
        </View>
      </ScrollView>
    );
  }
};

export default GoalsAccomplished;
