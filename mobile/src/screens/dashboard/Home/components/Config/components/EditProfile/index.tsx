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

  const [valorError, setValorError] = useState<any | null>(null);

  const retornaValorAtual = () => {
    if(edit == 'nome') return user.nomeUsuario;
    else if (edit == 'email') return user.emailUsuario;
    else return '';
  }

  const [novoValor, setNovoValor] = useState(atual);

  async function handleAlterarUser() {
    
    if (novoValor != '' && novoValor != atual) {

      handleUpdateUser(editar(), user.id);
      console.log(editar());

      Toast.show({
        type: 'niceToast',
        props: {
          type: 'success',
          title: 'Foi!',
          message: edit+' alterado com sucesso!',
        },
      });
      navigation.dispatch(StackActions.replace('StackAccount', { screen: 'Config' }),);
    } 
    else {
      setValorError('Preencha o campo!');
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Preencha o campo.',
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
      newUser.emailUsuario = novoValor
    }
    else if (edit == 'nome'){
      newUser.nomeUsuario = novoValor
    }
    else {
      newUser.senhaUsuario = novoValor
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