import React from 'react';

import { Meta } from '../../contexts/GoalsContext';

import { ProgressBar } from 'react-native-paper';

import {
  Goal,
  GoalDesc,
  DaysLeft,
  InvestedMoney,
  Percent,
  PercentText,
  Subtitle,
  IconContainer,
} from './styles';

import { toDate } from '../../helpers/manipularDatas';
import { UseDadosTemp } from '../../contexts/TemporaryDataContext';
import { colors, fonts, metrics } from '../../styles';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import hexToRGB from '../../helpers/hexToRgba';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import doubleToCurrency from '../../helpers/doubleToCurrency';
import shadowBox from '../../helpers/shadowBox';
import { useTheme } from 'styled-components/native';
type PropsCardGoals = {
  item: Meta;
};

const GoalItem = ({ item }: PropsCardGoals) => {
  const { navigation } = UseDadosTemp();

  const objDataFimMeta = toDate(item.dataFimMeta);
  const objDataIniMeta = toDate(item.dataInicioMeta);

  // Subtrai uma data pela outra
  const diff = Math.abs(objDataFimMeta.getTime() - objDataIniMeta.getTime());

  // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  // Algum cálculo para calcular a porcentagem aqui
  const percentageBalance = (item.saldoAtualMeta * 100) / item.saldoFinalMeta;
  const theme: any = useTheme()
  return (
    <Goal
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('GoalsStack', {
          screen: 'GoalDetails',
          params: { goalId: item.id },
        });
      }}>
      <>
        <GoalDesc numberOfLines={1}>{item.descMeta}</GoalDesc>

        <Subtitle>
          <IconContainer>
            <MaterialCommunityIcons
              name="exclamation"
              color={hexToRGB(theme.colors.davysGrey)}
              size={widthPixel(30)}
            />
          </IconContainer>
          <DaysLeft>Faltam {days} dias</DaysLeft>
        </Subtitle>

        <ProgressBar
          progress={percentageBalance / 100}
          color={theme.colors.redCrayola}
          style={{
            height: heightPixel(30),
            marginVertical: heightPixel(16),
            borderRadius: widthPixel(12),
          }}
        />

        <InvestedMoney numberOfLines={1}>
          {`${doubleToCurrency(item.saldoAtualMeta)} de ${doubleToCurrency(
            item.saldoFinalMeta,
          )}`}
        </InvestedMoney>

        <Percent style={shadowBox(20, 0.4)}>
          <PercentText>{percentageBalance.toFixed(0)}%</PercentText>
        </Percent>
      </>
    </Goal>
  );
};

export default GoalItem;
