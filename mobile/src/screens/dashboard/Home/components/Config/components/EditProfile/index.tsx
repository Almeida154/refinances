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

import { 
  Container, 
  Requisit,
  RequisitContainer,
  InputController } from './styles';

import global from '../../../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../../../components/NiceToast';

import { fonts, colors } from '../../../../../../../styles';
import { RouteProp, StackActions } from '@react-navigation/native';
import ShortHeader from '../../../../../../../components/ShortHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeAccountStack } from '../../../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

// Util
import {
  hasMinimum,
  hasAtLeastOneNumber,
  hasAtLeastOneLetter,
  isValid,
} from '../../../../../../../helpers/verifyPassword';

type PropsEditProfile = {
  navigation: StackNavigationProp<HomeAccountStack, 'EditProfile'>;
  route: RouteProp<HomeAccountStack, 'EditProfile'>;
};

const EditProfile = ({ route, navigation }: PropsEditProfile) => {

  const { user, handleUpdateUser, updateSetupUserProps } = UseAuth();
  let atual = '';

  useEffect(() => {
    (async () => {
      const edit = (route.params?.route);
      //console.log(edit);
      setEdit(edit);

      //console.log(novoValor)
      atual = retornaValorAtual();
      setNovoValor(atual)
    })();
  }, []);

  const [ edit, setEdit ] = useState('');
  const [valorError, setValorError] = useState('');

  const retornaValorAtual = () => {
    if(edit == 'nome') return user.nomeUsuario;
    else if (edit == 'email') return user.emailUsuario;
    else return '';
  }

  const [novoValor, setNovoValor] = useState(atual);

  async function handleAlterarUser() {
    
    if (valorError != '') {

      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: valorError,
        },
      });
      //navigation.dispatch(StackActions.replace('StackAccount', { screen: 'Config' }),);
    } 
    else {
      handleUpdateUser(editar(), user.id);
      //console.log(editar());

      Toast.show({
        type: 'niceToast',
        props: {
          type: 'success',
          title: 'Foi!',
          message: edit+' alterado com sucesso!',
        },
      });
    }
  }

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('StackAccount', { screen: 'Config' }),
    );
    return true;
  };

  const editar = () => {
    var newUser = user;

    if(edit == 'email'){
      if(novoValor != 'pica'){
        newUser.emailUsuario = novoValor
      }else{
        setValorError('ERRO NO EMAIL')
      }
    }
    else if (edit == 'nome'){
      if(novoValor != ''){
        setValorError('Preencha o novo nome!');
        console.log(valorError);
      }
      else{
        newUser.nomeUsuario = novoValor
      }
    }
    else {
      if (hasAtLeastOneLetter(novoValor) && isValid(novoValor)
      && hasAtLeastOneLetter(novoValor) && hasMinimum(novoValor)){
          newUser.senhaUsuario = novoValor;
        }
      else {
        setValorError('porraaaa ERRO ERRO ERRO ')
      }
    }

    return newUser;
  }

  return (
    <View style={{ backgroundColor: colors.cultured }}>
      <Container>

        <ShortHeader 
          onBackButton={backAction}
          title={'Alterar '+edit} />

          <InputController>
            <InputText
              value={novoValor}
              label={edit == 'senha' ? 'Nova '+edit : 'Novo '+edit}
              placeholder={edit == 'senha' ? 'Nova '+edit : 'Novo '+edit}
              showClearIcon={novoValor != ''}
              onClear={() => {
                setNovoValor('');
              }}
              onChangeText={txt => {
                setNovoValor(txt);
              }}
            />
          </InputController>

          <RequisitContainer>
            <Requisit style={edit == 'senha' ? { display: 'flex' } : { display: 'none' }}>
              ● Pelo menos 6 caracteres
            </Requisit>
            <Requisit style={edit == 'senha' ? { display: 'flex' } : { display: 'none' }}>
              ● Deve conter letras e números
            </Requisit>
          </RequisitContainer>
            
          <InputController>
          <Button
            onPress={handleAlterarUser}
            title="Salvar"
            style={{backgroundColor:colors.culture,}}
            color={colors.silver}
            lastOne={true}
          />
          </InputController>

      </Container>

      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </View>
  );
};

export default EditProfile;