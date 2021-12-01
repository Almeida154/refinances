import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  ContainerForm,
  InputControl,
  InputView,
  LabelView,
  Container,
} from './styles';

import { colors } from '../../../../../styles';

import Button from '../../../../../components/Button';

import {
  UseTransferencias,
  Transferencia,
} from '../../../../../contexts/TransferContext';

import InputText from '../../../../../components/InputText';
import InputTextView from '../InputTextView';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { PropsNavigation } from '../..';
import { Text, ToastAndroid } from 'react-native';
import PickerContas from '../PickerContas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from 'react-native-paper';
import { Conta } from '@contexts/AccountContext';

const FormTransferencia = ({
  route,
  valor,
  setValor,
  navigation,
}: PropsNavigation) => {
  const [selectedContaOrigem, setSelectedContaOrigem] = useState<Conta | null>(
    null,
  );
  const [selectedContaDestino, setSelectedContaDestino] =
    useState<Conta | null>(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [dataPagamento, setDataPagamento] = useState(new Date(Date.now()));

  const { handleAdicionarTransferencia, handleLoadTransferencias } =
    UseTransferencias();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date: Date) => {
    setDataPagamento(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSubmit = async () => {
    const newTransferencia: Transferencia = {
      id: -1,
      contaOrigem:
        selectedContaOrigem == null ? ({} as Conta) : selectedContaOrigem,
      contaDestino:
        selectedContaDestino == null ? ({} as Conta) : selectedContaDestino,
      dataTransferencia: dataPagamento,
      descricaoTransferencia: descricao,
      valorTransferencia: parseFloat(valor),
    };

    const getUser = await AsyncStorage.getItem('user');
    const idUser = JSON.parse(getUser == null ? '{id: 0}' : getUser).id;

    const message = await handleAdicionarTransferencia(newTransferencia);

    if (message == '') {
      ToastAndroid.show('Transferencia adicionada', ToastAndroid.SHORT);
      setDescricao('');
      setSelectedContaDestino(null);
      setSelectedContaOrigem(null);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };
  const theme: any = useTheme();

  return (
    <ScrollView style={{ width: '100%' }}>
      <ContainerForm>
        <InputControl>
          <InputText
            onClear={() => {}}
            showClearIcon={false}
            label="Descrição"
            colorLabel={theme.colors.jet}
            value={descricao}
            onChangeText={setDescricao}
            placeholderTextColor={theme.colors.silver}
            placeholder="Descrição de sua transferência"></InputText>
        </InputControl>

        <InputControl>
          <PickerContas
            conta={selectedContaOrigem}
            changeAccount={setSelectedContaOrigem}
            tipoLancamento="despesa"
            label="Conta Origem"
          />
        </InputControl>

        <InputControl>
          <PickerContas
            conta={selectedContaDestino}
            changeAccount={setSelectedContaDestino}
            tipoLancamento="receita"
            label="Conta Destino"
          />
        </InputControl>

        <InputControl style={{ marginBottom: 50 }}>
          <InputTextView
            value={dataPagamento.toLocaleDateString()}
            label="Data de Efetuação"
            colorLabel={theme.colors.jet}
            onPress={showDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={dataPagamento}
          />
        </InputControl>

        <Button
          title="Adicionar"
          onPress={handleSubmit}
          style={{
            backgroundColor: theme.colors.jet,
          }}
          color={theme.colors.silver}
        />
      </ContainerForm>
    </ScrollView>
  );
};

export default FormTransferencia;
