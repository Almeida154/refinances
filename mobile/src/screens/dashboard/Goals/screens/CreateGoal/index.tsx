import React, { useState, useEffect } from 'react';

import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';

import GoalsIcon from '../../../../../assets/images/svg/goalsIcon.svg';

import {
  Container,
  Label,
} from '../../../../../components/InputTextMoney/styles';

import { TextInputMask } from 'react-native-masked-text';

import {
  DadosTempProvider,
  UseDadosTemp,
} from '../../../../../contexts/TemporaryDataContext';

import {
  Lancamento,
  UseLancamentos,
} from '../../../../../contexts/EntriesContext';

import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { colors, fonts, metrics } from '../../../../../styles';

import global from '../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';

import { StackActions } from '@react-navigation/native';
import Header from '../../../../../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { GoalsStack } from '../../../../../@types/RootStackParamApp';

import {
  ScreenDescription,
  Subtitle,
  Title,
} from '../../../Home/components/ManageAccount/styles';

import { Conta } from '../../../../../contexts/AccountContext';
import {
  Parcela,
  UseParcelas,
} from '../../../../../contexts/InstallmentContext';
import PickerContas from '../../../Entries/components/PickerContas';

import ShortHeader from '../../../../../components/ShortHeader';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, 'CreateGoals'>;
};

