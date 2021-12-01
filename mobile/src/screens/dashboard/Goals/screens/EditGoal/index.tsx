import React, { useState, useEffect } from 'react';

import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import { useTheme } from 'styled-components/native';
import {
  DadosTempProvider,
  UseDadosTemp,
} from '../../../../../contexts/TemporaryDataContext';

import { ScrollView, StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { TextRS, TextValor, Title, Valor } from './styles';

import global from '../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';

import { fonts, colors } from '../../../../../styles';
import { RouteProp, StackActions } from '@react-navigation/native';
import Header from '../../../../../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

type PropsEditGoals = {
  navigation: StackNavigationProp<GoalsStack, 'EditGoals'>;
  route: RouteProp<GoalsStack, 'EditGoals'>;
};

const EditGoal = ({ route, navigation }: PropsEditGoals) => {
  const [goal, setGoal] = useState({} as Meta);

  const { handleGetGoalById } = UseMetas();

  useEffect(() => {
    (async () => {
      const goal = await handleGetGoalById(route.params?.goalId);
      setGoal(goal);
      console.debug('O GOAL AQUI Ó:::: ', goal);
    })();
  }, []);
  const [meta, setMeta] = useState('');
  const { handleAtualizarMeta } = UseMetas();

  const [valorMeta, setValorMeta] = useState(0);
  const [previsao, setPrevisao] = useState(new Date());
  const [realizado, setRealizado] = useState(false);

  //erros
  const [descError, setdescError] = useState<any | null>(null);
  const [valorTError, setvalorTError] = useState<any | null>(null);
  const [dtPrevError, setdtPrevError] = useState<any | null>(null);

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

  async function handleUpdateGoal() {
    const newGoal = {
      descMeta: novoDesc(),
      saldoFinalMeta: novoSaldoFinal(),
      saldoAtualMeta: goal.saldoAtualMeta,
      dataInicioMeta: goal.dataInicioMeta,
      dataFimMeta: previsao.toLocaleDateString(),
      realizacaoMeta: realizacao(),
      userMetaId: await retornarIdDoUsuario(),
    } as Meta;

    if (meta != '' || (valorMeta > 0 && valorMeta != undefined)) {
      goal.saldoAtualMeta >= valorMeta
        ? console.log('deu true')
        : setRealizado(false);

      handleAtualizarMeta(newGoal, goal.id);

      Toast.show({
        type: 'niceToast',
        props: {
          type: 'success',
          title: 'Foi!',
          message: 'Meta atualizada com sucesso!',
        },
      });
      navigation.dispatch(
        StackActions.replace('GoalsStack', { screen: 'GoalsList' }),
      );
    } else if (meta == '' || valorMeta <= 0 || valorMeta == 0) {
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
  }

  const realizacao = () => {
    goal.saldoAtualMeta >= valorMeta ? setRealizado(true) : setRealizado(false);

    return realizado;
  };

  const novoDesc = () => {
    if (meta != '') {
      return meta;
    } else {
      return goal.descMeta;
    }
  };

  const novoSaldoFinal = () => {
    if (valorMeta >= 0 && valorMeta != 0) {
      return valorMeta;
    } else {
      return goal.saldoFinalMeta;
    }
  };
  const valorFim = '' + goal.saldoFinalMeta;

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('GoalsStack', { screen: 'GoalsList' }),
    );
    return true;
  };
  const theme: any = useTheme();

  return (
    <ScrollView
      style={{ paddingTop: '8%', backgroundColor: theme.colors.cultured }}>
      <Header backButton={backAction} color={theme.colors.silver} title="" />

      <View style={styles.container}>
        <View style={{ marginTop: '15%' }}>
          <Title>{goal.descMeta}</Title>

          <Valor>
            <TextRS>R$</TextRS>
            <TextValor>{goal.saldoAtualMeta}</TextValor>
          </Valor>

          <View style={{ marginTop: '7%' }}>
            <InputText
              value={meta}
              label="Descrição"
              placeholder={goal.descMeta}
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
              label="Valor final"
              placeholder={valorFim.toString()}
              error={valorTError}
              showClearIcon={valorMeta != 0}
              isCurrencyInput
              placeholderTextColor={theme.colors.platinum}
              selectionColor={theme.colors.davysGrey}
              onClear={() => {
                setvalorTError(null);
              }}
              // @ts-ignore
              value={valorMeta}
              onChangeValue={(amt: number) => setValorMeta(amt)}
              onChangeText={() => {
                if (valorMeta == null) setValorMeta(0.0);
              }}
              keyboardType="numeric"
            />
          </View>

          {/* DatePicker */}
          <InputText
            label="Previsão conclusão"
            value={previsao.toLocaleDateString()}
            placeholder={goal.dataFimMeta}
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

          <Button
            onPress={handleUpdateGoal}
            title="Salvar"
            style={{ backgroundColor: theme.colors.culture }}
            color={theme.colors.silver}
            lastOne={true}
          />
        </View>
      </View>
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

export default EditGoal;
