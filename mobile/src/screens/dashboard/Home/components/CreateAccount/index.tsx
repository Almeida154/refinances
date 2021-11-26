import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, Text, ToastAndroid } from 'react-native';

import { StackActions } from '@react-navigation/native';
import InputText from '../../../../../components/InputText';

import Button from '../../../../../components/Button';
import { Conta, UseContas } from '../../../../../contexts/AccountContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import SelectionCategoriesAccount from './components/SelectionCategoriesAccount';

import HeaderTop from '../../../../../components/Header';

import { Container } from './styles';

import fonts from '../../../../../styles/fonts';

import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import { CategoriaConta } from '../../../../../contexts/CategoriesAccountContext';

const CreateAccount = () => {
  const { handleAdicionarConta } = UseContas();

  const { navigation, showNiceToast } = UseDadosTemp();

  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [categoriaConta, setCategoriaConta] = useState<null | CategoriaConta>(
    null,
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('StackAccount', { screen: 'ManageAccount' }),
    );

    return true;
  };

  async function handleCreateAccount() {
    const newConta = {
      descricao: description,
      // @ts-ignore
      saldoConta: parseFloat(value),
      userConta: await retornarIdDoUsuario(),
    } as Conta;

    const response = await handleAdicionarConta(newConta);

    if (response == '') {
      showNiceToast('success', 'Conta criada com sucesso!');
      navigation.dispatch(
        StackActions.replace('StackAccount', { screen: 'ManageAccount' }),
      );
    } else {
      showNiceToast('error', response);
    }
  }

  return (
    <Container>
      <HeaderTop backButton={backAction} title="" />

      <Text
        style={{
          marginBottom: '2%',
          marginTop: '15%',
          fontSize: 20,
          color: '#292929',
          fontFamily: fonts.familyType.black,
        }}>
        Bem vindo à criação de suas contas!
      </Text>

      <Text
        style={{
          marginBottom: '10%',
          fontSize: 15,
          fontFamily: fonts.familyType.regular,
          color: '#292929',
        }}>
        Aqui você adiciona outras contas além da sua principal, como a de outros
        bancos por exemplo.
      </Text>

      <InputText
        onChangeText={setDescription}
        value={description}
        label="Descrição"
        placeholder="Descrição de sua nova conta"
        showClearIcon={false}
        onClear={() => {
          setDescription('');
        }}
      />

      <InputText
        label="Saldo"
        placeholder={'Saldo de sua nova conta'}
        showClearIcon={true}
        isCurrencyInput
        // @ts-ignore
        value={value}
        onClear={() => {
          setValue(0);
        }}
        onChangeValue={(amt: number) => setValue(amt)}
        onChangeText={() => {
          if (value == null) setValue(0.0);
        }}
        keyboardType="decimal-pad"
      />

      <SelectionCategoriesAccount
        categoriaConta={categoriaConta}
        setCategoriaConta={setCategoriaConta}
      />

      <Button
        onPress={handleCreateAccount}
        title="Criar"
        color="#444"
        backgroundColor="#ccc"
      />
    </Container>
  );
};

export default CreateAccount;
