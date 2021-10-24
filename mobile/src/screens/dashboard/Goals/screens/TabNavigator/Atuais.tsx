import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

import { UseMetas } from '../../../../../contexts/GoalsContext';

import { ActivityIndicator } from 'react-native-paper';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import goalsJson from './goals.json';

import { Title, Subtitle, Loading, TextLoading } from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '../../../../../components/Button';

import CardGoals from './CardGoals';
import { StackActions } from '@react-navigation/native';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, 'GoalsList'>;
};

const Goals = ({ navigation }: PropsGoals) => {
  const { metas, handleReadByUserMetas } = UseMetas();
  const [stateReload, setStateReload] = useState(false);

  useEffect(() => {
    if (!navigation.addListener) return;

    const focus = navigation.addListener('focus', () => {
      setStateReload(false);
    });

    const blur = navigation.addListener('blur', () => {
      setStateReload(true);
    });
  }, [navigation]);

  useEffect(() => {
    // Caso nenhuma meta seja carregada, recarregar
    if (!metas)
      (async function () {
        handleReadByUserMetas(await retornarIdDoUsuario());
      })();
  }, []);

  const [metasNaoRealizadas, setMetasNaoRealizadas] = useState(
    metas.filter(metas => !metas.realizacaoMeta),
  );

  if (metasNaoRealizadas.length > 0) {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        {stateReload ? (
          <Loading>
            <ActivityIndicator size="large" color="#E8871E" />
            <TextLoading>Carregando...</TextLoading>
          </Loading>
        ) : (
          <View style={{ margin: '10%' }}>
            <Subtitle>
              Registre os depósitos para acompanhar o progresso de suas metas
            </Subtitle>

            {metasNaoRealizadas &&
              metasNaoRealizadas.map((item, index) => {
                console.log('Item: ', metasNaoRealizadas);
                return <CardGoals item={item} key={index} />;
              })}
          </View>
        )}
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
        <View style={{ margin: '10%', alignItems: 'center' }}>
          <Icon
            name="emoticon-sad-outline"
            size={50}
            color="#525252"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
            }}
          />

          <Title>Você não tem metas ativas!</Title>

          <Subtitle>
            Metas financeiras são muito importantes para realizar seus
            propósitos, não deixe de criar e gerenciá-las
          </Subtitle>

          <Button
            title="Criar nova meta"
            backgroundColor="#ee4266"
            onPress={() => {
              navigation.dispatch(StackActions.replace('CreateGoals'))
            }}></Button>
        </View>
      </ScrollView>
    );
  }
};

export default Goals;