const CreateGoal = ({ navigation }: PropsGoals) => {
  const { handleAdicionarLancamento } = UseLancamentos();
  const [meta, setMeta] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [investidoMeta, setInvestido] = useState('');
  const [previsao, setPrevisao] = useState(new Date());
  const [realizado, setRealizado] = useState(false);

  //erros
  const [descError, setdescError] = useState<any | null>(null);
  const [valorTError, setvalorTError] = useState<any | null>(null);
  const [investidoError, setinvestidoError] = useState<any | null>(null);
  const [dtPrevError, setdtPrevError] = useState<any | null>(null);

  const [value, setValue] = React.useState(0); // can also be null

  const { handleAdicionarMeta } = UseMetas();

  const dataAtual = new Date();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (dataAtual <= date) {
      setPrevisao(date);
      console.warn('Previsão data final meta: ', date.toLocaleDateString());
      setdtPrevError(null);
    } else {
      setPrevisao(dataAtual);
      console.warn(
        'Previsão data final meta: ',
        dataAtual.toLocaleDateString(),
      );
      setdtPrevError(null);
    }

    hideDatePicker();
  };

  async function handleCreateGoal() {
    const newGoal = {
      id: -1,
      descMeta: meta,
      saldoFinalMeta: parseFloat(valorMeta),
      saldoAtualMeta: parseFloat(investidoMeta),
      dataInicioMeta: dataAtual.toLocaleDateString(),
      dataFimMeta: previsao.toLocaleDateString(),
      realizacaoMeta: realizado,
      userMetaId: await retornarIdDoUsuario(),
      lancamentoMeta: {
        id: -1,
        categoryLancamento: 'Meta',
        descricaoLancamento: 'Depósito para ' + meta,
        essencial: false,
        lugarLancamento: 'extrato',
        parcelaBaseada: -1,
        parcelasLancamento: [
          {
            contaParcela: selectedConta,
            dataParcela: new Date(Date.now()),
            lancamentoParcela: -1,
            statusParcela: sttsParcela(),
            valorParcela: parseFloat(investidoMeta),
          },
        ],
        tipoLancamento: 'despesa',
      },
    } as Meta;

    if (
      meta != '' &&
      parseFloat(valorMeta) > 0 &&
      valorMeta != undefined &&
      parseFloat(investidoMeta) >= 0 &&
      investidoMeta != undefined
    ) {
      parseFloat(investidoMeta) >= parseFloat(valorMeta)
        ? console.log('deu true')
        : setRealizado(false);

      console.log('realizado: ', realizado);
      handleAdicionarMeta(newGoal);
      console.log(newGoal);

      Toast.show({
        type: 'niceToast',
        props: {
          type: 'success',
          title: 'Foi!',
          message: 'Meta cadastrada com sucesso',
        },
      });
      navigation.dispatch(StackActions.replace('Main'));

      //limpando os campos
      setMeta('');
      setValorMeta('');
      setInvestido('');
      setPrevisao(dataAtual);
    } else if (meta == '') {
      setdescError('Descrição obrigatória!');
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Verifique se os dados estão corretos!',
        },
      });
    }
    if (parseFloat(valorMeta) <= 0.0 || valorMeta == '') {
      setvalorTError('Insira um valor válido!');
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Verifique se o valor estão corretos!',
        },
      });
    }
    if (parseFloat(investidoMeta) < 0.0 || investidoMeta == '') {
      setinvestidoError('Insira um valor válido!');
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Verifique se o vslor investido estão corretos!',
        },
      });
    }
  }
  const sttsParcela = () => {
    if (parseFloat(investidoMeta) < parseFloat(valorMeta)) {
      //se nao concluiu continua false
      return false;
    } else if (parseFloat(investidoMeta) >= parseFloat(valorMeta)) {
      //se concluiu manda true
      return true;
    }
  };
  const realizacao = () => {
    parseFloat(investidoMeta) >= parseFloat(valorMeta)
      ? setRealizado(true)
      : setRealizado(false);

    console.log('realizado: ', realizado);
    return realizado;
  };

  const [selectedConta, setSelectedConta] = useState<Conta | null>(null);

  function changeAccount(conta: Conta | null) {
    setSelectedConta(conta);
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Main'));
    return true;
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.cultured,
        paddingTop: metrics.default.statusBarHeight,
      }}>
      <ShortHeader onBackButton={backAction} title="Nova meta" />

      <ScreenDescription style={{ backgroundColor: colors.culture }}>
        <Title>Que bom que resolveu criar uma meta</Title>
        <Subtitle>

          Calcularemos seu investimento mensal e te notificaremos para não
          esquecer.
        </Subtitle>
      </ScreenDescription>
      <View style={styles.container}>
        <View>
          <InputText
            value={meta}
            label="Descrição"
            placeholder="Ex.: Carro novo"
            error={descError}
            showClearIcon={meta != ''}
            onClear={() => {
              setdescError(null);
              setMeta('');
            }}
            onChangeText={txt => {
              setdescError(null);
              setMeta(txt);
            }}
          />
        </View>

        <InputText
          label="Valor total"
          isCurrencyInput
          // @ts-ignore
          value={parseFloat(valorMeta)}
          onChangeValue={(txt: string) => setValorMeta(txt?.toString() || '')}
          placeholderTextColor={'rgba(52, 52, 52, .3)'}
          selectionColor={colors.davysGrey}
          onChangeText={formattedValue => {
            setValorMeta(valorMeta);
          }}
        />

        <InputText
          label="Valor já investido"
          isCurrencyInput
          // @ts-ignore
          value={parseFloat(investidoMeta)}
          onChangeValue={(txt: string) => setInvestido(txt?.toString() || '')}
          selectionColor={colors.davysGrey}
          onChangeText={formattedValue => {
            setInvestido(investidoMeta);
          }}
        />

        {/* DatePicker */}
        <InputText
          label="Previsão conclusão"
          value={previsao.toLocaleDateString()}
          placeholder={previsao.toLocaleDateString()}
          error={dtPrevError}
          showClearIcon={previsao != dataAtual}
          editable={false}
          onPress={showDatePicker}
          onClear={() => {
            setPrevisao(dataAtual);
            setdtPrevError(null);
          }}></InputText>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View
          style={{ display: parseFloat(investidoMeta) > 0 ? 'flex' : 'none' }}>
          <PickerContas
            conta={selectedConta}
            changeAccount={changeAccount}
            tipoLancamento="despesa"
          />
        </View>
        <Button
          onPress={handleCreateGoal}
          title="Criar"
          color={colors.silver}
          style={{ backgroundColor: colors.platinum }}
        />
      </View>
      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: metrics.default.boundaries,
  },
});

export default CreateGoal;
