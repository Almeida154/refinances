import React, { useState, useEffect } from 'react';

import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import {
  DadosTempProvider,
  UseDadosTemp,
} from '../../../../../contexts/TemporaryDataContext';

import {Lancamento, UseLancamentos} from '../../../../../contexts/EntriesContext';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import fonts from '../../../../../styles/fonts';
import { StackActions } from 'react-navigation';
import Header from '../components/Header';

const CreateGoal = () => {
  const {handleAdicionarLancamento} = UseLancamentos()
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

  const { handleAdicionarMeta } = UseMetas();
  const { navigation } = UseDadosTemp();

  const dataAtual = new Date();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (dataAtual <= date ) {
      setPrevisao(date);
      console.warn('Previsão data final meta: ', date.toLocaleDateString());
      setdtPrevError(null);
    } else {
      setPrevisao(dataAtual);
      console.warn('Previsão data final meta: ', dataAtual.toLocaleDateString());
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
        categoryLancamento: "Meta",
        descricaoLancamento: "Depósito para " + meta,
        essencial: false,
        lugarLancamento: 'extrato',
        parcelaBaseada: -1,
        parcelasLancamento: [],
        tipoLancamento: 'despesa'
      }
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

      console.log("realizado: ", realizado);
      handleAdicionarMeta(newGoal);
      console.log(newGoal);
      
      ToastAndroid.show("Meta cadastrada com sucesso", ToastAndroid.SHORT);
      navigation.dispatch(StackActions.replace('Main'));

    } else if (meta == '') {
      setdescError('Descrição obrigatória!');
    }
    if (parseFloat(valorMeta) <= 0 || valorMeta == '') {
      setvalorTError('Insira um valor válido!');
    }
    if (parseFloat(investidoMeta) < 0 || investidoMeta == '') {
      setinvestidoError('Insira um valor válido!');
    }
    
  }
  
  const realizacao = () => {
    parseFloat(investidoMeta) >= parseFloat(valorMeta)
      ? setRealizado(true)
      : setRealizado(false);

      console.log("realizado: ", realizado)
    return realizado;

  };

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Main'));
    return true;
  };

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
      <Header onBackButton={() => backAction()} title="" />
      <View style={styles.container}>
        <Text
          style={{
            marginTop: '25%',
            marginBottom: '2%',
            fontSize: 20,
            color: '#292929',
            fontFamily: fonts.familyType.black,
          }}>
          Que bom que decidiu criar uma meta!
        </Text>

        <Text
          style={{
            marginBottom: '10%',
            fontSize: 15,
            fontFamily: fonts.familyType.regular,
            color: '#292929',
          }}>
          Calcularemos seu investimento mensal e te notificaremos para não
          esquecer ;)
        </Text>

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

        <View>
          <InputText
            value={valorMeta}
            label="Valor"
            placeholder="Ex.: R$ 1.000,00"
            error={valorTError}
            showClearIcon={valorMeta != ''}
            onClear={() => {
              setvalorTError(null);
              setValorMeta('');
            }}
            onChangeText={txt => {
              setvalorTError(null);
              setValorMeta(txt);
            }}
            keyboardType="numeric"
          />
        </View>

        <View>
          <InputText
            value={investidoMeta}
            label="Valor já investido"
            placeholder="Ex.: R$ 100,00"
            error={investidoError}
            showClearIcon={investidoMeta != ''}
            onClear={() => {
              setinvestidoError(null);
              setInvestido('');
            }}
            onChangeText={txt => {
              setinvestidoError(null);
              setInvestido(txt);
            }}
            keyboardType="numeric"
          />
        </View>

        {/* DatePicker */}
        <InputText
          label="Previsão conclusão"
          value={previsao.toLocaleDateString()}
          placeholder={previsao.toLocaleDateString()}
          error={dtPrevError}
          showClearIcon={previsao != dataAtual}
          onPressIn={showDatePicker}
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

        <Button
          onPress={handleCreateGoal}
          title="Criar"
          backgroundColor="#CCC"
          color="#444"
          lastOne={true}
        />
      </View>
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

export default CreateGoal;
