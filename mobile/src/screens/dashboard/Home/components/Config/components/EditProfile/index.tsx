import React, { useState, useEffect } from 'react';

import InputText from '../../../../../../../components/InputText';
import Button from '../../../../../../../components/Button';

import { UseAuth, User } from '../../../../../../../contexts/AuthContext';
import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario';

import {
  DadosTempProvider,
  UseDadosTemp,
} from '../../../../../../../contexts/TemporaryDataContext';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Container, Title, InputController } from './styles';

import global from '../../../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../../../components/NiceToast';

import { fonts, colors } from '../../../../../../../styles';
import { RouteProp, StackActions } from '@react-navigation/native';
import ShortHeader from '../../../../../../../components/ShortHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeAccountStack } from '../../../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

type PropsEditProfile = {
  navigation: StackNavigationProp<HomeAccountStack, 'EditProfile'>;
  route: RouteProp<HomeAccountStack, 'EditProfile'>;
};

const EditProfile = ({ route, navigation }: PropsEditProfile) => {

  const { user, token } = UseAuth();
  const [ atual, setAtual ] = useState('');

  useEffect(() => {
    (async () => {
      const edit = (route.params?.route);
      //console.log(edit);
      setEdit(edit);

      //console.log(novoValor)
    })();
  }, []);

  const [ edit, setEdit ] = useState('');

  const [valorError, setValorError] = useState<any | null>(null);

  const retornaValorAtual = () => {
    if(edit == 'nome') setNovoValor (user.nomeUsuario);
    else if (edit == 'email') console.log (user.emailUsuario);
    else console.log ('');
  }

  const [novoValor, setNovoValor] = useState('');

  /*async function handleUpdateGoal() {
    const newGoal = {
      descMeta: novoDesc(),
      saldoFinalMeta: novoSaldoFinal(),
      saldoAtualMeta: goal.saldoAtualMeta,
      dataInicioMeta: goal.dataInicioMeta,
      dataFimMeta: previsao.toLocaleDateString(),
      realizacaoMeta: realizacao(),
      userMetaId: await retornarIdDoUsuario(),
    } as Meta;

    if (meta != '' || (valorMeta) > 0 && valorMeta != undefined) {
      goal.saldoAtualMeta >= (valorMeta)
        ? console.log('deu true')
        : setRealizado(false);

      console.log('realizado: ', realizado);
      handleAtualizarMeta(newGoal, goal.id);
      console.log(newGoal);

      Toast.show({
        type: 'niceToast',
        props: {
          type: 'success',
          title: 'Foi!',
          message: 'Meta atualizada com sucesso!',
        },
      });
      navigation.dispatch(StackActions.replace('GoalsStack', { screen: 'GoalsList' }),);
    } else if (meta == '' || (valorMeta) <= 0 || valorMeta == 0) {
      setdescError('Insira alguma descricao diferente!');
      setvalorTError('Insira algum valor!');
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Verifique se os dados estão corretos!',
        },
      });
    }
  }*/

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('StackAccount', { screen: 'Config' }),
    );
    return true;
  };

  return (
    <ScrollView style={{ backgroundColor: colors.cultured }}>
      <Container>

        <ShortHeader 
          onBackButton={backAction}
          title={'Alterar '+edit} />

          <InputController>
            <InputText
              value={novoValor}
              label={edit == 'senha' ? 'Nova '+edit : 'Novo '+edit}
              placeholder={edit == 'senha' ? 'Nova '+edit : 'Novo '+edit}
              error={valorError}
              showClearIcon={novoValor != ''}
              onClear={() => {
                setValorError(null);
                setNovoValor('');
              }}
              onChangeText={txt => {
                setValorError(null);
                setNovoValor(txt);
              }}
            />
          </InputController>
            
          <InputController>
          <Button
            onPress={() => console.log('foi')}
            title="Salvar"
            style={{backgroundColor:colors.culture,}}
            color={colors.silver}
            lastOne={true}
          />
          </InputController>

      </Container>

      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '0%',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default EditProfile;
