import React, { useEffect, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Feather from 'react-native-vector-icons/Feather';

import {
  Transferencia,
  UseTransferencias,
} from '../../../contexts/TransferContext';
import { ReadParcela, UseParcelas } from '../../../contexts/InstallmentContext';

import { Modalize as Modal } from 'react-native-modalize';

import { ConvertToParcela, ConvertToTransferencia } from './typecast';

import { converterNumeroParaData } from '../../../helpers/converterDataParaManuscrito';
import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario';
import generateDates from '../../../helpers/generateDates';

import DetailEntry from './components/DetailEntry';

import Modalize from '../../../components/Modalize';

import { addMonths, toDate } from '../../../helpers/manipularDatas';

import SectionByDate from './components/SectionByDate';

import { UseDadosTemp } from '../../../contexts/TemporaryDataContext';

import {
  Header,
  PeriodoAnterior,
  PeriodoAtual,
  PeriodoPosterior,
  LabelPeriodo,
  Container,
  TopData,
  TopDataItem,
  TopDataTitle,
  TopDataBalance,
  TopDataDescription,
  Content,
  CountCard,
  CountCardsContainer,
  Count,
  CountDescription,
} from './styles';

import { colors, metrics } from '../../../styles';
import { ScrollView, View } from 'react-native';
import { widthPixel } from '../../../helpers/responsiveness';

import doubleToCurrency from '../../../helpers/doubleToCurrency';
import shadowBox from '../../../helpers/shadowBox';
import GeneralCard from './components/GeneralCard';
import CategoryCard from './components/CategoryCard';

interface PropsRenderSection {
  item: (ReadParcela[] | Transferencia[])[];
}
const RenderSection: React.FC<PropsRenderSection> = ({ item }) => {
  let readByParcelas: ReadParcela[] = ConvertToParcela(item[0]);
  let readByTransferencias: Transferencia[] = ConvertToTransferencia(item[1]);

  const date: Date = !readByParcelas[0]
    ? new Date(readByTransferencias[0].dataTransferencia)
    : new Date(readByParcelas[0].dataParcela);

  return (
    <SectionByDate
      date={date.toLocaleDateString()}
      parcelas={readByParcelas}
      transferencias={readByTransferencias}
    />
  );
};

const Graficos = () => {
  const { readParcelas, handleInstallmentGroupByDate } = UseParcelas();
  const { readTransferencias, handleTransferGroupByDate } = UseTransferencias();

  const yearCurrent = String(new Date(Date.now()).getFullYear());

  const [dateCurrent, setDateCurrent] = useState(
    new Date(Date.now()).toLocaleDateString(),
  );

  useEffect(() => {
    const getDate = toDate(dateCurrent);
  }, []);

  useEffect(() => {}, []);

  function updateDate(action: number) {
    const newDate = addMonths(toDate(dateCurrent), action);
    setDateCurrent(newDate.toLocaleDateString());
  }

  return (
    <Container>
      <Header>
        <PeriodoAnterior onPress={() => updateDate(-1)}>
          <Feather
            size={widthPixel(60)}
            name={'chevron-left'}
            color={colors.darkGray}
          />
        </PeriodoAnterior>

        <PeriodoAtual>
          <LabelPeriodo>
            {converterNumeroParaData(
              dateCurrent,
              !(yearCurrent == dateCurrent.split('/')[2]),
            )}
          </LabelPeriodo>
        </PeriodoAtual>

        <PeriodoPosterior onPress={() => updateDate(1)}>
          <Feather
            size={widthPixel(60)}
            name={'chevron-right'}
            color={colors.darkGray}
          />
        </PeriodoPosterior>
      </Header>

      <TopData style={shadowBox(20, 0.42)}>
        <TopDataItem
          style={{
            borderRightWidth: widthPixel(2),
            borderRightColor: colors.cultured,
          }}>
          <View>
            <TopDataTitle>Maior receita</TopDataTitle>
            <TopDataBalance style={{ color: colors.slimyGreen }}>
              {doubleToCurrency(14000)}
            </TopDataBalance>
            <TopDataDescription>Salário</TopDataDescription>
          </View>
        </TopDataItem>
        <TopDataItem
          style={{
            borderLeftWidth: widthPixel(2),
            borderLeftColor: colors.cultured,
          }}>
          <View>
            <TopDataTitle>Maior despesa</TopDataTitle>
            <TopDataBalance style={{ color: colors.redCrayola }}>
              {doubleToCurrency(2400)}
            </TopDataBalance>
            <TopDataDescription>Faculdade</TopDataDescription>
          </View>
        </TopDataItem>
      </TopData>
      <ScrollView>
        <Content>
          <GeneralCard name="Geral" />
          <CountCardsContainer>
            <CountCard
              style={[
                {
                  marginRight: metrics.default.boundaries / 1.6 / 2,
                },
                shadowBox(),
              ]}>
              <Count>02</Count>
              <CountDescription>Receitas lançadas</CountDescription>
            </CountCard>
            <CountCard
              style={[
                {
                  marginLeft: metrics.default.boundaries / 1.6 / 2,
                },
                shadowBox(),
              ]}>
              <Count>04</Count>
              <CountDescription>Despesas lançadas</CountDescription>
            </CountCard>
          </CountCardsContainer>
          <CategoryCard
            name="Gastos por categoria"
            categories={[
              {
                accent: '#2a9d8f',
                icon: 'Octicons:mortar-board',
                name: 'Educação',
                total: 2400,
              },
              {
                accent: '#C5B400',
                icon: 'MaterialCommunityIcons:hanger',
                name: 'Outfit',
                total: 235,
              },
              {
                accent: '#778745',
                icon: 'MaterialCommunityIcons:heart-pulse',
                name: 'Saúde',
                total: 140,
              },
            ]}
          />
        </Content>
      </ScrollView>
    </Container>
  );
};
export default Graficos;
