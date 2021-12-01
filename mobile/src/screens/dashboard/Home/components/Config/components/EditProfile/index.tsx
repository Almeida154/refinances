import React, { useState, useEffect } from 'react';

import InputText from '../../../../../../../components/InputText';
import Button from '../../../../../../../components/Button';

import { UseAuth, User } from '../../../../../../../contexts/AuthContext';
import { isEmailValid } from '../../../../../../../helpers/verifyEmail';

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

  const { user, handleUpdateUser, emailExists } = UseAuth();
  let atual = '';

  useEffect(() => {
    (async () => {
      const edit = (route.params?.route);
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
    
    editar()

    if (novoValor == '' || valorError != '') {
      console.warn('erro', valorError);
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: ' '+valorError,
        },
      });
    }
    else {
      handleUpdateUser(editar(), user.id);
      console.warn('erro: ', valorError)
      navigation.dispatch(StackActions.replace('StackAccount', { screen: 'Config' }),);
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
      if(novoValor == '' || (!isEmailValid(novoValor) || (emailExists(novoValor)))){
        setValorError('Preencha o email corretamente!')
        console.log('email: ',valorError);
        
      }else{
        setValorError('')
        newUser.emailUsuario = novoValor
        
      }
    }
    else if (edit == 'nome'){
      if(novoValor == ''){
        setValorError('Preencha o novo nome!');
        console.log('nome: ',valorError);
      }
      else{
        setValorError('')
        newUser.nomeUsuario = novoValor
      }
    }
    else {
      if (hasAtLeastOneLetter(novoValor) && isValid(novoValor)
      && hasAtLeastOneNumber(novoValor) && hasMinimum(novoValor)){
          setValorError('');
          newUser.senhaUsuario = novoValor;
        }
      else {
        setValorError('Preencha a senha corretamente');
        console.log('senha: ', valorError);
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
              secureTextEntry={edit == 'senha'}
              keyboardType={edit == 'email' ? 'email-address' : 'default'}
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
            style={{backgroundColor:colors.davysGrey,}}
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