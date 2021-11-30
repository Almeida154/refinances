import React, { useState, useEffect } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native'; 
import { UseMetas } from '../../../../../contexts/GoalsContext';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import { colors, fonts, metrics } from '../../../../../styles';

import GoalItem from '../../../../../components/GoalItem';
import { StackActions } from '@react-navigation/native';

import {
  ScreenDescription,
  Title,
  Subtitle,
} from '../../../Home/components/ManageAccount/styles';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, 'GoalsList'>;
};

const Atuais = ({ navigation }: PropsGoals) => {
  const { metas, handleReadByUserMetas } = UseMetas();

  useEffect(() => {
    // Caso nenhuma meta seja carregada, recarregar
    if (!metas)
      (async function () {
        handleReadByUserMetas(await retornarIdDoUsuario());
      })();
  }, []);

  /*const [metasNaoRealizadas, setMetasNaoRealizadas] = useState(
    !metas ? null : metas.filter(metas => !metas.realizacaoMeta),
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
    const theme: any = useTheme()

    return (
      <ScrollView style={{ backgroundColor: theme.colors.white }}>
        <ScreenDescription>
          <Title>Bem vindo as suas contas!</Title>
          <Subtitle>
            Aqui você consegue editar, excluir ou criar novas contas 🤟
          </Subtitle>
        </ScreenDescription>
        <View style={{ padding: metrics.default.boundaries }}>
          {metas &&
            metas.map((item, index) => {
              // console.log('Item: ', UseMetas);
              if (item.saldoAtualMeta < item.saldoFinalMeta)
                return <GoalItem item={item} key={index} />;
            })}
        </View>
      </ScrollView>
    );
  }
};

export default Atuais;
